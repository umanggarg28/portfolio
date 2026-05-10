/**
 * Langfuse observability wrapper.
 *
 * All public functions are no-ops when Langfuse env vars are missing, so dev
 * works without configuring observability. Production sets:
 *   - LANGFUSE_PUBLIC_KEY
 *   - LANGFUSE_SECRET_KEY
 *   - LANGFUSE_BASE_URL          (optional, defaults to cloud.langfuse.com)
 *   - LANGFUSE_PROMPT_NAME       (optional, defaults to 'umang-chat-system')
 */

import { Langfuse } from 'langfuse'

let cached: Langfuse | null | undefined

export function getLangfuse(): Langfuse | null {
  if (cached !== undefined) return cached
  const pub = process.env.LANGFUSE_PUBLIC_KEY
  const sec = process.env.LANGFUSE_SECRET_KEY
  if (!pub || !sec) {
    cached = null
    return null
  }
  cached = new Langfuse({
    publicKey: pub,
    secretKey: sec,
    baseUrl: process.env.LANGFUSE_BASE_URL,
  })
  return cached
}

export const isLangfuseEnabled = () => getLangfuse() !== null

/**
 * Per-1k-token costs for the models we use. Source: anthropic.com/pricing &
 * platform.openai.com/pricing. Keep in sync when prices change.
 */
const PRICING = {
  'claude-haiku-4-5': { input: 0.001, output: 0.005 },
  'claude-sonnet-4-6': { input: 0.003, output: 0.015 },
  'text-embedding-3-small': { input: 0.00002, output: 0 },
} as const

type ModelName = keyof typeof PRICING

export function calcCost(
  model: string,
  inputTokens: number,
  outputTokens = 0
): number {
  const p = PRICING[model as ModelName]
  if (!p) return 0
  return (inputTokens / 1000) * p.input + (outputTokens / 1000) * p.output
}
