'use client'

import { useState, type KeyboardEvent } from 'react'
import { experiences } from '@/content/portfolio'

export default function Experience() {
  const [openId, setOpenId] = useState<string>('e1')

  const toggleExp = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id))
  }

  const handleExpKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExp(id)
    }
  }

  return (
    <section id="experience">
      <div className="section-header">
        <div className="section-num appear">— 02</div>
        <h2 className="section-title appear appear-delay-1">WORK <em>history</em></h2>
      </div>

      {experiences.map((exp) => {
        const isOpen = openId === exp.id

        return (
          <div key={exp.id} className={`exp-item${isOpen ? ' open' : ''}`}>
            <div
              className={`exp-row appear${exp.delayClass ? ' ' + exp.delayClass : ''}`}
              onClick={() => toggleExp(exp.id)}
              onKeyDown={(event) => handleExpKeyDown(event, exp.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={exp.id}
            >
              <div className="exp-idx">{exp.idx}</div>
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
