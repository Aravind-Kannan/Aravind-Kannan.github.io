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
    id: "k8s-platform",
    title: "Internal Developer Platform",
    description: "A self-service platform built on top of Kubernetes, giving developers a Heroku-like experience.",
    longDescription: [
      "Built a complete internal developer platform from scratch.",
      "Integrates with existing CI/CD pipelines to provide seamless deployments."
    ],
    tags: ["Kubernetes", "Go", "React", "ArgoCD"],
    category: "Platform",
    github: "https://github.com",
    problem: "Developers were spending too much time figuring out Helm charts and infrastructure.",
    solution: "A unified CLI and Dashboard that abstracts Kubernetes configurations behind a simple service definition.",
    architecture: "React frontend, Go backend interacting with Kubernetes API, FluxCD for GitOps.",
  },
  {
    id: "infra-provisioning",
    title: "Terraform Automation Engine",
    description: "Automated infrastructure provisioning pipeline utilizing Terraform and GitHub Actions.",
    longDescription: [
      "Set up structured Terraform modules and automated via CI/CD for consistent environment creation."
    ],
    tags: ["Terraform", "AWS", "GitHub Actions", "Python"],
    category: "Infra",
    github: "https://github.com",
  },
  {
    id: "observability-stack",
    title: "Centralized Observability",
    description: "Prometheus, Grafana, and OpenTelemetry stack deployed globally across multiple clusters.",
    longDescription: [
      "Created a centralized monitoring platform handling millions of metrics per minute."
    ],
    tags: ["Prometheus", "Grafana", "OpenTelemetry", "DevOps"],
    category: "DevOps",
  },
];

export const projectCategories = ["All", "Platform", "Infra", "DevOps", "Cloud", "Personal"];
