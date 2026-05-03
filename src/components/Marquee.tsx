const items = [
  'LLM ENGINEERING',
  'RAG SYSTEMS',
  'AGENTIC WORKFLOWS',
  'FULL STACK',
  'REACT · DJANGO · FASTAPI',
  'AWS · KAFKA · DOCKER',
  'PYTORCH · COMPUTER VISION',
  'MCP · LANGCHAIN',
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
