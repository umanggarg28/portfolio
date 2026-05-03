'use client'
import { useEffect, useRef } from 'react'

const W = 500
const H = 500
const PARTICLE_COUNT = 155
const CONNECTION_DIST = 78
const REPULSION_R = 110

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
  isHub: boolean
}

function initParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const isHub = i < 18
    // Gaussian-ish scatter: most particles near center, spill toward edges
    const angle = Math.random() * Math.PI * 2
    const r = Math.pow(Math.random(), 0.55) * (W * 0.48)
    return {
      x: W / 2 + Math.cos(angle) * r,
      y: H / 2 + Math.sin(angle) * r,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: isHub ? Math.random() * 1.4 + 1.6 : Math.random() * 1.0 + 0.4,
      opacity: isHub ? Math.random() * 0.3 + 0.45 : Math.random() * 0.25 + 0.12,
      isHub,
    }
  })
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const particles = initParticles()
    let mouseX = -999, mouseY = -999
    let raf: number

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * (W / rect.width)
      mouseY = (e.clientY - rect.top) * (H / rect.height)
    }
    const onLeave = () => { mouseX = -999; mouseY = -999 }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    // Radial fade mask: opacity multiplier based on distance from center
    const radialFade = (x: number, y: number) => {
      const dx = x - W / 2, dy = y - H / 2
      const d = Math.sqrt(dx * dx + dy * dy) / (W * 0.48)
      return Math.max(0, 1 - d * d)
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        // Organic drift: small random walk
        p.vx += (Math.random() - 0.5) * 0.018
        p.vy += (Math.random() - 0.5) * 0.018

        // Gentle center pull so field stays cohesive
        p.vx += (W / 2 - p.x) * 0.00012
        p.vy += (H / 2 - p.y) * 0.00012

        // Mouse repulsion
        const mdx = p.x - mouseX, mdy = p.y - mouseY
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < REPULSION_R && mdist > 0) {
          const force = ((REPULSION_R - mdist) / REPULSION_R) * 0.9
          p.vx += (mdx / mdist) * force
          p.vy += (mdy / mdist) * force
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const maxSpd = 0.45
        if (spd > maxSpd) { p.vx *= maxSpd / spd; p.vy *= maxSpd / spd }

        p.x += p.vx
        p.y += p.vy

        // Soft boundary: push back from edges
        const margin = 20
        if (p.x < margin) p.vx += 0.04
        if (p.x > W - margin) p.vx -= 0.04
        if (p.y < margin) p.vy += 0.04
        if (p.y > H - margin) p.vy -= 0.04
      }

      // Draw connections
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const fa = radialFade(a.x, a.y)
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const threshold = (a.isHub || b.isHub) ? CONNECTION_DIST * 1.25 : CONNECTION_DIST
          if (dist < threshold) {
            const fb = radialFade(b.x, b.y)
            const proximity = 1 - dist / threshold
            const alpha = proximity * proximity * 0.13 * Math.min(fa, fb)
            ctx.strokeStyle = `rgba(184,255,87,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const fade = radialFade(p.x, p.y)
        const alpha = p.opacity * fade
        if (alpha < 0.01) continue

        if (p.isHub) {
          // Hub: soft glow halo
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
          grad.addColorStop(0, `rgba(184,255,87,${(alpha * 0.9).toFixed(3)})`)
          grad.addColorStop(1, 'rgba(184,255,87,0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgba(184,255,87,${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hero-visual"
      style={{ width: W, height: H }}
      aria-hidden="true"
    />
  )
}
