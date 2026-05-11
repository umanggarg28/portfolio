import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SITE_PALETTE } from '@/lib/theme'

export const alt = 'Umang Garg — Software & AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontsDir = join(process.cwd(), 'src/app/_og-fonts')
  const [bebas, playfair] = await Promise.all([
    readFile(join(fontsDir, 'BebasNeue-Regular.ttf')),
    readFile(join(fontsDir, 'PlayfairDisplay-Italic.ttf')),
  ])

  const bg = SITE_PALETTE.bg
  const fg = SITE_PALETTE.fg
  const accent = SITE_PALETTE.accent
  const fgDim = `rgba(${SITE_PALETTE.fgRgb},0.58)`
  const fgLine = `rgba(${SITE_PALETTE.fgRgb},0.18)`
  const accentDim = `rgba(${SITE_PALETTE.accentRgb},0.18)`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: bg,
          color: fg,
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          fontFamily: 'Bebas Neue',
          position: 'relative',
        }}
      >
        {/* grid + signal atmosphere */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              `linear-gradient(${accentDim} 1px, transparent 1px), linear-gradient(90deg, ${accentDim} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 70,
            top: 72,
            fontFamily: 'monospace',
            fontSize: 28,
            lineHeight: 1.35,
            color: `rgba(${SITE_PALETTE.accentRgb},0.32)`,
            whiteSpace: 'pre',
          }}
        >
          {'0  {  1  >\n  /  +  }  0\n[  =  <  *\n  1  ]  /'}
        </div>

        {/* top row: editorial anchors */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Bebas Neue',
            fontSize: 22,
            letterSpacing: '0.2em',
            color: fgDim,
          }}
        >
          <div style={{ display: 'flex' }}>INDEX / 00</div>
          <div style={{ display: 'flex' }}>EDITION · 2026</div>
        </div>

        {/* center: name + role */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: 220,
              letterSpacing: '-0.01em',
              lineHeight: 0.9,
              color: fg,
              display: 'flex',
            }}
          >
            UMANG GARG
          </div>
          <div
            style={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              fontSize: 60,
              color: accent,
              marginTop: 12,
              display: 'flex',
            }}
          >
            Software &amp; AI Engineer
          </div>
        </div>

        {/* bottom row: meta + domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: 28,
            borderTop: `1px solid ${fgLine}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: 'Bebas Neue',
              fontSize: 24,
              letterSpacing: '0.16em',
              color: fg,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: accent,
              }}
            />
            <span>AVAILABLE · SOFTWARE / AI ENGINEER</span>
          </div>
          <div
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: 28,
              letterSpacing: '0.1em',
              color: accent,
              display: 'flex',
            }}
          >
            UMANGGARG.DEV
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Bebas Neue', data: bebas, style: 'normal', weight: 400 },
        { name: 'Playfair Display', data: playfair, style: 'italic', weight: 400 },
      ],
    }
  )
}
