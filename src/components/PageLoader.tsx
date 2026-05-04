'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'count' | 'lift' | 'done'>('count')
  const [show, setShow] = useState<boolean | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShow(false)
      document.documentElement.classList.add('intro-done')
      return
    }
    setShow(true)
    document.documentElement.classList.add('intro-active')

    const start = performance.now()
    const duration = 1000
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => setPhase('lift'), 220)
        setTimeout(() => {
          setPhase('done')
          document.documentElement.classList.remove('intro-active')
          document.documentElement.classList.add('intro-done')
        }, 1050)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (show === null || show === false) return null
  if (phase === 'done') return null

  return (
    <div id="page-loader" className={`pl-${phase}`} aria-hidden="true">
      <div className="pl-top">
        <span className="pl-label">Loading</span>
      </div>
      <div className="pl-counter">
        <span className="pl-count">{String(progress).padStart(3, '0')}</span>
        <span className="pl-count-pct">/100</span>
      </div>
      <div className="pl-bar">
        <div className="pl-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  )
}
