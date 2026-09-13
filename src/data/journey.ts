export type JourneyCategory = "career" | "education";

/** Fine-grained Education label; omitted on Career */
export type JourneyKind =
  | "Degree"
  | "Hackathon"
  | "Fellowship"
  | "Teaching"
  | "School";

export interface Milestone {
  id: string;
  date: string;
  /** Primary headline — role, degree, or event name */
  role: string;
  /** Secondary line — company, school, or org (optional) */
  org?: string;
  description: string;
  category: JourneyCategory;
  /** Education subtype only — drives tag + color */
  kind?: JourneyKind;
}

export const journeyCategories: Array<"All" | JourneyCategory> = [
  "All",
  "career",
  "education",
];

export const journey: Milestone[] = [
  {
    id: "zuora-se3",
    date: "Nov 2025 – Present",
    role: "Software Engineer III",
    org: "Zuora",
    description:
      "Owning Mediation infrastructure and platform work for consumption-based billing: multi-cluster Flink, self-service S3 connectivity, environment migrations onto shared Zuora infrastructure, and growing architecture and on-call ownership.",
    category: "career",
  },
  {
    id: "zuora-se2",
    date: "May 2024 – Nov 2025",
    role: "Software Engineer II",
    org: "Zuora",
    description:
      "Joined via the Togai acquisition. Led the Togai → Zuora infrastructure migration with near-zero downtime, and designed a Java Spring SPI to expose ClickHouse data to Zuora's central reporting service.",
    category: "career",
  },
  {
    id: "togai-se",
    date: "Jul 2023 – May 2024",
    role: "Software Engineer",
    org: "Togai",
    description:
      "Shifted from product/backend into infrastructure and developer tooling: Dockerized services, EKS migration with Terraform/Helm, built an Apps/Flows migrator, added Google/Microsoft OAuth, and supported large customers including Cirrus.",
    category: "career",
  },
  {
    id: "graduation",
    date: "May 2023",
    role: "B.E. Computer Science",
    org: "SSN College of Engineering",
    description:
      "Graduated with a B.E. in Computer Science and Engineering (CGPA 9.66) as department gold medalist. Thesis explored federated learning with blockchain for privacy-preserving credit risk assessment.",
    category: "education",
    kind: "Degree",
  },
  {
    id: "togai-intern",
    date: "Jan 2023 – Jun 2023",
    role: "Software Engineering Intern",
    org: "Togai",
    description:
      "Joined early-stage Togai on Marketplace and backend product work — Apps/Flows for Stripe, Razorpay, and Paystack, plus go-live support for the first customer.",
    category: "career",
  },
  {
    id: "pupilfirst-ta",
    date: "Sep 2022 – Jan 2023",
    role: "Teaching Assistant",
    org: "Pupilfirst (AICTE LITE)",
    description:
      "Invited back after the Global Digital Corps fellowship. Supported hundreds of students on WD101/WD201 — reviewing assignments and capstones, spotting gaps, and coaching Node.js/web skills.",
    category: "education",
    kind: "Teaching",
  },
  {
    id: "sih-2022",
    date: "2022",
    role: "Smart India Hackathon Winner",
    description:
      "Won Smart India Hackathon 2022 — a strong early signal of shipping under pressure with a team.",
    category: "education",
    kind: "Hackathon",
  },
  {
    id: "citi",
    date: "May 2022 – Jul 2022",
    role: "Summer Analyst",
    org: "Citi",
    description:
      "Built pieces of a Python + PySpark reporting/validation framework for monthly migration of ~1B KYC records from Oracle to EAP — cutting a multi-week ops process down to hours with automated stakeholder reports.",
    category: "career",
  },
  {
    id: "coronasafe",
    date: "Jan 2022 – Apr 2022",
    role: "Student Fellow",
    org: "Coronasafe / Global Digital Corps",
    description:
      "Selected among the top 40 from ~48,385 applicants. Hands-on JavaScript/Node.js fellowship; individual capstone was Arike, a palliative healthcare application.",
    category: "education",
    kind: "Fellowship",
  },
  {
    id: "caterpillar",
    date: "Aug 2021 – Oct 2022",
    role: "Software Engineering Consultant",
    org: "Caterpillar",
    description:
      "Built an Ionic Android/iOS PoC for on-device full-text search over technical docs with SQLite — aimed at construction-site engineers with limited connectivity. Received formal recognition for completion.",
    category: "career",
  },
  {
    id: "birla-school",
    date: "2007 – 2019",
    role: "Higher Secondary Education",
    org: "Birla Public School, Doha",
    description:
      "Completed schooling in Doha — Class X CGPA 10/10 and Class XII 474/500 — before moving to engineering studies in India.",
    category: "education",
    kind: "School",
  },
];
