import { PostHogProvider, PostHogPageView } from '@posthog/next'
import { Suspense } from 'react'

/**
 * Wraps children in PostHogProvider only when NEXT_PUBLIC_POSTHOG_KEY is set.
 * Without the env var, renders a passthrough so dev/local builds don't fail
 * and missing-key prerender doesn't blow up. Matches the silent-no-op pattern
 * used by Langfuse / Telegram / Resend integrations elsewhere in this app.
 */
export default function AnalyticsShell({
  children,
}: {
  children: React.ReactNode
}) {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!apiKey) return <>{children}</>

  return (
    <PostHogProvider
      apiKey={apiKey}
      clientOptions={{ api_host: '/ingest' }}
    >
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PostHogProvider>
  )
}
