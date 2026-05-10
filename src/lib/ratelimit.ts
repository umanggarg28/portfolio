import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Per-IP sliding-window rate limit for the chat API.
 * Falls back to a permissive in-memory limiter if Upstash env
 * vars aren't set (so dev works without configuring KV).
 */

let _redis: Redis | null | undefined

function getRedis(): Redis | null {
  if (_redis !== undefined) return _redis
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    _redis = null
    return null
  }
  _redis = new Redis({ url, token })
  return _redis
}

const memoryStore = new Map<string, { count: number; resetAt: number }>()

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const entry = memoryStore.get(key)
  if (!entry || entry.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1, reset: now + windowMs }
  }
  entry.count += 1
  if (entry.count > limit) {
    return { success: false, remaining: 0, reset: entry.resetAt }
  }
  return { success: true, remaining: limit - entry.count, reset: entry.resetAt }
}

export type LimitWindow = '1m' | '1h' | '1d'

const windowMs = (w: LimitWindow): number =>
  w === '1m' ? 60_000 : w === '1h' ? 3_600_000 : 86_400_000

export async function rateLimit(opts: {
  ip: string
  scope: string
  limit: number
  window: LimitWindow
}): Promise<{ success: boolean; remaining: number; reset: number }> {
  const { ip, scope, limit, window } = opts
  const redis = getRedis()
  const key = `chat:${scope}:${ip}`

  if (!redis) {
    return memoryLimit(key, limit, windowMs(window))
  }

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: 'umang-portfolio',
    analytics: false,
  })

  const r = await limiter.limit(key)
  return { success: r.success, remaining: r.remaining, reset: r.reset }
}

/**
 * Run all configured rate-limit windows for a given IP.
 * Returns the most restrictive failed window, or null if all pass.
 */
export async function chatRateLimit(
  ip: string
): Promise<null | { window: LimitWindow; resetAt: number }> {
  const checks: Array<{ limit: number; window: LimitWindow }> = [
    { limit: 5, window: '1m' },
    { limit: 30, window: '1h' },
    { limit: 60, window: '1d' },
  ]
  for (const c of checks) {
    const r = await rateLimit({ ip, scope: c.window, limit: c.limit, window: c.window })
    if (!r.success) return { window: c.window, resetAt: r.reset }
  }
  return null
}
