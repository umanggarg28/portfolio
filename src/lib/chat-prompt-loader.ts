import { SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import { getLangfuse } from '@/lib/observability'

const PROMPT_NAME = process.env.LANGFUSE_PROMPT_NAME ?? 'umang-chat-system'
const CACHE_TTL_MS = 60_000

export type ResolvedPrompt = { text: string; version: string | number }

let cached: { value: ResolvedPrompt; expiresAt: number } | null = null

/**
 * Resolve the chat system prompt at request time.
 *
 * - With `x-prompt-version` + matching `x-prompt-auth` (and Langfuse): pulls
 *   that specific Langfuse version. Used for A/B regression testing.
 * - With Langfuse configured AND a published prompt: pulls the latest
 *   production-tagged prompt (60s in-process cache).
 * - Otherwise: falls back to the file-baked `SYSTEM_PROMPT`. Tagged version
 *   `'file'`. The Langfuse "prompt not found" error is suppressed — it just
 *   means the prompt hasn't been bootstrapped yet, which is an OK state.
 */
export async function resolveSystemPrompt(opts: {
  overrideVersion?: string
  overrideAuth?: string
}): Promise<ResolvedPrompt> {
  const langfuse = getLangfuse()

  if (
    opts.overrideVersion &&
    opts.overrideAuth &&
    process.env.PROMPT_REGRESSION_SECRET &&
    opts.overrideAuth === process.env.PROMPT_REGRESSION_SECRET &&
    langfuse
  ) {
    try {
      const v = Number.parseInt(opts.overrideVersion, 10)
      const p = await silenced(() =>
        langfuse.getPrompt(PROMPT_NAME, Number.isNaN(v) ? undefined : v, {
          type: 'text',
          cacheTtlSeconds: 0,
        })
      )
      return { text: p.prompt, version: p.version ?? opts.overrideVersion }
    } catch {
      /* fall through */
    }
  }

  if (cached && cached.expiresAt > Date.now()) return cached.value

  let resolved: ResolvedPrompt
  if (langfuse) {
    try {
      const p = await silenced(() =>
        langfuse.getPrompt(PROMPT_NAME, undefined, {
          type: 'text',
          cacheTtlSeconds: 60,
        })
      )
      resolved = { text: p.prompt, version: p.version ?? 'latest' }
    } catch {
      resolved = { text: SYSTEM_PROMPT, version: 'file' }
    }
  } else {
    resolved = { text: SYSTEM_PROMPT, version: 'file' }
  }

  cached = { value: resolved, expiresAt: Date.now() + CACHE_TTL_MS }
  return resolved
}

/**
 * Silences a single console.error from Langfuse's "prompt not found" warning.
 * The SDK logs noisily even when the consumer has a try/catch — this swaps in
 * a no-op error logger for the duration of one call.
 */
async function silenced<T>(fn: () => Promise<T>): Promise<T> {
  const original = console.error
  console.error = () => {}
  try {
    return await fn()
  } finally {
    console.error = original
  }
}
