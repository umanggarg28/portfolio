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
    "Most recently at PictorLabs.ai — a UCLA spinoff in digital pathology — fine-tuning Google's PathFoundation vision model, building LLM tooling with Claude API and LangGraph, and leading delivery of an AI virtual staining pipeline for whole slide images.",
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
        url: 'https://verify.skilljar.com/c/95t69p7y4mqy',
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
      "Fine-tuned Google's PathFoundation on histopathology images in PyTorch; built full training pipeline with OpenSlide patch extraction and Macenko stain normalization.",
      'Led delivery of ClearStain — AI virtual HE staining pipeline for unstained brightfield WSIs; owned Django API, Kafka orchestration, TorchServe model serving.',
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

export const featuredProject = {
  kicker: 'Featured Project · 2025',
  title: 'CARTOGRAPHER',
  description:
    'Codebase reasoning engine that indexes any GitHub repo and answers natural-language questions with source citations and line numbers. Every retrieval layer hand-built — no LangChain, no LlamaIndex. tree-sitter AST chunking, contextual LLM descriptions (35–49% retrieval improvement per Anthropic benchmarks), Qdrant hybrid search (dense + BM25 + RRF), Cohere cross-encoder reranking, HyDE + query expansion, and a full ReAct agent via MCP with 10 tools, working memory, and parallel async execution.',
  tags: ['FastAPI', 'React/Vite', 'Qdrant Cloud', 'tree-sitter', 'FastMCP', 'Cohere', 'Docker'],
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
      "AI virtual HE staining pipeline for unstained brightfield whole slide images, built at PictorLabs.ai (UCLA spinoff, venture-backed). Owned end-to-end: fine-tuned Google's PathFoundation vision model in PyTorch, built Django API with organ/species/diagnosis-based predictor routing, Kafka job orchestration, and TorchServe model serving.",
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
