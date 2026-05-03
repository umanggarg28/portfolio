export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <div className="section-num appear">— 01</div>
        <h2 className="section-title appear appear-delay-1">ABOUT <em>me</em></h2>
      </div>
      <div className="about-body">
        <div className="about-left appear">
          <div className="about-big-text">
            I BUILD SYSTEMS<br />
            THAT <em>think</em><br />
            AND SCALE
          </div>
          <p className="about-para">
            Software engineer with <strong>8+ years</strong> of experience delivering complex full-stack and AI systems. My work spans backend APIs, React frontends, LLM-integrated pipelines, and cloud infrastructure.
          </p>
          <p className="about-para">
            Most recently at <strong>PictorLabs.ai</strong> — a UCLA spinoff in digital pathology — I led AI/LLM tooling using Claude API and LangGraph, fine-tuned Google&apos;s PathFoundation vision model, and led delivery of a virtual staining pipeline for whole slide images.
          </p>
          <p className="about-para">
            Currently deep in <strong>agentic systems, MCP, and retrieval-augmented generation</strong>. I believe the next decade belongs to engineers who can think across the full stack from GPU kernels to product interfaces.
          </p>
        </div>
        <div className="about-right appear appear-delay-2">
          <div className="cert-section-title">Education</div>
          <div className="cert-row">
            <span className="cert-name">MS Software Engineering — Rochester Institute of Technology</span>
            <span className="cert-badge">GPA 3.94</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">B.Tech Mechanical Eng — ITM University</span>
            <span className="cert-badge">B.Tech</span>
          </div>
          <div style={{ marginTop: '32px' }} className="cert-section-title">Anthropic Certified — 2026</div>
          <div className="cert-row">
            <span className="cert-name">MCP Advanced Topics</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Introduction to MCP</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Claude Code in Action</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Claude with Amazon Bedrock</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Introduction to Agent Skills</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Introduction to Subagents</span>
            <span className="cert-badge">Anthropic</span>
          </div>
          <div style={{ marginTop: '32px' }} className="cert-section-title">DeepLearning.AI</div>
          <div className="cert-row">
            <span className="cert-name">Retrieval Augmented Generation</span>
            <span className="cert-badge">DLAI</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">Agentic AI</span>
            <span className="cert-badge">DLAI</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">PyTorch &amp; Deep Learning</span>
            <span className="cert-badge">DLAI</span>
          </div>
        </div>
      </div>
    </section>
  )
}
