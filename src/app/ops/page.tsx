'use client'

import { Fragment, useEffect, useState } from 'react'

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
  input: Array<{ role: string; text: string }> | null
  output: string | null
  scores: Record<string, number>
  leaked: boolean
}

const STORAGE_KEY = 'umang-ops:key'

function pct(n: number) {
  return `${(n * 100).toFixed(0)}%`
}
function ms(n: number | null) {
  if (n == null) return '—'
  return n < 1000 ? `${n}ms` : `${(n / 1000).toFixed(2)}s`
}
function money(n: number | null) {
  if (n == null) return '—'
  return `$${n.toFixed(5)}`
}

async function fetchTraces(
  key: string
): Promise<{ ok: boolean; traces: TraceRow[]; error?: string; status: number }> {
  const r = await fetch(
    `/api/ops/traces?key=${encodeURIComponent(key)}&limit=100`
  )
  const data = (await r.json().catch(() => ({}))) as {
    traces?: TraceRow[]
    error?: string
  }
  return {
    ok: r.ok,
    status: r.status,
    traces: data.traces ?? [],
    error: data.error,
  }
}

export default function OpsPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [traces, setTraces] = useState<TraceRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Try a saved passcode on mount — but only mark authed if it actually works.
  useEffect(() => {
    let saved: string | null = null
    try {
      saved = sessionStorage.getItem(STORAGE_KEY)
    } catch {
      /* no-op */
    }
    if (!saved) return
    setKey(saved)
    setSubmitting(true)
    fetchTraces(saved)
      .then((r) => {
        if (r.ok) {
          setTraces(r.traces)
          setAuthed(true)
          if (r.error) setError(r.error)
        } else {
          try {
            sessionStorage.removeItem(STORAGE_KEY)
          } catch {
            /* no-op */
          }
          setError(r.status === 401 ? 'wrong passcode' : r.error ?? `HTTP ${r.status}`)
        }
      })
      .finally(() => setSubmitting(false))
  }, [])

  // Background refresh, only after authed.
  useEffect(() => {
    if (!authed) return
    const load = async () => {
      setLoading(true)
      setError(null)
      const r = await fetchTraces(key)
      if (r.ok) {
        setTraces(r.traces)
        if (r.error) setError(r.error)
      } else if (r.status === 401) {
        // Passcode rotated server-side — drop back to login.
        try {
          sessionStorage.removeItem(STORAGE_KEY)
        } catch {
          /* no-op */
        }
        setAuthed(false)
        setError('wrong passcode')
      } else {
        setError(r.error ?? `HTTP ${r.status}`)
      }
      setLoading(false)
    }
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [authed, key])

  if (!authed) {
    return (
      <div style={shell}>
        <form
          style={card}
          onSubmit={async (e) => {
            e.preventDefault()
            setSubmitting(true)
            setError(null)
            const r = await fetchTraces(key)
            setSubmitting(false)
            if (!r.ok) {
              setError(
                r.status === 401 ? 'wrong passcode' : r.error ?? `HTTP ${r.status}`
              )
              return
            }
            try {
              sessionStorage.setItem(STORAGE_KEY, key)
            } catch {
              /* no-op */
            }
            setTraces(r.traces)
            setAuthed(true)
          }}
        >
          <h1 style={title}>OPS</h1>
          <p style={subtitle}>passcode required</p>
          <input
            type="password"
            placeholder="passcode"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={input}
            autoFocus
          />
          <button type="submit" style={btn} disabled={!key || submitting}>
            {submitting ? '…' : 'ENTER'}
          </button>
          {error ? <div style={{ ...errorBox, marginTop: 14 }}>{error}</div> : null}
        </form>
      </div>
    )
  }

  // Aggregate stats
  const total = traces.length
  const withCost = traces.filter((t) => t.totalCost != null)
  const totalCost = withCost.reduce((a, t) => a + (t.totalCost ?? 0), 0)
  const avgLat = traces.filter((t) => t.latencyMs != null).map((t) => t.latencyMs!)
  const p50 = pctile(avgLat, 0.5)
  const p99 = pctile(avgLat, 0.99)
  const leaks = traces.filter((t) => t.leaked || t.tags.includes('prompt-leak-suspected')).length
  const jailbreaks = traces.filter((t) => t.tags.includes('jailbreak-attempt')).length
  const leadsCount = traces.filter((t) =>
    t.toolCalls.some((tc) => tc.name === 'record_lead')
  ).length
  const unknownCount = traces.filter((t) =>
    t.toolCalls.some((tc) => tc.name === 'record_unknown_question')
  ).length
  const allScores = traces.flatMap((t) =>
    Object.entries(t.scores).map(([n, v]) => ({ name: n, value: v }))
  )
  const scoreAvg = (name: string) => {
    const xs = allScores.filter((s) => s.name === name).map((s) => s.value)
    if (xs.length === 0) return null
    return xs.reduce((a, b) => a + b, 0) / xs.length
  }

  return (
    <div style={shell}>
      <header style={hdr}>
        <h1 style={{ ...title, margin: 0 }}>OPS · CHAT TRACES</h1>
        <button
          type="button"
          style={btnSmall}
          onClick={() => {
            try {
              sessionStorage.removeItem(STORAGE_KEY)
            } catch {
              /* no-op */
            }
            setAuthed(false)
          }}
        >
          LOGOUT
        </button>
      </header>

      <section style={statRow}>
        <Stat label="TRACES" value={String(total)} />
        <Stat label="TOTAL COST" value={money(totalCost)} />
        <Stat label="P50 LATENCY" value={ms(p50)} />
        <Stat label="P99 LATENCY" value={ms(p99)} />
        <Stat label="LEAKS" value={String(leaks)} accent={leaks > 0 ? 'red' : undefined} />
        <Stat label="JAILBREAK ATTEMPTS" value={String(jailbreaks)} />
        <Stat label="LEADS" value={String(leadsCount)} accent="lime" />
        <Stat label="UNKNOWN Qs" value={String(unknownCount)} />
        <Stat label="QUALITY (avg)" value={scoreAvg('quality') == null ? '—' : pct(scoreAvg('quality')!)} />
        <Stat label="SAFETY (avg)" value={scoreAvg('safety') == null ? '—' : pct(scoreAvg('safety')!)} />
        <Stat label="VOICE (avg)" value={scoreAvg('in_voice') == null ? '—' : pct(scoreAvg('in_voice')!)} />
      </section>

      {error ? <div style={errorBox}>{error}</div> : null}
      {loading && total === 0 ? <div style={muted}>loading…</div> : null}

      <section style={{ marginTop: 24 }}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>TIME</th>
              <th style={th}>TAGS</th>
              <th style={th}>QUESTION</th>
              <th style={th}>TOOLS</th>
              <th style={{ ...th, textAlign: 'right' }}>LATENCY</th>
              <th style={{ ...th, textAlign: 'right' }}>COST</th>
              <th style={th}>SCORES</th>
            </tr>
          </thead>
          <tbody>
            {traces.map((t) => {
              const isOpen = expanded.has(t.id)
              const hasConvo = (t.input && t.input.length > 0) || !!t.output
              return (
                <Fragment key={t.id}>
                  <tr
                    style={{
                      ...(t.leaked ? rowLeak : row),
                      cursor: hasConvo ? 'pointer' : 'default',
                    }}
                    onClick={() => hasConvo && toggleRow(t.id)}
                  >
                    <td style={td}>
                      <span style={caret}>{hasConvo ? (isOpen ? '▾' : '▸') : ' '}</span>
                      {new Date(t.timestamp).toLocaleString()}
                    </td>
                    <td style={td}>
                      {t.tags.map((tag) => (
                        <span key={tag} style={tagPill(tag)}>
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td style={{ ...td, maxWidth: 320 }}>{t.lastUserMessage ?? '—'}</td>
                    <td style={td}>
                      {t.toolCalls.length === 0
                        ? '—'
                        : t.toolCalls
                            .map((tc) => `${tc.name}${tc.durationMs ? `·${tc.durationMs}ms` : ''}`)
                            .join(', ')}
                    </td>
                    <td style={{ ...td, textAlign: 'right' }}>{ms(t.latencyMs)}</td>
                    <td style={{ ...td, textAlign: 'right' }}>{money(t.totalCost)}</td>
                    <td style={td}>
                      {Object.entries(t.scores).map(([n, v]) => (
                        <span key={n} style={tagPill(`${n}:${v.toFixed(2)}`)}>
                          {n}:{v.toFixed(2)}
                        </span>
                      ))}
                    </td>
                  </tr>
                  {isOpen && hasConvo ? (
                    <tr style={t.leaked ? rowLeak : row}>
                      <td colSpan={7} style={convoCell}>
                        {(t.input ?? []).map((m, i) => (
                          <div key={i} style={msgBlock}>
                            <div style={msgRole(m.role)}>{m.role.toUpperCase()}</div>
                            <div style={msgText}>{m.text || <em style={muted}>(empty)</em>}</div>
                          </div>
                        ))}
                        {t.output ? (
                          <div style={msgBlock}>
                            <div style={msgRole('assistant')}>ASSISTANT</div>
                            <div style={msgText}>{t.output}</div>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function pctile(xs: number[], q: number): number | null {
  if (xs.length === 0) return null
  const sorted = [...xs].sort((a, b) => a - b)
  const i = Math.floor(sorted.length * q)
  return sorted[Math.min(i, sorted.length - 1)]
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: 'red' | 'lime'
}) {
  return (
    <div style={statBox}>
      <div style={statLabel}>{label}</div>
      <div
        style={{
          ...statValue,
          color: accent === 'red' ? '#ff8a85' : accent === 'lime' ? '#b8ff57' : '#f0ede6',
        }}
      >
        {value}
      </div>
    </div>
  )
}

// ── Inline styles (this page is private + minimal — keep it self-contained)
const shell: React.CSSProperties = {
  minHeight: '100vh',
  background: '#080908',
  color: '#f0ede6',
  fontFamily: 'ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace',
  padding: '40px 32px 80px',
}
const hdr: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: 18,
  borderBottom: '1px solid rgba(240,237,230,0.1)',
  marginBottom: 24,
}
const title: React.CSSProperties = {
  fontSize: 22,
  letterSpacing: '0.18em',
  margin: 0,
  fontWeight: 500,
}
const subtitle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.2em',
  color: 'rgba(240,237,230,0.45)',
  textTransform: 'uppercase',
  margin: '6px 0 22px',
}
const card: React.CSSProperties = {
  maxWidth: 360,
  margin: '20vh auto 0',
  padding: 28,
  border: '1px solid rgba(240,237,230,0.1)',
  borderRadius: 12,
  display: 'flex',
  flexDirection: 'column',
}
const input: React.CSSProperties = {
  background: '#11120f',
  border: '1px solid rgba(240,237,230,0.15)',
  color: '#f0ede6',
  padding: '11px 14px',
  borderRadius: 4,
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  marginBottom: 12,
}
const btn: React.CSSProperties = {
  background: '#b8ff57',
  color: '#080908',
  border: 'none',
  padding: '11px 14px',
  borderRadius: 4,
  fontSize: 12,
  letterSpacing: '0.16em',
  cursor: 'pointer',
  fontFamily: 'inherit',
}
const btnSmall: React.CSSProperties = {
  ...btn,
  padding: '7px 14px',
  fontSize: 10,
  background: 'transparent',
  color: '#f0ede6',
  border: '1px solid rgba(240,237,230,0.2)',
}
const statRow: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 10,
}
const statBox: React.CSSProperties = {
  border: '1px solid rgba(240,237,230,0.1)',
  borderRadius: 8,
  padding: '14px 16px',
  background: 'rgba(184,255,87,0.02)',
}
const statLabel: React.CSSProperties = {
  fontSize: 9,
  letterSpacing: '0.2em',
  color: 'rgba(240,237,230,0.45)',
  marginBottom: 6,
}
const statValue: React.CSSProperties = { fontSize: 22, fontWeight: 500 }
const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 12,
}
const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '1px solid rgba(240,237,230,0.15)',
  fontSize: 9,
  letterSpacing: '0.18em',
  color: 'rgba(240,237,230,0.5)',
  textTransform: 'uppercase',
}
const td: React.CSSProperties = {
  padding: '12px 12px',
  borderBottom: '1px solid rgba(240,237,230,0.06)',
  verticalAlign: 'top',
}
const row: React.CSSProperties = {}
const rowLeak: React.CSSProperties = { background: 'rgba(255,138,133,0.06)' }
const errorBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 6,
  background: 'rgba(255,138,133,0.06)',
  color: '#ff8a85',
  border: '1px solid rgba(255,138,133,0.3)',
  fontSize: 12,
  marginTop: 16,
}
const muted: React.CSSProperties = {
  color: 'rgba(240,237,230,0.45)',
  fontSize: 12,
  marginTop: 16,
}
const caret: React.CSSProperties = {
  display: 'inline-block',
  width: 14,
  color: 'rgba(240,237,230,0.4)',
}
const convoCell: React.CSSProperties = {
  padding: '14px 18px 18px 32px',
  background: 'rgba(240,237,230,0.02)',
  borderBottom: '1px solid rgba(240,237,230,0.06)',
}
const msgBlock: React.CSSProperties = {
  marginBottom: 12,
}
const msgRole = (role: string): React.CSSProperties => ({
  fontSize: 9,
  letterSpacing: '0.2em',
  marginBottom: 4,
  color:
    role === 'assistant'
      ? '#b8ff57'
      : role === 'user'
        ? 'rgba(240,237,230,0.7)'
        : 'rgba(240,237,230,0.4)',
})
const msgText: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  fontSize: 12.5,
  lineHeight: 1.55,
  color: '#e8e5dc',
}
const tagPill = (tag: string): React.CSSProperties => ({
  display: 'inline-block',
  padding: '2px 6px',
  margin: '0 4px 4px 0',
  borderRadius: 3,
  fontSize: 9.5,
  letterSpacing: '0.06em',
  background:
    tag.includes('leak') || tag.includes('jailbreak')
      ? 'rgba(255,138,133,0.12)'
      : tag.includes('lead') || tag.includes('hiring')
        ? 'rgba(184,255,87,0.12)'
        : 'rgba(240,237,230,0.06)',
  color:
    tag.includes('leak') || tag.includes('jailbreak')
      ? '#ff8a85'
      : tag.includes('lead') || tag.includes('hiring')
        ? '#b8ff57'
        : 'rgba(240,237,230,0.7)',
})
