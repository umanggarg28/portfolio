import { getLangfuse } from '@/lib/observability'

export const runtime = 'nodejs'

/**
 * Ops dashboard backend. Returns the most recent N chat traces from Langfuse,
 * gated by a passcode. Designed for a private LLMOps view — never link to it
 * publicly.
 *
 * Requires:
 *   - LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY (the trace SDK)
 *   - OPS_PASSCODE (URL-shared secret, sent as `?key=...`)
 */

type TraceRow = {
  id: string
  timestamp: string
  tags: string[]
  latencyMs: number | null
  totalCost: number | null
  inputTokens: number | null
  outputTokens: number | null
  promptVersion: string | number | null
  finishReason: string | null
  toolCalls: Array<{ name: string; durationMs?: number }>
  lastUserMessage: string | null
  scores: Record<string, number>
  leaked: boolean
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get('key')
  const expected = process.env.OPS_PASSCODE

  if (!expected) {
    return new Response(
      JSON.stringify({ error: 'OPS_PASSCODE not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }
  if (key !== expected) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const langfuse = getLangfuse()
  if (!langfuse) {
    return new Response(
      JSON.stringify({ error: 'Langfuse not configured', traces: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Langfuse JS SDK doesn't expose a typed list-traces method, so call the
  // public REST API directly with the same credentials.
  const baseUrl = process.env.LANGFUSE_BASE_URL ?? 'https://cloud.langfuse.com'
  const auth = Buffer.from(
    `${process.env.LANGFUSE_PUBLIC_KEY}:${process.env.LANGFUSE_SECRET_KEY}`
  ).toString('base64')

  try {
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 50), 200)
    const r = await fetch(
      `${baseUrl}/api/public/traces?limit=${limit}&name=chat&orderBy=timestamp.desc`,
      { headers: { Authorization: `Basic ${auth}` } }
    )
    if (!r.ok) {
      return new Response(
        JSON.stringify({ error: `langfuse ${r.status}`, traces: [] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }
    const data = (await r.json()) as { data: Array<Record<string, unknown>> }

    const traces: TraceRow[] = (data.data ?? []).map((t) => {
      const meta = (t.metadata as Record<string, unknown>) ?? {}
      const scoresArr = (t.scores as Array<Record<string, unknown>>) ?? []
      const scores: Record<string, number> = {}
      for (const s of scoresArr) {
        const name = String(s.name ?? '')
        const value = Number(s.value ?? 0)
        if (name) scores[name] = value
      }
      return {
        id: String(t.id ?? ''),
        timestamp: String(t.timestamp ?? ''),
        tags: ((t.tags as string[]) ?? []).map(String),
        latencyMs: typeof meta.totalMs === 'number' ? meta.totalMs : null,
        totalCost: typeof meta.cost === 'number' ? meta.cost : null,
        inputTokens: typeof meta.inputTokens === 'number' ? meta.inputTokens : null,
        outputTokens: typeof meta.outputTokens === 'number' ? meta.outputTokens : null,
        promptVersion:
          (meta.promptVersion as string | number | undefined) ?? null,
        finishReason: (meta.finishReason as string | null) ?? null,
        toolCalls:
          (meta.toolCalls as Array<{ name: string; durationMs?: number }>) ??
          [],
        lastUserMessage: (meta.lastUserMessage as string | null) ?? null,
        scores,
        leaked: meta.leaked === true,
      }
    })

    return new Response(JSON.stringify({ traces }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message, traces: [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
