const palettes = [
  {
    name: 'Current Lime',
    note: 'High-contrast, energetic, most AI-coded.',
    bg: '#030303',
    surface: '#050605',
    text: '#f0ede6',
    muted: 'rgba(240,237,230,0.56)',
    accent: '#b8ff57',
    accent2: '#8fd13d',
    border: 'rgba(240,237,230,0.18)',
  },
  {
    name: 'Hermes Teal',
    note: 'Calmer, more product/research lab, less neon.',
    bg: '#041c1c',
    surface: '#062525',
    text: '#ffe6cb',
    muted: 'rgba(255,230,203,0.62)',
    accent: '#ffbd38',
    accent2: '#ffff89',
    border: 'rgba(255,230,203,0.18)',
  },
  {
    name: 'Oxide Copper',
    note: 'Mature, technical, still organic.',
    bg: '#050807',
    surface: '#0a100d',
    text: '#ede7dc',
    muted: 'rgba(237,231,220,0.58)',
    accent: '#c9824a',
    accent2: '#6fa66a',
    border: 'rgba(237,231,220,0.16)',
  },
  {
    name: 'Infra Amber',
    note: 'Systems-y and premium without the Matrix read.',
    bg: '#050505',
    surface: '#10100d',
    text: '#f2e8d8',
    muted: 'rgba(242,232,216,0.58)',
    accent: '#ffb547',
    accent2: '#6f7b3a',
    border: 'rgba(242,232,216,0.16)',
  },
  {
    name: 'Cold Lab Blue',
    note: 'Precise, AI lab feel, slightly safer/common.',
    bg: '#030a0c',
    surface: '#071316',
    text: '#eae6dd',
    muted: 'rgba(234,230,221,0.58)',
    accent: '#64d8e8',
    accent2: '#6f8fa3',
    border: 'rgba(234,230,221,0.16)',
  },
  {
    name: 'Signal Red',
    note: 'Editorial and memorable, the riskiest option.',
    bg: '#060505',
    surface: '#110d0c',
    text: '#efe8dc',
    muted: 'rgba(239,232,220,0.58)',
    accent: '#ff5a3d',
    accent2: '#f5a24f',
    border: 'rgba(239,232,220,0.16)',
  },
]

export default function PaletteLabPage() {
  return (
    <main className="palette-lab">
      <header className="palette-lab-hero">
        <div>
          <p className="palette-lab-kicker">Palette Lab</p>
          <h1>Color systems for the portfolio</h1>
        </div>
        <p>
          Same content sample, different atmosphere. Look for readability, memorability,
          and whether the ASCII signal still feels professional.
        </p>
      </header>

      <section className="palette-grid">
        {palettes.map((palette) => (
          <article
            className="palette-card"
            key={palette.name}
            style={{
              '--p-bg': palette.bg,
              '--p-surface': palette.surface,
              '--p-text': palette.text,
              '--p-muted': palette.muted,
              '--p-accent': palette.accent,
              '--p-accent-2': palette.accent2,
              '--p-border': palette.border,
            } as React.CSSProperties}
          >
            <div className="palette-card-rain" aria-hidden="true">
              {'0\n{\n1\n>\n/\n+\n}\n0'}
            </div>
            <div className="palette-card-top">
              <span>INDEX / 04</span>
              <span>TECH STACK</span>
            </div>
            <h2>{palette.name}</h2>
            <p>{palette.note}</p>
            <div className="palette-sample-line" />
            <div className="palette-meta">
              <span>Role · Full Stack + AI</span>
              <span>Focus · LLMs · RAG · Agents</span>
            </div>
            <div className="palette-pill-row">
              <span>Python</span>
              <span>React</span>
              <span>AWS</span>
              <span>LangGraph</span>
            </div>
            <div className="palette-actions">
              <button type="button">View work</button>
              <a href="#top">Contact</a>
            </div>
            <div className="palette-swatches" aria-label={`${palette.name} swatches`}>
              <span style={{ background: palette.bg }} />
              <span style={{ background: palette.surface }} />
              <span style={{ background: palette.text }} />
              <span style={{ background: palette.accent }} />
              <span style={{ background: palette.accent2 }} />
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
