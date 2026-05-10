import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

import { SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import { buildTools, CHAT_MODEL } from '@/lib/chat-tools'
import { rateLimit } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const maxDuration = 10

/**
 * Speculative prompt-cache warmer.
 *
 * Fired by ChatPanel when the user opens the chat — primes Anthropic's
 * ephemeral cache with the system prompt + tool definitions so the
 * first real message gets cache-hit pricing (~85% off input tokens)
 * and faster TTFT.
 *
 * Cost per warm: ~1 output token + cached input on subsequent hits.
 * Light rate-limit (1/min/IP) so this can't be abused into a token
 * sink. Doesn't consume the main /api/chat budget.
 */

function clientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'
  )
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  const r = await rateLimit({ ip, scope: 'warm', limit: 1, window: '1m' })
  if (!r.success) {
    return new Response(null, { status: 204 })
  }

  try {
    await generateText({
      model: anthropic(CHAT_MODEL),
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: 'hi' }],
      maxOutputTokens: 1,
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
      tools: buildTools({ transcript: '', userMsg: '' }),
    })
  } catch {
    // Cache warm is best-effort — never surface failure to the client.
  }

  return new Response(null, { status: 204 })
}
