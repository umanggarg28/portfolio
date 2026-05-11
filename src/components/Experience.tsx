'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { experiences } from '@/content/portfolio'
import SignalArtifacts from './SignalArtifacts'

const startYear = (period: string) => period.match(/(\d{4})/)?.[1] ?? ''

export default function Experience() {
  const [openId, setOpenId] = useState<string>('e1')
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const hoverIdxRef = useRef<number | null>(null)

  const toggleExp = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id))
  }

  const handleExpKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExp(id)
    }
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const measureRail = () => {
      const dots = section.querySelectorAll<HTMLElement>('.exp-idx')
      const items = section.querySelectorAll<HTMLElement>('.exp-item')
      if (!dots.length || !items.length) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const first = dots[0].getBoundingClientRect()
      const lastDot = dots[dots.length - 1].getBoundingClientRect()
      const lastItem = items[items.length - 1]
      const lastIsOpen = lastItem.classList.contains('open')

      const top = first.top + window.scrollY - sectionTop + first.height / 2
      const bottom = lastIsOpen
        ? lastItem.getBoundingClientRect().bottom + window.scrollY - sectionTop - 28
        : lastDot.top + window.scrollY - sectionTop + lastDot.height / 2

      section.style.setProperty('--rail-top', `${top}px`)
      section.style.setProperty('--rail-height', `${bottom - top}px`)
    }

    const updateActive = () => {
      if (hoverIdxRef.current !== null) {
        setActiveIdx(hoverIdxRef.current)
        return
      }
      const rows = section.querySelectorAll<HTMLElement>('.exp-row')
      const viewportCenter = window.innerHeight / 2
      let bestIdx = 0
      let bestDist = Infinity
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect()
        const rowCenter = rect.top + rect.height / 2
        const dist = Math.abs(rowCenter - viewportCenter)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      })
      setActiveIdx(bestIdx)
    }

    measureRail()
    updateActive()
    if (reduced) return

    let lastY = window.scrollY
    let velocity = 0
    let raf = 0

    const loop = () => {
      const y = window.scrollY
      const dy = Math.abs(y - lastY)
      lastY = y
      velocity = velocity * 0.82 + dy * 0.18
      const v = Math.min(1, Math.max(0, (velocity - 3) / 22))
      section.style.setProperty('--exp-velocity', v.toFixed(3))
      updateActive()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('resize', measureRail)
    const ro = new ResizeObserver(measureRail)
    ro.observe(section)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measureRail)
      ro.disconnect()
    }
  }, [openId])

  return (
    <section id="experience" ref={sectionRef}>
      <SignalArtifacts variant="experience" />
      <div className="section-header">
        <div className="section-num appear">INDEX <span className="section-num-sep">/</span> 02</div>
        <h2 className="section-title appear appear-delay-1">WORK <em>history</em></h2>
      </div>

      <div className="exp-rail-line" aria-hidden="true" />

      {experiences.map((exp, i) => {
        const isOpen = openId === exp.id
        const isActive = i === activeIdx

        return (
          <div
            key={exp.id}
            className={`exp-item${isOpen ? ' open' : ''}${isActive ? ' is-active' : ''}`}
          >
            <div
              className={`exp-row appear${exp.delayClass ? ' ' + exp.delayClass : ''}`}
              onClick={() => toggleExp(exp.id)}
              onKeyDown={(event) => handleExpKeyDown(event, exp.id)}
              onMouseEnter={() => { hoverIdxRef.current = i; setActiveIdx(i) }}
              onMouseLeave={() => { hoverIdxRef.current = null }}
              onFocus={() => { hoverIdxRef.current = i; setActiveIdx(i) }}
              onBlur={() => { hoverIdxRef.current = null }}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={exp.id}
            >
              <div className="exp-idx">
                <span className="exp-idx-dot" aria-hidden="true" />
                <span className="exp-idx-year">{startYear(exp.period)}</span>
              </div>
              <div className="exp-center">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company-row">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-location exp-location--inline">{exp.location}</span>
                </div>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span className="exp-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-period">{exp.period}</div>
              </div>
              <div className="exp-toggle" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
            <div className={`exp-detail${isOpen ? ' open' : ''}`} id={exp.id}>
              <div className="exp-detail-inner">
                {exp.bullets.map((bullet, i) => {
                  const html = bullet
                    .replace(/<stat>/g, '<span class="exp-stat">')
                    .replace(/<\/stat>/g, '</span>')
                  return (
                    <div className="exp-bullet" key={i} dangerouslySetInnerHTML={{ __html: html }} />
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
