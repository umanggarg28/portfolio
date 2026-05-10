/**
 * Pre-embed every entry in `src/content/knowledge.ts:detail` and write the
 * vectors to `src/content/knowledge-embeddings.json`. The chat route loads
 * this JSON at boot for in-process cosine-similarity retrieval.
 *
 * Run: npm run embed
 *
 * Costs: ~12 entries × ~500 tokens × $0.00002/1K = ~$0.0001. Fractions of a
 * cent. Run after any meaningful knowledge.ts edit; commit the JSON.
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { openai } from '@ai-sdk/openai'
import { embedMany } from 'ai'
import { config as loadEnv } from 'dotenv'

import { detail } from '../src/content/knowledge'

loadEnv({ path: '.env.local' })

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY missing — set it in .env.local first.')
  process.exit(2)
}

const MODEL = 'text-embedding-3-small'
const OUTPUT = resolve(process.cwd(), 'src/content/knowledge-embeddings.json')

async function main() {
  const entries = Object.entries(detail).map(([topic, text]) => ({ topic, text }))
  console.log(`embedding ${entries.length} entries with ${MODEL}`)

  const { embeddings, usage } = await embedMany({
    model: openai.textEmbedding(MODEL),
    values: entries.map((e) => e.text),
  })

  const out = entries.map((e, i) => ({
    topic: e.topic,
    text: e.text,
    embedding: embeddings[i],
  }))

  writeFileSync(OUTPUT, JSON.stringify(out))
  console.log(
    `wrote ${OUTPUT} (${entries.length} entries, ${usage?.tokens ?? '?'} tokens)`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
