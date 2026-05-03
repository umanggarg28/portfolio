export default function Learning() {
  return (
    <section id="learning">
      <div className="section-header">
        <div className="section-num appear">— 04</div>
        <h2 className="section-title appear appear-delay-1">GOING <em>deep</em></h2>
      </div>
      <div className="learning-body">
        <div className="learning-left appear">
          <div>
            <div className="about-big-text" style={{ marginBottom: '24px' }}>
              FIRST-<em>principles</em><br />ML
            </div>
            <p className="learning-intro">
              Beyond using AI tools — I&apos;m studying the <strong>mathematical and engineering foundations</strong> that make them work. Following Andrej Karpathy&apos;s lecture series to build neural networks, transformers, and language models entirely from scratch in PyTorch.
            </p>
            <p className="learning-intro">
              Also exploring <strong>reinforcement learning</strong> (Q-learning, DQN, PPO), <strong>multi-agent orchestration</strong> with CrewAI, and going deeper into agentic system design with MCP.
            </p>
          </div>
        </div>
        <div className="learning-right appear appear-delay-2">
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">BUILD NANOGPT</div>
              <div className="learn-desc">GPT-2 from scratch in PyTorch — Karpathy&apos;s &quot;Let&apos;s build GPT&quot; series</div>
            </div>
            <span className="learn-badge active">Active</span>
          </div>
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">MICROGRAD</div>
              <div className="learn-desc">Tiny autograd engine from scratch — backpropagation &amp; neural net basics</div>
            </div>
            <span className="learn-badge">Done</span>
          </div>
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">MAKEMORE SERIES</div>
              <div className="learn-desc">Character-level LMs: bigram → MLP → BatchNorm — Bengio 2003</div>
            </div>
            <span className="learn-badge">Done</span>
          </div>
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">TRANSFORMER FROM SCRATCH</div>
              <div className="learn-desc">Full encoder-decoder in PyTorch — Attention Is All You Need</div>
            </div>
            <span className="learn-badge">Done</span>
          </div>
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">REINFORCEMENT LEARNING</div>
              <div className="learn-desc">Q-learning, DQN (Breakout), PPO (Lunar Lander) with Gymnasium</div>
            </div>
            <span className="learn-badge">Done</span>
          </div>
          <div className="learn-item">
            <div className="learn-left-col">
              <div className="learn-name">CREWAI MULTI-AGENT</div>
              <div className="learn-desc">Researcher + writer agent collaboration — multi-agent orchestration</div>
            </div>
            <span className="learn-badge">Done</span>
          </div>
        </div>
      </div>
    </section>
  )
}
