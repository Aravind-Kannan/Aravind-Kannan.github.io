export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "career" | "learning" | "life" | "certification" | "project";
}

export const journey: Milestone[] = [
  {
    id: "m4",
    date: "2024 - Present",
    title: "Software Engineer",
    description: "Designing and building scalable developer platforms and Kubernetes infrastructure. Focused on automation, GitOps, and platform engineering.",
    category: "career",
  },
  {
    id: "m3",
    date: "2023",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Achieved the CKA certification, solidifying my knowledge in cluster administration and troubleshooting.",
    category: "certification",
  },
  {
    id: "m2",
    date: "2021 - 2024",
    title: "Software Engineer",
    description: "Developed microservices, migrated legacy applications to the cloud, and established CI/CD pipelines.",
    category: "career",
  },
  {
    id: "m1",
    date: "2020",
    title: "Graduated University",
    description: "B.S. in Computer Science. Discovered a passion for distributed systems and linux.",
    category: "life",
  }
];
