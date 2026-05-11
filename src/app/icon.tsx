import { ImageResponse } from 'next/og'
import { SITE_PALETTE } from '@/lib/theme'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: SITE_PALETTE.bg,
          color: SITE_PALETTE.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          fontWeight: 900,
          fontFamily: 'Impact, Arial Narrow, sans-serif',
          letterSpacing: 0.5,
        }}
      >
        UG
      </div>
    ),
    size
  )
}
