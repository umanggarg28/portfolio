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

async function sendEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Portfolio Bot <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      subject,
      html,
    })
  } catch (err) {
    console.error('[notify] resend failed', err)
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

  await Promise.all([sendTelegram(tg), sendEmail(`New lead: ${p.email}`, html)])
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
    sendEmail(`Unanswered: ${p.question.slice(0, 60)}`, html),
  ])
}
