'use client'

import { useEffect, useRef } from 'react'

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
            <div className="project-kicker">Featured Project · 2025</div>
            <div className="project-big-title">CARTOGRAPHER</div>
            <p className="project-desc-text">
              Codebase reasoning engine that indexes any GitHub repo and answers natural-language questions with source citations and line numbers. Every retrieval layer hand-built — no LangChain, no LlamaIndex. tree-sitter AST chunking, contextual LLM descriptions (35–49% retrieval improvement per Anthropic benchmarks), Qdrant hybrid search (dense + BM25 + RRF), Cohere cross-encoder reranking, HyDE + query expansion, and a full ReAct agent via MCP with 10 tools, working memory, and parallel async execution.
            </p>
          </div>
          <div className="project-bottom">
            <div className="project-stack-row">
              <span className="p-tag">FastAPI</span>
              <span className="p-tag">React/Vite</span>
              <span className="p-tag">Qdrant Cloud</span>
              <span className="p-tag">tree-sitter</span>
              <span className="p-tag">FastMCP</span>
              <span className="p-tag">Cohere</span>
              <span className="p-tag">Docker</span>
            </div>
            <div className="project-links">
              <a href="https://cartographer-app.vercel.app" target="_blank" rel="noopener noreferrer" className="p-link">
                Live Demo →
              </a>
              <a href="https://github.com/umanggarg28/Cartographer" target="_blank" rel="noopener noreferrer" className="p-link">
                GitHub →
              </a>
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
            <div className="project-cell project-cell--static appear hscroll-cell">
              <span className="pc-num">02</span>
              <div className="pc-kicker">AI · Computer Vision · Production · 2025</div>
              <div className="pc-title">CLEARSTAIN PIPELINE</div>
              <p className="pc-desc">AI virtual HE staining pipeline for unstained brightfield whole slide images, built at PictorLabs.ai (UCLA spinoff, venture-backed). Owned end-to-end: fine-tuned Google&apos;s PathFoundation vision model in PyTorch, built Django API with organ/species/diagnosis-based predictor routing, Kafka job orchestration, and TorchServe model serving.</p>
              <div className="pc-tags">
                <span className="p-tag">PyTorch</span>
                <span className="p-tag">Django</span>
                <span className="p-tag">Kafka</span>
                <span className="p-tag">TorchServe</span>
                <span className="p-tag">OpenSlide</span>
                <span className="p-tag">AWS ECS</span>
              </div>
              <span className="pc-note">Closed-source · proprietary</span>
            </div>
            <a className="project-cell appear hscroll-cell" href="https://github.com/umanggarg28/rag-research-copilot" target="_blank" rel="noopener noreferrer">
              <span className="pc-num">03</span>
              <div className="pc-kicker">RAG · Full Stack · 2025</div>
              <div className="pc-title">RAG RESEARCH COPILOT</div>
              <p className="pc-desc">RAG system for querying research papers — grounding answers in document content with full source citations. Custom semantic search (MiniLM embeddings + ChromaDB), BM25 keyword search, and hybrid retrieval via RRF fusion. No LangChain. Precursor to Cartographer — built to understand retrieval internals from first principles.</p>
              <div className="pc-tags">
                <span className="p-tag">FastAPI</span>
                <span className="p-tag">React</span>
                <span className="p-tag">BM25</span>
                <span className="p-tag">ChromaDB</span>
                <span className="p-tag">Hybrid Search</span>
              </div>
            </a>
            <a className="project-cell appear hscroll-cell" href="https://github.com/umanggarg28/transformer-from-scratch" target="_blank" rel="noopener noreferrer">
              <span className="pc-num">04</span>
              <div className="pc-kicker">Deep Learning · PyTorch · 2025</div>
              <div className="pc-title">TRANSFORMER FROM SCRATCH</div>
              <p className="pc-desc">Full encoder-decoder transformer implemented in PyTorch — multi-head attention, positional encoding, layer norm, greedy decoding, label smoothing, LR warmup. Trained EN→ES on the Opus Books dataset, end-to-end from &quot;Attention Is All You Need&quot;.</p>
              <div className="pc-tags">
                <span className="p-tag">PyTorch</span>
                <span className="p-tag">Attention</span>
                <span className="p-tag">Transformers</span>
                <span className="p-tag">NLP</span>
              </div>
            </a>
            <a className="project-cell appear hscroll-cell" href="https://github.com/umanggarg28/reinforcement-learning" target="_blank" rel="noopener noreferrer">
              <span className="pc-num">05</span>
              <div className="pc-kicker">Reinforcement Learning · 2025</div>
              <div className="pc-title">RL EXPERIMENTS</div>
              <p className="pc-desc">Q-learning, DQN (Breakout), and PPO (LunarLander) trained on Gymnasium with Stable Baselines 3 — plus a custom multi-agent dual-taxi environment built from scratch (observation space, reward shaping, training loop). Domain breadth: not just LLMs.</p>
              <div className="pc-tags">
                <span className="p-tag">PyTorch</span>
                <span className="p-tag">Gymnasium</span>
                <span className="p-tag">SB3</span>
                <span className="p-tag">DQN · PPO</span>
              </div>
            </a>
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
