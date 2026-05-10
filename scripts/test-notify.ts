/**
 * Direct integration test for notify channels (bypasses the LLM).
 *
 * Run: npx tsx scripts/test-notify.ts
 *
 * Talks to Resend / Telegram directly with verbose logging so we can
 * see the actual API response — notify.ts swallows errors silently
 * by design.
 */

import { config as loadEnv } from 'dotenv'

loadEnv({ path: '.env.local' })

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'umanggarg28@gmail.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM = process.env.RESEND_FROM ?? 'Portfolio Bot <onboarding@resend.dev>'
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

console.log('Channels:')
console.log(`  RESEND_API_KEY      ${RESEND_API_KEY ? '✓ ' + RESEND_API_KEY.slice(0, 6) + '…' : '✗'}`)
console.log(`  RESEND_FROM         ${RESEND_FROM}`)
console.log(`  TELEGRAM_BOT_TOKEN  ${TELEGRAM_BOT_TOKEN ? '✓' : '✗'}`)
console.log(`  TELEGRAM_CHAT_ID    ${TELEGRAM_CHAT_ID ? '✓' : '✗'}`)
console.log(`  NOTIFY_EMAIL (to)   ${NOTIFY_EMAIL}`)
console.log()

async function testResend() {
  if (!RESEND_API_KEY) {
    console.log('▸ resend: skipped (no key)')
    return
  }
  console.log('▸ resend: sending test email')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: NOTIFY_EMAIL,
      subject: 'Portfolio notify test — please ignore',
      html: '<p>Test from <code>scripts/test-notify.ts</code>. If you got this, Resend is wired.</p>',
    }),
  })
  const body = await res.text()
  console.log(`  status: ${res.status}`)
  console.log(`  body:   ${body}`)
}

async function testTelegram() {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('▸ telegram: skipped (token or chat id missing)')
    return
  }
  console.log('▸ telegram: sending test message')
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: 'Portfolio notify test — please ignore.',
      }),
    }
  )
  const body = await res.text()
  console.log(`  status: ${res.status}`)
  console.log(`  body:   ${body}`)
}

async function main() {
  await testResend()
  console.log()
  await testTelegram()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
