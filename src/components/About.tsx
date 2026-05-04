export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <div className="section-num appear">— 01</div>
        <h2 className="section-title appear appear-delay-1">ABOUT <em>me</em></h2>
      </div>
      <div className="about-body">
        <div className="about-left appear">
          <p className="about-para">
            Software engineer with experience delivering complex full-stack and AI systems. My work spans backend APIs, React frontends, LLM-integrated pipelines, and cloud infrastructure.
          </p>
          <p className="about-para">
            Most recently at <strong>PictorLabs.ai</strong> — a UCLA spinoff in digital pathology — fine-tuning Google&apos;s PathFoundation vision model, building LLM tooling with Claude API and LangGraph, and leading delivery of an AI virtual staining pipeline for whole slide images.
          </p>
        </div>
        <div className="about-right appear appear-delay-2">
          <div className="cert-section-title">Education</div>
          <div className="cert-row">
            <span className="cert-name">MS Software Engineering — Rochester Institute of Technology</span>
            <span className="cert-badge">GPA 3.94</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">B.Tech Mechanical Engineering — ITM University</span>
          </div>

          <div style={{ marginTop: '32px' }} className="cert-section-title">Certifications</div>

          <div className="cert-provider-title">Anthropic</div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Model Context Protocol: Advanced Topics</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Introduction to Model Context Protocol</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Claude Code in Action</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Claude with Amazon Bedrock</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Introduction to Agent Skills</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Introduction to Subagents</span>
          </div>

          <div className="cert-provider-title" style={{ marginTop: '20px' }}>DeepLearning.AI</div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Retrieval Augmented Generation</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">Agentic AI</span>
          </div>
          <div className="cert-row cert-row--slim">
            <span className="cert-name">PyTorch &amp; Deep Learning</span>
          </div>
        </div>
      </div>
    </section>
  )
}
