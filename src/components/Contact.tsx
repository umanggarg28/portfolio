export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="contact-headline appear">
            LET&apos;S<br /><em>build</em><br />TOGETHER
          </div>
          <p className="contact-sub appear appear-delay-1">
            If you&apos;re building production AI systems and want someone who can go from model training to shipped product — reach out.
          </p>
        </div>
        <div className="contact-right appear appear-delay-2">
          <a href="mailto:umanggarg28@gmail.com" className="contact-link-row">
            <span>Email me</span>
            <span className="contact-link-arrow">→</span>
          </a>
          <a href="https://linkedin.com/in/umanggarg28" target="_blank" rel="noopener noreferrer" className="contact-link-row">
            <span>LinkedIn</span>
            <span className="contact-link-arrow">↗</span>
          </a>
          <a href="https://github.com/umanggarg28" target="_blank" rel="noopener noreferrer" className="contact-link-row">
            <span>GitHub</span>
            <span className="contact-link-arrow">↗</span>
          </a>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-link-row">
            <span>Resume</span>
            <span className="contact-link-arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
