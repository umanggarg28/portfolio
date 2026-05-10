'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { usePostHog } from '@posthog/next'
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { SUGGESTED_PROMPTS } from '@/lib/chat-system-prompt'

const PLACEHOLDER_SESSION = '········'
const STORAGE_KEY = 'umang-chat:v1'
const DRAIN_INTERVAL_MS = 25
const DRAIN_CHARS_PER_TICK = 2

/**
 * Auto-close unclosed bold markers so partially-streamed markdown renders
 * cleanly. Without this, a half-arrived `**foo` would render as literal `**`.
 */
function autoCloseMarkdown(text: string): string {
  const boldCount = (text.match(/\*\*/g) || []).length
  if (boldCount % 2 === 1) return text + '**'
  return text
}

function extractText(m: UIMessage): string {
  return m.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

type Persisted = { messages: UIMessage[]; sessionLabel: string }

function loadPersisted(): Persisted | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as Persisted
    if (!Array.isArray(data.messages)) return null
    return data
  } catch {
    return null
  }
}

function savePersisted(p: Persisted) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {
    /* storage full / unavailable — non-fatal */
  }
}

export default function ChatPanel() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sessionLabel, setSessionLabel] = useState(PLACEHOLDER_SESSION)
  const [hydrated, setHydrated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const warmedRef = useRef(false)
  const posthog = usePostHog()

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat' }),
    []
  )
  const { messages, setMessages, sendMessage, status, error, stop } = useChat({
    transport,
  })

  // Hydrate session label + persisted messages on mount.
  useEffect(() => {
    const persisted = loadPersisted()
    if (persisted) {
      if (persisted.messages.length > 0) setMessages(persisted.messages)
      setSessionLabel(persisted.sessionLabel)
    } else if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      setSessionLabel(crypto.randomUUID().slice(0, 8).toUpperCase())
    }
    setHydrated(true)
  }, [setMessages])

  // Persist messages on every change (post-hydration).
  useEffect(() => {
    if (!hydrated) return
    if (status === 'streaming' || status === 'submitted') return
    savePersisted({ messages, sessionLabel })
  }, [messages, status, sessionLabel, hydrated])

  // Hash deep-link: #chat opens the panel; closing the panel clears the hash.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#chat') setOpen(true)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  useEffect(() => {
    if (open) {
      if (window.location.hash !== '#chat') {
        history.replaceState(null, '', '#chat')
      }
    } else if (window.location.hash === '#chat') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [open])

  // Speculative cache warm + input focus on first open.
  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    if (warmedRef.current) return
    warmedRef.current = true
    posthog?.capture('chat_opened', { session_label: sessionLabel })
    fetch('/api/chat/warm', { method: 'POST', keepalive: true }).catch(() => {})
  }, [open, posthog, sessionLabel])

  // Auto-scroll to bottom on new content (skipped if user has scrolled up).
  const isAtBottomRef = useRef(true)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [open])
  useEffect(() => {
    const el = scrollerRef.current
    if (!el || !isAtBottomRef.current) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  // Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Body scroll lock while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // ── Decoupled drain timer ────────────────────────────────────────────────
  // SSE chunks accumulate in `messages[last]`; a 25ms timer paces character
  // reveal so display rate is decoupled from network rate. Network jitter no
  // longer affects perceived typing speed; cap is ~80 char/sec.
  const lastAssistantId = [...messages]
    .reverse()
    .find((m) => m.role === 'assistant')?.id
  const isStreaming = status === 'streaming'
  const [displayedLengths, setDisplayedLengths] = useState<
    Record<string, number>
  >({})

  useEffect(() => {
    if (!isStreaming || !lastAssistantId) return
    const tick = () => {
      setDisplayedLengths((prev) => {
        const m = messages.find((mm) => mm.id === lastAssistantId)
        if (!m) return prev
        const full = extractText(m).length
        const cur = prev[lastAssistantId] ?? 0
        if (cur >= full) return prev
        return {
          ...prev,
          [lastAssistantId]: Math.min(full, cur + DRAIN_CHARS_PER_TICK),
        }
      })
    }
    const id = setInterval(tick, DRAIN_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isStreaming, lastAssistantId, messages])

  // When the stream ends, snap displayed length to full so trailing chars
  // don't sit invisible after the assistant's "ready" state.
  useEffect(() => {
    if (isStreaming) return
    setDisplayedLengths((prev) => {
      let changed = false
      const next = { ...prev }
      for (const m of messages) {
        const full = extractText(m).length
        if ((next[m.id] ?? 0) < full) {
          next[m.id] = full
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [isStreaming, messages])

  const submit = (text: string, source: 'input' | 'suggested' = 'input') => {
    const trimmed = text.trim()
    if (!trimmed) return
    if (status === 'streaming' || status === 'submitted') return
    posthog?.capture('chat_message_sent', {
      source,
      length: trimmed.length,
      message_index: messages.length,
    })
    sendMessage({ text: trimmed })
    setInput('')
  }

  const isThinking = status === 'submitted' || status === 'streaming'

  const resetConversation = () => {
    setMessages([])
    setDisplayedLengths({})
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* no-op */
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close chat with Umang' : 'Open chat with Umang'}
        className={`chat-trigger${open ? ' chat-trigger--open' : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="chat-trigger-dot" aria-hidden="true" />
        <span className="chat-trigger-label">{open ? 'CLOSE' : 'ASK UMANG'}</span>
      </button>

      <div
        className={`chat-overlay${open ? ' chat-overlay--open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`chat-panel${open ? ' chat-panel--open' : ''}`}
        role="dialog"
        aria-label="Chat with Umang"
        aria-hidden={!open}
      >
        <header className="chat-header">
          <div className="chat-header-meta">
            <span className="chat-header-meta-label">SESSION</span>
            <span className="chat-header-meta-sep">/</span>
            <span className="chat-header-meta-id">{sessionLabel}</span>
            <span className="chat-header-meta-sep" aria-hidden>·</span>
            <span className="chat-header-meta-hint">ESC TO CLOSE</span>
          </div>
          <h2 className="chat-header-title">
            ASK <em>umang</em>
          </h2>
          <div className="chat-header-actions">
            {messages.length > 0 ? (
              <button
                type="button"
                className="chat-reset"
                aria-label="Reset conversation"
                onClick={resetConversation}
                title="Reset conversation"
              >
                ↺
              </button>
            ) : null}
            <button
              type="button"
              className="chat-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>

        <div className="chat-scroller" ref={scrollerRef} data-lenis-prevent="true">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <p className="chat-welcome-lede">
                Hey — this is an AI version of me, grounded in my actual work. Ask
                about projects, roles I&rsquo;ve held, or what I&rsquo;m looking for next.
              </p>
              <p className="chat-welcome-note">
                If you&rsquo;d rather talk for real, drop your email anywhere in the
                chat and I&rsquo;ll get a notification on my phone.
              </p>
              <div className="chat-suggested">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button
                    key={p.label}
                    type="button"
                    className="chat-suggested-chip"
                    style={{ ['--chip-i' as string]: i }}
                    onClick={() => submit(p.label, 'suggested')}
                  >
                    <span className="chat-suggested-chip-icon" aria-hidden>
                      {p.icon}
                    </span>
                    <span className="chat-suggested-chip-text">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((m) => {
            const fullText = extractText(m)
            if (!fullText) return null
            const isLiveAssistant =
              m.role === 'assistant' && m.id === lastAssistantId && isStreaming
            const shown = isLiveAssistant
              ? fullText.slice(0, displayedLengths[m.id] ?? 0)
              : fullText
            if (!shown && !isLiveAssistant) return null
            return (
              <div key={m.id} className={`chat-msg chat-msg--${m.role}`}>
                <div className="chat-msg-label">
                  {m.role === 'user' ? 'YOU' : 'UMANG'}
                </div>
                <div
                  className={`chat-msg-body${
                    isLiveAssistant ? ' chat-msg-body--live' : ''
                  }`}
                >
                  {m.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        a: (props) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                      }}
                    >
                      {isLiveAssistant ? autoCloseMarkdown(shown) : shown}
                    </ReactMarkdown>
                  ) : (
                    <p>{shown}</p>
                  )}
                </div>
              </div>
            )
          })}

          {status === 'submitted' ? (
            <div className="chat-msg chat-msg--assistant">
              <div className="chat-msg-label">UMANG</div>
              <div className="chat-msg-body chat-thinking">
                <span /><span /><span />
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="chat-error">
              Something went wrong. Try again, or email me directly.
            </div>
          ) : null}
        </div>

        <form
          className="chat-input-row"
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
        >
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Ask anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            autoComplete="off"
          />
          {isThinking ? (
            <button type="button" className="chat-send chat-send--stop" onClick={() => stop()}>
              STOP
            </button>
          ) : (
            <button
              type="submit"
              className="chat-send"
              disabled={!input.trim()}
            >
              SEND →
            </button>
          )}
        </form>

      </aside>
    </>
  )
}
