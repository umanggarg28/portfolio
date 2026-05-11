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
          border: `2px solid ${SITE_PALETTE.accent}`,
          color: SITE_PALETTE.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          fontWeight: 900,
          fontFamily: 'Impact, Arial Narrow, sans-serif',
          letterSpacing: 0.5,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 4,
            top: 4,
            width: 4,
            height: 4,
            borderRadius: 999,
            background: SITE_PALETTE.accent,
          }}
        />
        UG
      </div>
    ),
    size
  )
}
