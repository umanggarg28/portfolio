import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy PostHog through our domain so ad-blockers don't drop events.
  // /ingest/* on umanggarg.dev → us.i.posthog.com (or assets host for static).
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  // PostHog uses trailing slashes on its ingest endpoints; the rewrite must
  // not strip them. Next 16 leaves trailingSlash false by default, which
  // matches PostHog's expectations — leaving this comment so future-me
  // doesn't flip it.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
