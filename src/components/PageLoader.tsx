'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'count' | 'reveal' | 'lift' | 'done'>('count')
  const [skip, setSkip] = useState<boolean | null>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem('ug:loaded') === '1'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (seen || reduced) {
      setSkip(true)
      document.documentElement.classList.add('intro-done')
      return
    }
    setSkip(false)
    document.documentElement.classList.add('intro-active')

    const start = performance.now()
    const duration = 1100
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setPhase('reveal')
        setTimeout(() => setPhase('lift'), 700)
        setTimeout(() => {
          setPhase('done')
          document.documentElement.classList.remove('intro-active')
          document.documentElement.classList.add('intro-done')
          sessionStorage.setItem('ug:loaded', '1')
        }, 1500)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (skip === null || skip) return null
  if (phase === 'done') return null

  const name = 'UMANG GARG'

  return (
    <div id="page-loader" className={`pl-${phase}`} aria-hidden="true">
      <div className="pl-top">
        <span className="pl-label">Loading</span>
        <span className="pl-count">{String(progress).padStart(3, '0')}</span>
      </div>
      <div className="pl-name">
        {name.split('').map((c, i) => (
          <span className="pl-char" key={i} style={{ ['--i' as never]: i }}>
            <span className="pl-char-inner">{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
      </div>
      <div className="pl-bar"><div className="pl-bar-fill" style={{ transform: `scaleX(${progress / 100})` }} /></div>
    </div>
  )
}
