'use client'

import { useEffect, useRef } from 'react'

const HEADLINE = 'UMANG GARG'
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#*+/<>=$%01'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const triggerEntrance = () => {
      const heroEls = document.querySelectorAll<HTMLElement>('#hero .appear')
      heroEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), 80 + i * 130)
      })
      runScramble()
    }

    const runScramble = () => {
      const charEls = Array.from(
        document.querySelectorAll<HTMLElement>('.hero-headline .char-mag')
      )
      if (!charEls.length) return
      const finals = charEls.map((el) => el.dataset.final ?? el.textContent ?? '')

      if (reduced) {
        charEls.forEach((el, i) => {
          el.textContent = finals[i]
          el.style.opacity = '1'
          el.style.filter = ''
        })
        headlineRef.current?.classList.add('in')
        return
      }

      const stagger = 65
      const holdMs = 415
      const start = performance.now()
      let lastFlip = 0
      let raf = 0
      const tick = (now: number) => {
        const elapsed = now - start
        const flip = elapsed - lastFlip >= 55
        let allSettled = true
        charEls.forEach((cel, i) => {
          const settleAt = i * stagger + holdMs
          if (finals[i] === ' ') {
            cel.textContent = ' '
            cel.style.opacity = '1'
            cel.style.filter = ''
            return
          }
          if (elapsed >= settleAt) {
            if (cel.textContent !== finals[i]) cel.textContent = finals[i]
            cel.style.opacity = '1'
            cel.style.filter = ''
          } else {
            const t = Math.max(0, elapsed / settleAt)
            cel.style.opacity = String(0.15 + 0.85 * t)
            cel.style.filter = `blur(${(1 - t) * 6}px)`
            if (flip) {
              const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              cel.textContent = g
            }
            allSettled = false
          }
        })
        if (flip) lastFlip = elapsed
        if (!allSettled) raf = requestAnimationFrame(tick)
        else headlineRef.current?.classList.add('in')
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

    if (document.documentElement.classList.contains('intro-done')) {
      triggerEntrance()
    } else {
      const obs = new MutationObserver(() => {
        if (document.documentElement.classList.contains('intro-done')) {
          triggerEntrance()
          obs.disconnect()
        }
      })
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.appear:not(#hero .appear)').forEach((el) => {
      revealObserver.observe(el)
    })

    if (reduced) {
      return () => revealObserver.disconnect()
    }

    // Cursor magnetism — per-letter pull + magnetic CTA
    const chars = Array.from(document.querySelectorAll<HTMLElement>('.hero-headline .char-mag'))
    const cta = document.querySelector<HTMLElement>('.hero-cta')
    const heroSection = document.getElementById('hero')

    let mx = -9999, my = -9999
    let rafId = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    document.addEventListener('mousemove', onMouseMove, { passive: true })

    const animate = () => {
      const radius = 280
      const inHero = heroSection ? my <= heroSection.getBoundingClientRect().bottom : true
      chars.forEach((char) => {
        if (!inHero) {
          char.style.transform = ''
          return
        }
        const r = char.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mx - cx
        const dy = my - cy
        const dist = Math.hypot(dx, dy)
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.45
          char.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
        } else {
          char.style.transform = ''
        }
      })

      if (cta) {
        const r = cta.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mx - cx
        const dy = my - cy
        const dist = Math.hypot(dx, dy)
        const ctaRadius = 110
        if (dist < ctaRadius) {
          const pull = (1 - dist / ctaRadius) * 0.32
          cta.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
        } else {
          cta.style.transform = ''
        }
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      revealObserver.disconnect()
      chars.forEach((c) => (c.style.transform = ''))
      if (cta) cta.style.transform = ''
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-bg-number" aria-hidden="true">08</div>
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>
      <div className="hero-content">
        <h1 className="hero-headline" ref={headlineRef} aria-label="Umang Garg">
          <span className="hero-headline-row">
            {HEADLINE.split('').map((c, i) => (
              <span className="char" key={i} aria-hidden="true">
                <span
                  className="char-mag"
                  data-final={c}
                  style={{ opacity: 0.15 }}
                >
                  {c === ' ' ? ' ' : c}
                </span>
              </span>
            ))}
          </span>
          <span className="italic-word appear appear-delay-1">Software &amp; AI Engineer</span>
        </h1>
        <div className="hero-bottom appear appear-delay-2">
          <div className="hero-bottom-left">
            <div className="hero-availability">
              <span className="dot-pulse" />
              <span>Available · AI Engineering roles · Open to remote</span>
            </div>
            <p className="hero-desc">
              I build production AI systems end-to-end — from fine-tuned models to shipped product.
              8 years engineering; the last two on LLM tooling and agentic workflows.
            </p>
            <a href="#projects" className="hero-cta">View Work →</a>
          </div>
          <div className="hero-meta appear appear-delay-3">
            <div className="hero-meta-item">Role · <span>Full Stack + AI</span></div>
            <div className="hero-meta-item">Stack · <span>Python · React · AWS</span></div>
            <div className="hero-meta-item">Focus · <span>LLMs · RAG · Agents</span></div>
            <div className="hero-meta-item">Education · <span>MS @ RIT · 3.94 GPA</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
