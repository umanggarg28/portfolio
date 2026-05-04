'use client'

import { useEffect, useRef } from 'react'
import { featuredProject, projects } from '@/content/portfolio'

export default function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mqMobile = window.matchMedia('(max-width: 900px)')

    let distance = 0

    const measure = () => {
      if (mqMobile.matches) {
        wrap.style.height = ''
        track.style.transform = ''
        if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)'
        if (indexRef.current) indexRef.current.textContent = '02 / 05'
        distance = 0
        return
      }
      const trackWidth = track.scrollWidth
      const vw = window.innerWidth
      distance = Math.max(0, trackWidth - vw)
      wrap.style.height = `${window.innerHeight + distance}px`
    }

    const update = () => {
      if (mqMobile.matches || distance === 0) return
      const rect = wrap.getBoundingClientRect()
      const total = wrap.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / total))
      const x = -progress * distance
      track.style.transform = `translate3d(${x}px, 0, 0)`
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
      if (indexRef.current) {
        const current = Math.min(5, Math.max(2, 2 + Math.floor(progress * 4)))
        indexRef.current.textContent = `${String(current).padStart(2, '0')} / 05`
      }
    }

    measure()
    update()
    if (reduced) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        update()
      })
    }
    const onResize = () => {
      measure()
      update()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    mqMobile.addEventListener('change', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      mqMobile.removeEventListener('change', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="projects">
      <div className="section-header">
        <div className="section-num appear">— 03</div>
        <h2 className="section-title appear appear-delay-1">SELECTED <em>work</em></h2>
      </div>

      {/* Featured: Cartographer */}
      <div className="project-featured">
        <div className="project-featured-left appear">
          <div className="project-featured-index" aria-hidden="true">01</div>
          <div>
            <div className="project-kicker">{featuredProject.kicker}</div>
            <div className="project-big-title">{featuredProject.title}</div>
            <p className="project-desc-text">
              {featuredProject.description}
            </p>
          </div>
          <div className="project-bottom">
            <div className="project-stack-row">
              {featuredProject.tags.map((tag) => (
                <span className="p-tag" key={tag}>{tag}</span>
              ))}
            </div>
            <div className="project-links">
              {featuredProject.links.map((link) => (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="p-link" key={link.href}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="project-featured-right appear appear-delay-2">
          <div className="terminal">
            <div className="terminal-bar">
              <div className="t-dot r" />
              <div className="t-dot y" />
              <div className="t-dot g" />
              <div className="terminal-title">cartographer / retrieval.py</div>
            </div>
            <div className="terminal-body">
              <div className="t-ln"><span className="t-lnum">1</span><span className="t-cm"># HyDE + Hybrid Search + Reranking</span></div>
              <div className="t-ln"><span className="t-lnum">2</span></div>
              <div className="t-ln"><span className="t-lnum">3</span><span className="t-kw">async def</span> <span className="t-fn">retrieve</span>(<span className="t-var">query</span>: <span className="t-acc">str</span>, <span className="t-var">repo_id</span>: <span className="t-acc">str</span>):</div>
              <div className="t-ln"><span className="t-lnum">4</span>&nbsp;&nbsp;<span className="t-cm"># Generate hypothetical answer (HyDE)</span></div>
              <div className="t-ln"><span className="t-lnum">5</span>&nbsp;&nbsp;<span className="t-var">hypo</span> = <span className="t-kw">await</span> <span className="t-fn">llm.complete</span>(<span className="t-str">{`f"Answer: {'{query}'}`}</span>)</div>
              <div className="t-ln"><span className="t-lnum">6</span>&nbsp;&nbsp;<span className="t-cm"># Dense + BM25 → Reciprocal Rank Fusion</span></div>
              <div className="t-ln"><span className="t-lnum">7</span>&nbsp;&nbsp;<span className="t-var">hits</span> = <span className="t-kw">await</span> <span className="t-fn">qdrant.hybrid_search</span>(</div>
              <div className="t-ln"><span className="t-lnum">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-var">collection</span>=repo_id, <span className="t-var">query</span>=hypo, <span className="t-var">top_k</span>=<span className="t-num">20</span></div>
              <div className="t-ln"><span className="t-lnum">9</span>&nbsp;&nbsp;)</div>
              <div className="t-ln"><span className="t-lnum">10</span>&nbsp;&nbsp;<span className="t-cm"># Cross-encoder reranking via Cohere</span></div>
              <div className="t-ln"><span className="t-lnum">11</span>&nbsp;&nbsp;<span className="t-kw">return</span> <span className="t-fn">cohere.rerank</span>(</div>
              <div className="t-ln"><span className="t-lnum">12</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-var">query</span>=query, <span className="t-var">docs</span>=hits, <span className="t-var">top_n</span>=<span className="t-num">5</span></div>
              <div className="t-ln"><span className="t-lnum">13</span>&nbsp;&nbsp;)</div>
              <div className="t-ln"><span className="t-lnum">14</span></div>
              <div className="t-ln"><span className="t-lnum">15</span><span className="t-cm"># ReAct Agent — 10 MCP tools, working memory</span></div>
              <div className="t-ln"><span className="t-lnum">16</span><span className="t-var">agent</span> = <span className="t-fn">ReActAgent</span>(</div>
              <div className="t-ln"><span className="t-lnum">17</span>&nbsp;&nbsp;<span className="t-var">tools</span>=mcp_server.tools,&nbsp;&nbsp;<span className="t-cm"># 10 tools</span></div>
              <div className="t-ln"><span className="t-lnum">18</span>&nbsp;&nbsp;<span className="t-var">memory</span>=<span className="t-acc">WorkingMemory</span>(),</div>
              <div className="t-ln"><span className="t-lnum">19</span>&nbsp;&nbsp;<span className="t-var">parallel</span>=<span className="t-kw">True</span></div>
              <div className="t-ln"><span className="t-lnum">20</span>)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal-scroll project track */}
      <div className="hscroll-wrap" ref={wrapRef}>
        <div className="hscroll-pin">
          <div className="hscroll-affordance" aria-hidden="true">
            <span>Scroll to explore</span>
            <div className="hscroll-progress">
              <div className="hscroll-progress-fill" ref={progressRef} />
            </div>
            <span ref={indexRef}>02 / 05</span>
          </div>
          <div className="hscroll-track" ref={trackRef}>
            {projects.map((project) => {
              const body = (
                <>
                  <span className="pc-num">{project.idx}</span>
                  <div className="pc-kicker">{project.kicker}</div>
                  <div className="pc-title">{project.title}</div>
                  <p className="pc-desc">{project.description}</p>
                  <div className="pc-tags">
                    {project.tags.map((tag) => (
                      <span className="p-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.note ? <span className="pc-note">{project.note}</span> : null}
                </>
              )

              return project.href ? (
                <a
                  className="project-cell appear hscroll-cell"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={project.idx}
                >
                  {body}
                </a>
              ) : (
                <div className="project-cell project-cell--static appear hscroll-cell" key={project.idx}>
                  {body}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="projects-foot">
        <a
          className="p-link"
          href="https://github.com/umanggarg28"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub →
        </a>
      </div>
    </section>
  )
}
