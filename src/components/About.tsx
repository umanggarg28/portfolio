import { aboutCopy, certifications, education } from '@/content/portfolio'
import SignalArtifacts from './SignalArtifacts'

export default function About() {
  return (
    <section id="about">
      <SignalArtifacts variant="about" />
      <div className="section-header">
        <div className="section-num appear">INDEX <span className="section-num-sep">/</span> 01</div>
        <h2 className="section-title appear appear-delay-1">ABOUT <em>me</em></h2>
      </div>
      <div className="about-body">
        <div className="about-left appear">
          <div className="about-statement">
            <span>I BUILD</span>
            <strong>AI SYSTEMS</strong>
            <em>that ship</em>
          </div>
          {aboutCopy.paragraphs.map((paragraph) => (
            <p className="about-para" key={paragraph}>{paragraph}</p>
          ))}
          <div className="about-signal-grid" aria-label="Career signals">
            {aboutCopy.signals.map((signal) => (
              <div className="about-signal" key={signal.label}>
                <span>{signal.label}</span>
                <p>{signal.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="about-right appear appear-delay-2">
          <div className="cert-section-title">Education</div>
          {education.map((item) => (
            <div className="cert-row cert-row--education" key={`${item.degree}-${item.school}`}>
              <span className="cert-name">
                {item.degree} — {item.school}
                <span className="cert-location">{item.location}</span>
              </span>
              {item.badge ? <span className="cert-badge">{item.badge}</span> : null}
            </div>
          ))}

          <div style={{ marginTop: '32px' }} className="cert-section-title">Certifications</div>

          {certifications.map((group, groupIndex) => (
            <div className="cert-group" key={group.provider}>
              <div className="cert-provider-title" style={groupIndex > 0 ? { marginTop: '20px' } : undefined}>
                {group.provider}
              </div>
              {group.items.map((cert) => (
                <a
                  className="cert-row cert-row--slim cert-row--link"
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`${group.provider}-${cert.name}`}
                >
                  <span className="cert-name">{cert.name}</span>
                  <span className="cert-proof contact-link-arrow contact-link-arrow--external" aria-hidden="true" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
