export interface EducationItem {
  degree: string
  school: string
  location: string
  badge?: string
}

export interface CertificationItem {
  name: string
  url: string
}

export interface CertificationGroup {
  provider: string
  items: CertificationItem[]
}

export interface ExperienceItem {
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

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectItem {
  idx: string
  kicker: string
  title: string
  description: string
  tags: string[]
  href?: string
  note?: string
}

export const aboutCopy = {
  paragraphs: [
    'Software engineer with 8 years shipping production systems across healthcare AI, biotech, and enterprise. My work spans backend APIs, React frontends, LLM-integrated pipelines, and the cloud infrastructure underneath — taking complex systems end-to-end.',
    "Most recently at PictorLabs.ai — a UCLA spinoff in digital pathology — fine-tuning Google's PathFoundation vision model for automated stain-type detection, building LLM tooling with Claude API and LangGraph, and leading delivery of ClearStain, an AI virtual H&E staining pipeline for whole slide images.",
    "I'm at my best where AI engineering meets real production engineering — training pipelines, retrieval systems, API design, and the infrastructure that holds it all up. Engineering fundamentals first, frameworks second.",
  ],
  signals: [
    { label: 'BUILD', text: 'Production systems end-to-end' },
    { label: 'LEARN', text: 'AI fundamentals from first principles' },
    { label: 'SHIP', text: 'Product, infra, and model pipelines' },
  ],
}

export const education: EducationItem[] = [
  {
    degree: 'MS Software Engineering',
    school: 'Rochester Institute of Technology',
    location: 'New York, USA',
    badge: 'GPA 3.94',
  },
  {
    degree: 'B.Tech Mechanical Engineering',
    school: 'ITM University',
    location: 'Gurgaon, India',
  },
]

export const certifications: CertificationGroup[] = [
  {
    provider: 'Anthropic',
    items: [
      {
        name: 'Model Context Protocol: Advanced Topics',
        url: 'https://verify.skilljar.com/c/igx2jsq7tiqg',
      },
      {
        name: 'Introduction to Model Context Protocol',
        url: 'https://verify.skilljar.com/c/4zz76jtmt39e',
      },
      {
        name: 'Claude Code in Action',
        url: 'https://verify.skilljar.com/c/m88oi85kopvt',
      },
      {
        name: 'Claude with Amazon Bedrock',
        url: 'https://verify.skilljar.com/c/keg2nrthk7ah',
      },
      {
        name: 'Introduction to Agent Skills',
        url: 'https://verify.skilljar.com/c/5qjt57mzuyvx',
      },
      {
        name: 'Introduction to Subagents',
        url: 'https://verify.skilljar.com/c/95t69p7y4mqy',
      },
    ],
  },
  {
    provider: 'DeepLearning.AI',
    items: [
      {
        name: 'Retrieval Augmented Generation',
        url: 'https://learn.deeplearning.ai/certificates/e3b39deb-dbc2-4b84-bc82-d512b18ff9a8',
      },
      {
        name: 'Agentic AI',
        url: 'https://learn.deeplearning.ai/certificates/83de0338-d6cc-4d3a-96cc-0d75b572be0e',
      },
      {
        name: 'PyTorch & Deep Learning',
        url: 'https://learn.deeplearning.ai/certificates/8f16637d-e2ca-459d-85b0-6adeb8f9a036',
      },
    ],
  },
]

export const experiences: ExperienceItem[] = [
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
      'Led delivery of ClearStain — AI virtual H&E staining pipeline for unstained brightfield WSIs, a major new undertaking integrated end-to-end into the existing VSH (Virtual Slide Hub) system. Owned Django API routing (organ / species / diagnosis-based predictor selection), Kafka job orchestration, and TorchServe model-serving integration.',
      "Within ClearStain, fine-tuned Google's PathFoundation vision model in PyTorch for automated stain-type detection (validation pipeline) — built full training pipeline including OpenSlide WSI patch extraction, tissue masking, and Macenko stain normalization.",
      'Built adaptive chunked multipart upload (React Web Workers + S3) with concurrent worker pool, exponential backoff, and resumable support for multi-tenant SaaS.',
    ],
  },
  {
    id: 'e2',
    idx: '02',
    role: 'SOFTWARE ENGINEER 2',
    company: 'Medhaz Corp — Workforce Platform',
    location: 'Charlotte, NC',
    tags: ['Django REST', 'React 18', 'Python'],
    period: 'May 2024 — Nov 2024',
    delayClass: 'appear-delay-1',
    bullets: [
      'Built candidate data management portal using Python/Django REST Framework and React.js, processing structured workforce data across organizations.',
      'Led React 15→18 migration, optimizing performance via Concurrent Rendering and React Suspense.',
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
      'Designed and maintained serverless event-driven Python data pipelines on AWS Lambda + API Gateway + S3 + SQS + CloudWatch — automated downstream workflows at scale.',
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
      'Built cross-functional frontend architecture and reusable React components deployed across multiple Kroger entities in an enterprise agile environment.',
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
      'Built a computer-vision system in Python + OpenCV for booth-layout detection from event floor plans — eliminated 50+ hours of manual work per event.',
    ],
  },
]

