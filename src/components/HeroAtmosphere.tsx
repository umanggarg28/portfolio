'use client'

import { useEffect, useRef } from 'react'

export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = Math.max(80, Math.min(160, Math.floor((w * h) / 14000)))
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.3 + 0.4,
      a: Math.random() * 0.35 + 0.08,
    }))

    let mx = -9999
    let my = -9999
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onLeave = () => {
      mx = -9999
      my = -9999
    }
    window.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    if (reduced) {
      // Single static frame
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.fillStyle = `rgba(184, 255, 87, ${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('mousemove', onMove)
        canvas.removeEventListener('mouseleave', onLeave)
      }
    }

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 180 && dist > 0.001) {
          const f = (1 - dist / 180) * 0.045
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.965
        p.vy *= 0.965

        // Light random drift so particles don't fully stop
        p.vx += (Math.random() - 0.5) * 0.012
        p.vy += (Math.random() - 0.5) * 0.012

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.fillStyle = `rgba(184, 255, 87, ${p.a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-atmosphere" aria-hidden="true" />
}
