const items = [
  'LLM ENGINEERING',
  'RAG · HYBRID SEARCH · RERANKING',
  'AGENTIC WORKFLOWS · MULTI-AGENT',
  'CREWAI · LANGGRAPH · OPENAI AGENTS SDK',
  'MCP · LANGCHAIN · AUTOGEN',
  'LLMOPS · EVALS · LANGFUSE',
  'PYTORCH · COMPUTER VISION · FINE-TUNING',
  'LORA · QLORA · PEFT',
  'FULL STACK',
  'REACT · DJANGO · FASTAPI',
  'AWS · KAFKA · DOCKER',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
