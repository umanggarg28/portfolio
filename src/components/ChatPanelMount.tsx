'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const ChatPanel = dynamic(() => import('@/components/ChatPanel'), { ssr: false })

/**
 * Mounts the chat panel on every route EXCEPT private/admin pages.
 * Keep `/ops` clean — no chat trigger, no panel.
 */
export default function ChatPanelMount() {
  const pathname = usePathname()
  if (pathname.startsWith('/ops')) return null
  return <ChatPanel />
}
