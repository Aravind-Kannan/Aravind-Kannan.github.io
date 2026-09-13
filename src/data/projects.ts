export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  image?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
}

export const projects: Project[] = [
  {
    id: "empulse",
    title: "Empulse",
    description:
      "AI-powered engineering intelligence platform that unifies GitHub, Jira, Notion, and Slack into actionable insights on ownership, knowledge risk, and operational risk.",
    longDescription: [
      "Built for the Cognee Hackathon as an engineering intelligence platform.",
      "Unifies GitHub, Jira, Notion, and Slack into a tenant-scoped knowledge graph.",
      "Surfaces employee/organizational risk, knowledge concentration, architectural single points of failure, technical ownership, incident context, and exit/handover needs.",
      "Modules include Employee Risk Assessment, Knowledge Risk Assessment, Incident Investigation, Exit Handover, Engineering Manager Cockpit, integrations, org chart, and onboarding.",
    ],
    tags: ["Next.js", "FastAPI", "Cognee", "PostgreSQL", "Ollama", "Docker"],
    category: "AI",
    github: "https://github.com/Aravind-Kannan/empulse",
    problem:
      "Engineering orgs scatter ownership, incident context, and knowledge across GitHub, Jira, Notion, and Slack — making risk and handover hard to see.",
    solution:
      "A multi-tenant platform that maps identities across tools, syncs engineering data into a structured knowledge graph, and turns that context into risk, ownership, and incident insights.",
    architecture:
      "Next.js 15 + React 19 frontend; FastAPI + SQLAlchemy backend; PostgreSQL 16 with Cognee knowledge graph/vector layer (Neo4j / Kuzu / LanceDB); Ollama (llama3.2, nomic-embed-text); JWT and optional Google/GitHub OAuth; Docker deployment.",
  },
  {
    id: "zero-gravity",
    title: "ZeroGravity",
    description:
      "Real-time satellite tracking platform with an interactive 3D globe, distributed ingestion, caching, API services, and cloud-native deployment.",
    longDescription: [
      "Built for the WeMakeDevs × Zerops Hackathon.",
      "Tracks satellite positions, orbital paths, ground stations, telemetry, and astronaut information with search and filtering.",
      "Separates ingestion, cache, API, and frontend into independently deployable services.",
    ],
    tags: ["React", "Three.js", "Node.js", "Express", "Valkey", "Zerops"],
    category: "Distributed",
    github: "https://github.com/Aravind-Kannan/zero-gravity",
    problem:
      "Live satellite and crew data arrives from external APIs and needs fast, reliable presentation without hammering upstream sources on every request.",
    solution:
      "A service-separated architecture: an ingestor polls and normalizes external data into Valkey, an Express API reads the cache and runs orbital propagation, and a React/Three.js frontend renders an interactive 3D globe.",
    architecture:
      "CelesTrak / Open Notify → Node.js ingestion (~30s poll) → Valkey 7.2 cache (~300s TTLs) → Express API → Vite + React + react-globe.gl / Three.js frontend. Each service has independent Zerops configuration.",
  },
  {
    id: "fl-blockchain",
    title: "Federated Learning + Blockchain",
    description:
      "Undergraduate research on privacy-preserving credit risk assessment — institutions collaboratively train models without centralizing raw customer data.",
    longDescription: [
      "An integration of federated learning with blockchain for credit risk assessment.",
      "Explores collaborative model training across institutions while keeping raw customer data local.",
      "Uses Flower/FedAvg for federated training and Ethereum smart contracts plus IPFS hashes for model integrity metadata.",
      "Evaluated against centralized training on Lending Club and credit-limit datasets.",
    ],
    tags: ["Flower", "FedAvg", "Ethereum", "IPFS", "Ganache", "Python"],
    category: "Research",
    github: "https://github.com/Aravind-Kannan/credit-risk-assessment-fl-blockchain",
    problem:
      "Financial institutions want stronger credit models but cannot freely centralize sensitive customer data.",
    solution:
      "Federated training across bank/nodes with blockchain-backed model hash verification so collaborators share learning signals without sharing raw records.",
    architecture:
      "Flower + FedAvg for federated training; Ganache/Remix/Ethereum (Sepolia) smart contracts (Model, HashStorageLocal/Global, FederatedLearning); H5 models with IPFS hashes for integrity tracking.",
  },
];

export const projectCategories = ["All", "AI", "Distributed", "Research"];
