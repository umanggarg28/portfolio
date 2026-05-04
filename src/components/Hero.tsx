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

    const scrambleTextNode = (node: Text, duration = 520) => {
      const finalText = node.textContent ?? ''
      if (!finalText.trim()) return

      const start = performance.now()
      let lastFlip = 0
      let raf = 0

      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(1, elapsed / duration)
        const flip = elapsed - lastFlip >= 62

        if (progress >= 1) {
          node.textContent = finalText
          return
        }

        if (flip) {
          node.textContent = finalText
            .split('')
            .map((char, i) => {
              if (!/[A-Z]/.test(char)) return char
              const settle = i / Math.max(1, finalText.length - 1)
              if (progress > settle * 0.65 + 0.28) return char
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
          lastFlip = elapsed
        }

        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

    const scrambleSectionTitle = (el: Element) => {
      const title = el as HTMLElement
      if (title.dataset.scrambled === 'true') return
      title.dataset.scrambled = 'true'
      title.classList.add('is-resolving')

      Array.from(title.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          scrambleTextNode(node as Text)
        }
      })
      setTimeout(() => title.classList.remove('is-resolving'), 620)
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
            if (!reduced && entry.target.classList.contains('section-title')) {
              scrambleSectionTitle(entry.target)
            }
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

    let heroBottom = heroSection?.getBoundingClientRect().bottom ?? window.innerHeight
    let charCenters: Array<{ el: HTMLElement; x: number; y: number }> = []
    let ctaCenter: { x: number; y: number } | null = null
    let measureRaf = 0

    const resetMagnetism = () => {
      chars.forEach((char) => (char.style.transform = ''))
      if (cta) cta.style.transform = ''
    }

    const measureMagneticTargets = () => {
      heroBottom = heroSection?.getBoundingClientRect().bottom ?? window.innerHeight
      charCenters = chars.map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          el,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      })

      if (cta) {
        const rect = cta.getBoundingClientRect()
        ctaCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(measureRaf)
      measureRaf = requestAnimationFrame(measureMagneticTargets)
    }

    const onMouseMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      if (my > heroBottom) {
        resetMagnetism()
        return
      }

      const radius = 280
      charCenters.forEach(({ el, x, y }) => {
        const dx = mx - x
        const dy = my - y
        const dist = Math.hypot(dx, dy)
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.45
          el.style.transform = `translate3d(${dx * pull}px, ${dy * pull}px, 0)`
        } else {
          el.style.transform = ''
        }
      })

      if (cta && ctaCenter) {
        const dx = mx - ctaCenter.x
        const dy = my - ctaCenter.y
        const dist = Math.hypot(dx, dy)
        const ctaRadius = 110
        if (dist < ctaRadius) {
          const pull = (1 - dist / ctaRadius) * 0.32
          cta.style.transform = `translate3d(${dx * pull}px, ${dy * pull}px, 0)`
        } else {
          cta.style.transform = ''
        }
      }
    }

    setTimeout(measureMagneticTargets, 80)
    document.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', scheduleMeasure, { passive: true })
    window.addEventListener('scroll', scheduleMeasure, { passive: true })

    return () => {
      cancelAnimationFrame(measureRaf)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('scroll', scheduleMeasure)
      revealObserver.disconnect()
      resetMagnetism()
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
