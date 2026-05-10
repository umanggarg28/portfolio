/**
 * Lightweight in-process RAG layer for the Ask Umang chat.
 *
 * - Knowledge entries are pre-embedded at build time (`scripts/embed-knowledge.ts`)
 *   into `src/content/knowledge-embeddings.json`. No external vector store.
 * - At request time we embed the query, score each entry by cosine similarity,
 *   keep the top-K above a threshold, and return their text concatenated.
 * - Falls back to the existing dict lookup when:
 *   * the embeddings file is missing (dev never ran the build script)
 *   * `OPENAI_API_KEY` is unset (don't fail closed — degrade)
 *   * embedding the query throws (network blip)
 *
 * Entries are short (one project / one role each) so single-vector entries
 * are sufficient — no chunking. ~12 entries × 1536-dim = ~73KB JSON, fits in
 * a serverless function bundle without trouble.
 */

import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

import { detail } from '@/content/knowledge'

export type RagEntry = {
  topic: string
  text: string
  embedding: number[]
}

let cached: RagEntry[] | null | undefined
async function loadIndex(): Promise<RagEntry[] | null> {
  if (cached !== undefined) return cached
  try {
    const mod = await import('@/content/knowledge-embeddings.json')
    const arr = (mod.default ?? mod) as RagEntry[]
    if (!Array.isArray(arr) || arr.length === 0) {
      cached = null
      return null
    }
    cached = arr
    return arr
  } catch {
    cached = null
    return null
  }
}

const EMBED_MODEL = 'text-embedding-3-small' as const

function cosine(a: number[], b: number[]): number {
  let dot = 0
  let an = 0
  let bn = 0
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    dot += x * y
    an += x * x
    bn += y * y
  }
  const denom = Math.sqrt(an) * Math.sqrt(bn)
  return denom === 0 ? 0 : dot / denom
}

export type RagHit = { topic: string; score: number; text: string }

export type RagResult =
  | {
      mode: 'embedding'
      hits: RagHit[]
      content: string
      embeddingTokens: number
    }
  | { mode: 'fallback'; reason: string; topic?: string; content: string }

export async function ragSearch(query: string): Promise<RagResult> {
  const q = query.trim()
  if (!q) return { mode: 'fallback', reason: 'empty-query', content: '' }

  const index = await loadIndex()
  if (!index) {
    return dictFallback(q, 'no-index')
  }
  if (!process.env.OPENAI_API_KEY) {
    return dictFallback(q, 'no-openai-key')
  }

  try {
    const { embedding, usage } = await embed({
      model: openai.textEmbedding(EMBED_MODEL),
      value: q,
    })

    const scored = index
      .map((e) => ({ topic: e.topic, score: cosine(embedding, e.embedding), text: e.text }))
      .sort((a, b) => b.score - a.score)

    const TOP_K = 3
    const MIN_SCORE = 0.2
    const hits = scored.filter((h) => h.score >= MIN_SCORE).slice(0, TOP_K)

    if (hits.length === 0) {
      return dictFallback(q, 'low-similarity')
    }

    const content = hits
      .map((h) => `## ${h.topic} (score=${h.score.toFixed(3)})\n${h.text}`)
      .join('\n\n')

    return {
      mode: 'embedding',
      hits,
      content,
      embeddingTokens: usage?.tokens ?? 0,
    }
  } catch (err) {
    return dictFallback(q, `embed-error:${(err as Error).message.slice(0, 60)}`)
  }
}

function dictFallback(q: string, reason: string): RagResult {
  // Keyword-based dict lookup as a safety net.
  const key = Object.keys(detail).find((k) => q.toLowerCase().includes(k))
  if (key) {
    return {
      mode: 'fallback',
      reason,
      topic: key,
      content: detail[key],
    }
  }
  return { mode: 'fallback', reason, content: '' }
}
