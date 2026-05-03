'use client'

import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    // Hero cursor parallax
    const heroHeadline = document.querySelector<HTMLElement>('.hero-headline')
    const heroSection = document.getElementById('hero')

    const onMouseMove = (e: MouseEvent) => {
      if (!heroSection || !heroHeadline) return
      const rect = heroSection.getBoundingClientRect()
      if (e.clientY > rect.bottom) return
      const cx = (e.clientX / window.innerWidth - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      heroHeadline.style.transform = `translate(${cx * 8}px, ${cy * 5}px)`
    }
    document.addEventListener('mousemove', onMouseMove)

    // Hero entrance animation
    const heroEls = document.querySelectorAll<HTMLElement>('#hero .appear')
    heroEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 120 + i * 150)
    })

    // Scroll reveal for non-hero elements
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

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      revealObserver.disconnect()
    }
  }, [])

  return (
    <section id="hero">
      <div className="hero-bg-number" aria-hidden="true">08</div>
      <div className="hero-content">
        <h1 className="hero-headline appear appear-delay-1">
          UMANG GARG<br />
          <span className="italic-word">Software &amp; AI Engineer</span>
        </h1>
        <div className="hero-bottom appear appear-delay-2">
          <div className="hero-bottom-left">
            <p className="hero-desc">
              8+ years building production-grade systems at the intersection of
              software engineering and applied AI — LLM tooling, agentic workflows,
              and full-stack platforms.
            </p>
            <a href="#projects" className="hero-cta">View Work →</a>
          </div>
          <div className="hero-meta appear appear-delay-3">
            <div className="hero-meta-item">Role · <span>Full Stack + AI</span></div>
            <div className="hero-meta-item">Stack · <span>Python · React · AWS</span></div>
            <div className="hero-meta-item">Focus · <span>LLMs · RAG · Agents</span></div>
            <div className="hero-meta-item">Education · <span>MS @ Rochester Institute of Technology · 3.94 GPA</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
