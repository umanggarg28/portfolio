'use client'

import { useState, type KeyboardEvent } from 'react'

interface ExpEntry {
  id: string
  idx: string
  role: string
  company: string
  location: string
  tags: string[]
  period: string
  bullets: string[]
  delayClass?: string
}

const experiences: ExpEntry[] = [
  {
    id: 'e1',
    idx: '01',
    role: 'AI & FULL STACK ENGINEER',
    company: 'PictorLabs.ai — AI Digital Pathology (UCLA Spinoff)',
    location: 'Remote · India',
    tags: ['Claude API', 'LangGraph', 'PyTorch', 'Kafka', 'React', 'Django', 'AWS ECS/EKS'],
    period: 'Jun 2025 — Feb 2026',
    bullets: [
      'LLM-powered internal tooling using Claude API and LangGraph — RAG over clinical documentation, multi-step agent workflows for automated reasoning by clinical and engineering teams.',
      "Fine-tuned Google's PathFoundation on histopathology images in PyTorch; built full training pipeline with OpenSlide patch extraction and Macenko stain normalization.",
      'Led delivery of ClearStain — AI virtual HE staining pipeline for unstained brightfield WSIs; owned Django API, Kafka orchestration, TorchServe model serving.',
      'Built adaptive chunked multipart upload (React Web Workers + S3) with concurrent worker pool, exponential backoff, and resumable support for multi-tenant SaaS.',
    ],
  },
  {
    id: 'e2',
    idx: '02',
    role: 'SOFTWARE ENGINEER 2',
    company: 'Medhaz Corp — Healthcare Workforce Platform',
    location: 'Charlotte, NC',
    tags: ['Django REST', 'React 18', 'Python'],
    period: 'May 2024 — Nov 2024',
    delayClass: 'appear-delay-1',
    bullets: [
      'Built candidate data management portal using Python/Django REST Framework and React.js, processing structured workforce data across organizations.',
      'Led React 15→18 migration, optimizing performance via Concurrent Rendering and React Suspense; ensured full backward compatibility.',
    ],
  },
  {
    id: 'e3',
    idx: '03',
    role: 'SOFTWARE ENGINEER 2',
    company: 'Asurion — Insurance Tech',
    location: 'Charlotte, NC',
    tags: ['Node.js', 'React', 'AWS Lambda', 'SQS', 'Micro-frontend'],
    period: 'Jun 2022 — Mar 2024',
    delayClass: 'appear-delay-2',
    bullets: [
      'Lead dev of the Entitlement Engine — insurance claim eligibility API serving <stat>40,000+ users weekly</stat> at 99% uptime via optimized Node.js architecture.',
      'Monolith→micro-frontend migration enabling independently deployable release cycles and faster iteration across teams.',
      'Serverless event-driven Python data pipelines using AWS Lambda, API Gateway, S3, SQS, and CloudWatch.',
    ],
  },
  {
    id: 'e4',
    idx: '04',
    role: 'REACT DEVELOPER',
    company: 'HYR Global Source — Client: The Kroger Co.',
    location: 'Charlotte, NC',
    tags: ['React ES6', 'Redux', 'Jest'],
    period: 'Oct 2021 — Jun 2022',
    delayClass: 'appear-delay-3',
    bullets: [
      'Cross-functional frontend architecture and reusable React components deployed across multiple Kroger entities in an enterprise agile environment.',
      'Built test suites with Jest and React Testing Library, increasing coverage by 50%.',
    ],
  },
  {
    id: 'e5',
    idx: '05',
    role: 'SOFTWARE DEVELOPER',
    company: 'GTR Event Technology',
    location: 'Charlotte, NC',
    tags: ['Node.js', 'MongoDB', 'OpenCV', 'GraphQL'],
    period: 'Mar 2019 — Jul 2021',
    delayClass: 'appear-delay-4',
    bullets: [
      'Built event registration and CEU platforms with automated CI/CD pipelines using React, Node.js, Express, MongoDB, and RESTful APIs.',
      'Computer vision-based automated image classification using Python and OpenCV — eliminated 50+ hours of manual work per event.',
    ],
  },
]

export default function Experience() {
  const [openId, setOpenId] = useState<string>('e1')

  const toggleExp = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id))
  }

  const handleExpKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleExp(id)
    }
  }

  return (
    <section id="experience">
      <div className="section-header">
        <div className="section-num appear">— 02</div>
        <h2 className="section-title appear appear-delay-1">WORK <em>history</em></h2>
      </div>

      {experiences.map((exp) => {
        const isOpen = openId === exp.id

        return (
          <div key={exp.id} className={`exp-item${isOpen ? ' open' : ''}`}>
            <div
              className={`exp-row appear${exp.delayClass ? ' ' + exp.delayClass : ''}`}
              onClick={() => toggleExp(exp.id)}
              onKeyDown={(event) => handleExpKeyDown(event, exp.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={exp.id}
            >
              <div className="exp-idx">{exp.idx}</div>
              <div className="exp-center">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company-row">
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-location exp-location--mobile">{exp.location}</span>
                </div>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span className="exp-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="exp-right">
                <div className="exp-period">{exp.period}</div>
                <div className="exp-location">{exp.location}</div>
              </div>
              <div className="exp-toggle" aria-hidden="true">
                <span />
                <span />
              </div>
            </div>
            <div className={`exp-detail${isOpen ? ' open' : ''}`} id={exp.id}>
              <div className="exp-detail-inner">
                {exp.bullets.map((bullet, i) => {
                  const html = bullet
                    .replace(/<stat>/g, '<span class="exp-stat">')
                    .replace(/<\/stat>/g, '</span>')
                  return (
                    <div className="exp-bullet" key={i} dangerouslySetInnerHTML={{ __html: html }} />
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
