export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <div className="section-num appear">— 01</div>
        <h2 className="section-title appear appear-delay-1">ABOUT <em>me</em></h2>
      </div>
      <div className="about-body">
        <div className="about-left appear">
          <div className="about-statement">
            <span>I BUILD</span>
            <strong>AI SYSTEMS</strong>
            <em>that ship</em>
          </div>
          <p className="about-para">
            Software engineer with 8 years shipping production systems across healthcare AI, biotech, and enterprise. My work spans backend APIs, React frontends, LLM-integrated pipelines, and the cloud infrastructure underneath — taking complex systems end-to-end.
          </p>
          <p className="about-para">
            Most recently at <strong>PictorLabs.ai</strong> — a UCLA spinoff in digital pathology — fine-tuning Google&apos;s PathFoundation vision model, building LLM tooling with Claude API and LangGraph, and leading delivery of an AI virtual staining pipeline for whole slide images.
          </p>
          <p className="about-para">
            I&apos;m at my best where AI engineering meets real production engineering — training pipelines, retrieval systems, API design, and the infrastructure that holds it all up. Engineering fundamentals first, frameworks second.
          </p>
          <div className="about-signal-grid" aria-label="Career signals">
            <div className="about-signal">
              <span>BUILD</span>
              <p>Production systems end-to-end</p>
            </div>
            <div className="about-signal">
              <span>LEARN</span>
              <p>AI fundamentals from first principles</p>
            </div>
            <div className="about-signal">
              <span>SHIP</span>
              <p>Product, infra, and model pipelines</p>
            </div>
          </div>
        </div>
        <div className="about-right appear appear-delay-2">
          <div className="cert-section-title">Education</div>
          <div className="cert-row">
            <span className="cert-name">
              MS Software Engineering — Rochester Institute of Technology
              <span className="cert-location">New York, USA</span>
            </span>
            <span className="cert-badge">GPA 3.94</span>
          </div>
          <div className="cert-row">
            <span className="cert-name">
              B.Tech Mechanical Engineering — ITM University
              <span className="cert-location">Gurgaon, India</span>
            </span>
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
