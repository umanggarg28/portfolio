/**
 * Notification helpers — Telegram (push to phone, owner can reply
 * directly from the notification) + Resend (email backup / log).
 *
 * Env vars (all optional — missing ones silently no-op so the bot
 * still works in dev without configuring everything):
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 * - RESEND_API_KEY
 * - NOTIFY_EMAIL (defaults to umanggarg28@gmail.com)
 */

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'umanggarg28@gmail.com'

export type LeadPayload = {
  email: string
  name?: string
  intent?: string
  notes?: string
  conversation?: string
}

export type UnknownQuestionPayload = {
  question: string
  why?: string
  conversation?: string
}

const escapeMd = (s: string) =>
  s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (m) => `\\${m}`)

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    })
  } catch (err) {
    console.error('[notify] telegram failed', err)
  }
}

type SendEmailOpts = {
  to?: string
  subject: string
  html: string
  attachments?: Array<{ filename: string; content: string }>
  replyTo?: string
}

async function sendEmail(opts: SendEmailOpts): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY not set' }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Portfolio Bot <onboarding@resend.dev>',
      to: opts.to ?? NOTIFY_EMAIL,
      subject: opts.subject,
      html: opts.html,
      ...(opts.attachments ? { attachments: opts.attachments } : {}),
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    })
    if (error) {
      console.error('[notify] resend error', error)
      return { ok: false, error: error.message }
    }
    return { ok: true }
  } catch (err) {
    console.error('[notify] resend failed', err)
    return { ok: false, error: (err as Error).message }
  }
}

export async function notifyLead(p: LeadPayload): Promise<void> {
  const tg = [
    '🟢 *New lead via portfolio*',
    `*Email:* ${escapeMd(p.email)}`,
    p.name ? `*Name:* ${escapeMd(p.name)}` : null,
    p.intent ? `*Intent:* ${escapeMd(p.intent)}` : null,
    p.notes ? `*Notes:* ${escapeMd(p.notes)}` : null,
    p.conversation ? `*Last turn:* ${escapeMd(p.conversation.slice(0, 400))}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.55">
      <h2 style="margin:0 0 12px">New lead via portfolio</h2>
      <p><strong>Email:</strong> <a href="mailto:${p.email}">${p.email}</a></p>
      ${p.name ? `<p><strong>Name:</strong> ${p.name}</p>` : ''}
      ${p.intent ? `<p><strong>Intent:</strong> ${p.intent}</p>` : ''}
      ${p.notes ? `<p><strong>Notes:</strong> ${p.notes}</p>` : ''}
      ${p.conversation ? `<hr/><p style="white-space:pre-wrap;color:#555;font-size:14px">${p.conversation}</p>` : ''}
    </div>
  `

  await Promise.all([
    sendTelegram(tg),
    sendEmail({ subject: `New lead: ${p.email}`, html }),
  ])
}

export async function notifyUnknownQuestion(p: UnknownQuestionPayload): Promise<void> {
  const tg = [
    '🟡 *Question I couldn\\u2019t answer*',
    `*Q:* ${escapeMd(p.question)}`,
    p.why ? `*Why:* ${escapeMd(p.why)}` : null,
    p.conversation ? `*Last turn:* ${escapeMd(p.conversation.slice(0, 400))}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.55">
      <h2 style="margin:0 0 12px">Unanswered question</h2>
      <p><strong>Question:</strong> ${p.question}</p>
      ${p.why ? `<p><strong>Why I couldn't answer:</strong> ${p.why}</p>` : ''}
      ${p.conversation ? `<hr/><p style="white-space:pre-wrap;color:#555;font-size:14px">${p.conversation}</p>` : ''}
    </div>
  `

  await Promise.all([
    sendTelegram(tg),
    sendEmail({ subject: `Unanswered: ${p.question.slice(0, 60)}`, html }),
  ])
}

export type SendResumePayload = {
  email: string
  name?: string
}

const RESUME_URL = 'https://umanggarg.dev/UmangGargResume.pdf'

export async function sendResumeToVisitor(
  p: SendResumePayload
): Promise<{ ok: boolean; error?: string }> {
  let attachment: { filename: string; content: string } | null = null
  try {
    const r = await fetch(RESUME_URL, { cache: 'no-store' })
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer())
      attachment = { filename: 'Umang-Garg-Resume.pdf', content: buf.toString('base64') }
    }
  } catch (err) {
    console.error('[notify] resume fetch failed', err)
  }

  const greet = p.name ? `Hi ${p.name},` : 'Hi,'
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.55;color:#222">
      <p>${greet}</p>
      <p>Thanks for the interest — my resume is attached${
        attachment ? '' : `, and you can also <a href="${RESUME_URL}">download it here</a>`
      }.</p>
      ${attachment ? `<p>If the attachment doesn't open, the PDF is also at <a href="${RESUME_URL}">${RESUME_URL}</a>.</p>` : ''}
      <p>Happy to chat further — just reply to this email.</p>
      <p>— Umang</p>
    </div>
  `

  const result = await sendEmail({
    to: p.email,
    subject: 'Umang Garg — Resume',
    html,
    replyTo: 'umanggarg28@gmail.com',
    ...(attachment ? { attachments: [attachment] } : {}),
  })

  // Ping owner so they know a resume went out, even if visitor never replies.
  if (result.ok) {
    const tg = [
      '📄 *Resume sent*',
      `*To:* ${escapeMd(p.email)}`,
      p.name ? `*Name:* ${escapeMd(p.name)}` : null,
      attachment ? '*Attached:* PDF' : '*Attached:* link only \\(fetch failed\\)',
    ]
      .filter(Boolean)
      .join('\n')
    await sendTelegram(tg)
  }

  return result
}
