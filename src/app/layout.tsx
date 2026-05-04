import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'
import PageLoader from '@/components/PageLoader'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Umang Garg — Software & AI Engineer',
  description:
    '8+ years building production-grade systems at the intersection of software engineering and applied AI — LLM tooling, agentic workflows, and full-stack platforms.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${playfairDisplay.variable}`}
      style={
        {
          '--display': 'var(--font-bebas), Impact, sans-serif',
          '--sans': 'var(--font-dm-sans), system-ui, sans-serif',
          '--italic': 'var(--font-playfair), Georgia, serif',
        } as React.CSSProperties
      }
    >
      <body>
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <PageLoader />
        {children}
      </body>
    </html>
  )
}
