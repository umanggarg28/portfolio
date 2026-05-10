'use client'

import { usePostHog } from '@posthog/next'

export default function Contact() {
  const posthog = usePostHog()
  const track = (target: 'email' | 'linkedin' | 'github' | 'resume') => () =>
    posthog?.capture('contact_link_clicked', { target })

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="contact-kicker appear">Available for senior software & AI engineering work</div>
          <div className="contact-headline appear">
            LET&apos;S<br /><em>build</em><br />TOGETHER
          </div>
          <p className="contact-sub appear appear-delay-1">
            If you&apos;re building production AI or full-stack systems and want someone who can take it from architecture to shipped product — reach out.
          </p>
        </div>
        <div className="contact-right appear appear-delay-2">
          <a href="mailto:umanggarg28@gmail.com" className="contact-link-row" onClick={track('email')}>
            <span className="contact-link-index">01</span>
            <span>Email me</span>
            <span className="contact-link-arrow contact-link-arrow--right" />
          </a>
          <a href="https://linkedin.com/in/umanggarg28" target="_blank" rel="noopener noreferrer" className="contact-link-row" onClick={track('linkedin')}>
            <span className="contact-link-index">02</span>
            <span>LinkedIn</span>
            <span className="contact-link-arrow contact-link-arrow--external" />
          </a>
          <a href="https://github.com/umanggarg28" target="_blank" rel="noopener noreferrer" className="contact-link-row" onClick={track('github')}>
            <span className="contact-link-index">03</span>
            <span>GitHub</span>
            <span className="contact-link-arrow contact-link-arrow--external" />
          </a>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-link-row" onClick={track('resume')}>
            <span className="contact-link-index">04</span>
            <span>Resume</span>
            <span className="contact-link-arrow contact-link-arrow--down" />
          </a>
        </div>
      </div>
    </section>
  )
}
