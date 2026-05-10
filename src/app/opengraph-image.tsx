import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Umang Garg — Software & AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontsDir = join(process.cwd(), 'src/app/_og-fonts')
  const [bebas, playfair] = await Promise.all([
    readFile(join(fontsDir, 'BebasNeue-Regular.ttf')),
    readFile(join(fontsDir, 'PlayfairDisplay-Italic.ttf')),
  ])

  const lime = '#b8ff57'
  const ink = '#080908'
  const inkDim = 'rgba(8,9,8,0.55)'
  const inkLine = 'rgba(8,9,8,0.20)'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: lime,
          color: ink,
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          fontFamily: 'Bebas Neue',
          position: 'relative',
        }}
      >
        {/* dotted grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(8,9,8,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* top row: editorial anchors */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Bebas Neue',
            fontSize: 22,
            letterSpacing: '0.2em',
            color: inkDim,
            zIndex: 1,
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
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: 220,
              letterSpacing: '-0.01em',
              lineHeight: 0.9,
              color: ink,
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
              color: ink,
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
            borderTop: `1px solid ${inkLine}`,
            zIndex: 1,
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
              color: ink,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: ink,
              }}
            />
            <span>AVAILABLE · SOFTWARE / AI ENGINEER</span>
          </div>
          <div
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: 28,
              letterSpacing: '0.1em',
              color: ink,
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