export const featuredProject = {
  kicker: 'Featured Project · 2025–2026',
  title: 'CARTOGRAPHER',
  description:
    "Codebase reasoning engine that turns any GitHub repository into an interactive, navigable knowledge surface — natural-language Q&A with source citations, on-demand Mermaid diagrams (architecture / class hierarchy / call graph), and three-phase agent-generated concept tours. Every stage of the AI pipeline is visible to the user in real time. Underneath: a production ReAct agent with 12 MCP tools, working memory, and parallel async tool execution, sitting on a hand-rolled retrieval pipeline (tree-sitter AST chunking, contextual LLM descriptions per Anthropic's pattern, Qdrant hybrid search with RRF, Cohere reranking, HyDE + query expansion). Every layer built from scratch — no LangChain, no LlamaIndex.",
  tags: ['FastAPI', 'React/Vite', 'Qdrant Cloud', 'tree-sitter', 'FastMCP', 'Voyage', 'Cohere', 'Docker'],
  links: [
    { label: 'Live Demo', href: 'https://cartographer-app.vercel.app' },
    { label: 'GitHub', href: 'https://github.com/umanggarg28/Cartographer' },
  ],
}

export const projects: ProjectItem[] = [
  {
    idx: '02',
    kicker: 'AI · Computer Vision · Production · 2025',
    title: 'CLEARSTAIN PIPELINE',
    description:
      "AI virtual H&E staining pipeline for unstained brightfield whole slide images at PictorLabs.ai (UCLA spinoff, venture-backed). Led delivery of a major new undertaking — integrated a new staining model end-to-end into the existing VSH (Virtual Slide Hub) system. Fine-tuned Google's PathFoundation vision model in PyTorch for automated stain-type detection feeding the validation pipeline. Owned Django API routing (organ / species / diagnosis-based predictor selection), Kafka job orchestration, and TorchServe model-serving integration.",
    tags: ['PyTorch', 'Django', 'Kafka', 'TorchServe', 'OpenSlide', 'AWS ECS'],
    note: 'Closed-source · proprietary',
  },
  {
    idx: '03',
    kicker: 'RAG · Full Stack · 2025',
    title: 'RAG RESEARCH COPILOT',
    description:
      'RAG system for querying research papers — grounding answers in document content with full source citations. Custom semantic search (MiniLM embeddings + ChromaDB), BM25 keyword search, and hybrid retrieval via RRF fusion. No LangChain. Precursor to Cartographer — built to understand retrieval internals from first principles.',
    tags: ['FastAPI', 'React', 'BM25', 'ChromaDB', 'Hybrid Search'],
    href: 'https://github.com/umanggarg28/rag-research-copilot',
  },
  {
    idx: '04',
    kicker: 'Deep Learning · PyTorch · 2025',
    title: 'TRANSFORMER FROM SCRATCH',
    description:
      'Full encoder-decoder transformer implemented in PyTorch — multi-head attention, positional encoding, layer norm, greedy decoding, label smoothing, LR warmup. Trained EN→ES on the Opus Books dataset, end-to-end from "Attention Is All You Need".',
    tags: ['PyTorch', 'Attention', 'Transformers', 'NLP'],
    href: 'https://github.com/umanggarg28/transformer-from-scratch',
  },
  {
    idx: '05',
    kicker: 'Reinforcement Learning · 2025',
    title: 'RL EXPERIMENTS',
    description:
      'Q-learning, DQN (Breakout), and PPO (LunarLander) trained on Gymnasium with Stable Baselines 3 — plus a custom multi-agent dual-taxi environment built from scratch (observation space, reward shaping, training loop). Domain breadth: not just LLMs.',
    tags: ['PyTorch', 'Gymnasium', 'SB3', 'DQN · PPO'],
    href: 'https://github.com/umanggarg28/reinforcement-learning',
  },
]
