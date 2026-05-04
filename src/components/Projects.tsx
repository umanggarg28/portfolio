export default function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <div className="section-num appear">— 03</div>
        <h2 className="section-title appear appear-delay-1">SELECTED <em>work</em></h2>
      </div>

      {/* Featured: Cartographer */}
      <div className="project-featured">
        <div className="project-featured-left appear">
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
            <a href="https://cartographer-app.vercel.app" target="_blank" rel="noopener noreferrer" className="p-link">
              Live Demo →
            </a>
            <a href="https://github.com/umanggarg28/Cartographer" target="_blank" rel="noopener noreferrer" className="p-link" style={{ marginLeft: '16px' }}>
              GitHub →
            </a>
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

      {/* Project grid */}
      <div className="project-grid">
        <div className="project-cell project-cell--static appear">
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
        <a className="project-cell appear appear-delay-1" href="https://github.com/umanggarg28/rag-research-copilot" target="_blank" rel="noopener noreferrer">
          <div className="pc-kicker">RAG · Full Stack · 2025</div>
          <div className="pc-title">RAG RESEARCH COPILOT</div>
          <p className="pc-desc">RAG system for querying research papers — grounding answers in document content with full source citations. Custom semantic search (MiniLM embeddings + ChromaDB), BM25 keyword search, and hybrid retrieval via RRF fusion. No LangChain. Precursor to Cartographer, built to understand retrieval internals from first principles.</p>
          <div className="pc-tags">
            <span className="p-tag">FastAPI</span>
            <span className="p-tag">React</span>
            <span className="p-tag">BM25</span>
            <span className="p-tag">Hybrid Search</span>
            <span className="p-tag">Python</span>
          </div>
        </a>
        <a className="project-cell appear" href="https://github.com/umanggarg28/react-agent-from-scratch" target="_blank" rel="noopener noreferrer">
          <div className="pc-kicker">Agents · From Scratch · 2025</div>
          <div className="pc-title">REACT AGENT FROM SCRATCH</div>
          <p className="pc-desc">Minimal Python implementation of the ReAct (Reason + Act) loop — no LangChain, no AutoGen. Every step explicit: think, generate JSON tool call, execute, inject result, repeat. Built to prove that agents are fundamentally structured prompting + a loop, before reaching for frameworks like LangGraph.</p>
          <div className="pc-tags">
            <span className="p-tag">Python</span>
            <span className="p-tag">ReAct Pattern</span>
            <span className="p-tag">Tool Use</span>
            <span className="p-tag">HuggingFace</span>
          </div>
        </a>
        <a className="project-cell appear appear-delay-1" href="https://github.com/umanggarg28/transformer-from-scratch" target="_blank" rel="noopener noreferrer">
          <div className="pc-kicker">Deep Learning · PyTorch · 2025</div>
          <div className="pc-title">TRANSFORMER FROM SCRATCH</div>
          <p className="pc-desc">Full encoder-decoder transformer in PyTorch from first principles — multi-head attention, positional encoding, layer norm, greedy decoding — trained on EN→ES translation using the Opus Books dataset. Every component manual, following &quot;Attention Is All You Need&quot;. Includes TensorBoard monitoring, label smoothing, and LR warmup.</p>
          <div className="pc-tags">
            <span className="p-tag">PyTorch</span>
            <span className="p-tag">Transformers</span>
            <span className="p-tag">Attention</span>
            <span className="p-tag">NLP</span>
          </div>
        </a>
      </div>
    </section>
  )
}
