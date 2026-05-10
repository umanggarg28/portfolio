import { tool } from 'ai'
import { z } from 'zod'

import { detail } from '@/content/knowledge'
import { ragSearch } from '@/lib/chat-rag'
import { notifyLead, notifyUnknownQuestion, sendResumeToVisitor } from '@/lib/notify'

export const CHAT_MODEL = 'claude-haiku-4-5' as const

export type ToolContext = {
  transcript: string
  userMsg: string
  /** Called whenever a tool fires — used to attach Langfuse spans. */
  onToolCall?: (info: {
    name: string
    input: unknown
    durationMs: number
    metadata?: Record<string, unknown>
  }) => void
}

const noopOnToolCall: NonNullable<ToolContext['onToolCall']> = () => {}

/**
 * Tool definitions shared by /api/chat (real) and /api/chat/warm (cache primer).
 * Anthropic's prompt cache key includes tool descriptions + schemas, so both
 * routes must register the same tool shapes for the warm hit to count.
 */
export function buildTools(ctx: ToolContext) {
  const onToolCall = ctx.onToolCall ?? noopOnToolCall
  const time = async <T>(fn: () => Promise<T>): Promise<[T, number]> => {
    const t = Date.now()
    const r = await fn()
    return [r, Date.now() - t]
  }

  return {
    lookup_detail: tool({
      description:
        'Retrieve deep, grounded detail about a specific topic, project, or role. Pass a natural-language query (the visitor question or a clean topic phrase). Server runs semantic search over the knowledge base and returns the top matching entries.',
      inputSchema: z.object({
        query: z
          .string()
          .describe(
            'Natural-language description of what to look up — e.g. "Asurion role and impact", "Cartographer retrieval architecture", "what kind of work he is looking for".'
          ),
      }),
      execute: async ({ query }) => {
        const [r, durationMs] = await time(() => ragSearch(query))
        onToolCall({
          name: 'lookup_detail',
          input: { query },
          durationMs,
          metadata: {
            mode: r.mode,
            ...(r.mode === 'embedding'
              ? {
                  hitCount: r.hits.length,
                  topHit: r.hits[0]?.topic,
                  topScore: r.hits[0]?.score,
                  embeddingTokens: r.embeddingTokens,
                }
              : { reason: r.reason }),
          },
        })
        if (r.mode === 'embedding') {
          return {
            found: true,
            mode: 'embedding',
            hits: r.hits.map((h) => ({ topic: h.topic, score: h.score })),
            content: r.content,
          }
        }
        if (r.content) {
          return { found: true, mode: 'fallback', topic: r.topic, content: r.content }
        }
        return {
          found: false,
          available: Object.keys(detail),
          note:
            'No semantic match. Try a different angle, or answer from the digest in the system prompt.',
        }
      },
    }),

    record_lead: tool({
      description:
        "Record that a visitor has expressed interest and provided their email. Call this after the visitor confirms they want to be contacted and has shared their email. Don't call it speculatively.",
      inputSchema: z.object({
        email: z.string().describe('The visitor email address.'),
        name: z.string().optional().describe('The visitor name, if provided.'),
        intent: z
          .string()
          .optional()
          .describe(
            'One short line on what they want to talk about — hiring, project, collaboration, etc.'
          ),
        notes: z
          .string()
          .optional()
          .describe(
            'Any additional context worth noting (company, role, etc.).'
          ),
      }),
      execute: async ({ email, name, intent, notes }) => {
        const [, durationMs] = await time(() =>
          notifyLead({
            email,
            name,
            intent,
            notes,
            conversation: ctx.transcript,
          })
        )
        onToolCall({
          name: 'record_lead',
          input: { email, name, intent, notes },
          durationMs,
        })
        return {
          recorded: true,
          message: 'Lead captured. Umang will follow up.',
        }
      },
    }),

    record_unknown_question: tool({
      description:
        'Log a question you could not confidently answer from the knowledge base. Use BEFORE giving a vague non-answer, so Umang can follow up if needed.',
      inputSchema: z.object({
        question: z.string().describe("The visitor's question, verbatim."),
        why: z
          .string()
          .optional()
          .describe('Brief reason: out of scope, not in knowledge, etc.'),
      }),
      execute: async ({ question, why }) => {
        const [, durationMs] = await time(() =>
          notifyUnknownQuestion({
            question: question || ctx.userMsg,
            why,
            conversation: ctx.transcript,
          })
        )
        onToolCall({
          name: 'record_unknown_question',
          input: { question, why },
          durationMs,
        })
        return { recorded: true }
      },
    }),

    get_resume_url: tool({
      description:
        "Return the URL of Umang's resume PDF. Use when the visitor wants a link only (e.g. just to view it). If they want it sent to their inbox, use send_resume_email instead.",
      inputSchema: z.object({}),
      execute: async () => {
        onToolCall({ name: 'get_resume_url', input: {}, durationMs: 0 })
        return { url: 'https://umanggarg.dev/UmangGargResume.pdf' }
      },
    }),

    send_resume_email: tool({
      description:
        "Email Umang's resume PDF to the visitor's address. Use when the visitor asks to receive the resume by email or to have it sent to them. Requires a confirmed email address (don't guess — ask if not provided).",
      inputSchema: z.object({
        email: z.string().describe("Visitor's email address — must be confirmed by them."),
        name: z.string().optional().describe('Visitor name, if known.'),
      }),
      execute: async ({ email, name }) => {
        const [r, durationMs] = await time(() => sendResumeToVisitor({ email, name }))
        onToolCall({
          name: 'send_resume_email',
          input: { email, name },
          durationMs,
          metadata: { ok: r.ok, ...(r.error ? { error: r.error } : {}) },
        })
        if (r.ok) {
          return {
            sent: true,
            message: `Resume sent to ${email}. Check your inbox in the next minute (and spam, just in case).`,
          }
        }
        return {
          sent: false,
          message:
            "Hit an issue sending — you can grab the PDF directly at https://umanggarg.dev/UmangGargResume.pdf, or I can pass your address to Umang to follow up.",
          error: r.error,
        }
      },
    }),
  }
}
