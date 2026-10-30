import type { SkillCategoryId } from "./types"

export type ProjectId =
  | "hajj-auth"
  | "ecommerce"
  | "marsad"
  | "imtiaz"
  | "flutter-store"
  | "courses-certs"
  | "swiftmemory"
  | "todo-laravel"
  | "reef"
  | "coffee-machine"

export type ProjectIcon = "nfc" | "bag" | "radar" | "stethoscope" | "phone" | "award" | "hourglass" | "checks" | "fish" | "coffee"

/**
 * How a featured project is pictured:
 * - "hajj": a coded illustration (no public screens exist)
 * - "browser": real screenshots in tilted browser windows (`shotUrls` label the address bars)
 */
export type ProjectVisual = "hajj" | "browser"

export type ProjectMeta = {
  id: ProjectId
  featured?: boolean
  visual?: ProjectVisual
  /** Screenshot paths under /public; their alt text lives in each dictionary's `shots`. */
  shots?: string[]
  shotUrls?: string[]
  ghost?: string
  icon: ProjectIcon
  year: string
  repo?: string
  demo?: string
  stack: string[]
  accent: [string, string]
}

const gh = (repo: string) => `https://github.com/Abdull3hSendy/${repo}`

export const projects: ProjectMeta[] = [
  {
    id: "marsad",
    featured: true,
    visual: "browser",
    shots: [
      "/projects/marsad/dashboard.jpg",
      "/projects/marsad/reports.jpg",
      "/projects/marsad/portal.jpg",
      "/projects/marsad/policy-compliance.jpg",
      "/projects/marsad/digital-transformation.jpg",
      "/projects/marsad/domains.jpg",
      "/projects/marsad/tasks.jpg",
    ],
    shotUrls: [
      "marsad / dashboard",
      "marsad / reports",
      "marsad / portal",
      "marsad / policy-compliance",
      "marsad / dt / dashboard",
      "marsad / domains",
      "marsad / tasks",
    ],
    ghost: "MARSAD",
    icon: "radar",
    year: "2026",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "Prisma",
      "SQL Server",
      "S3 Storage",
      "ADFS · SSO",
      "LLM",
      "IIS",
      "Docker",
    ],
    accent: ["#b8925a", "#2596be"],
  },
  {
    id: "imtiaz",
    featured: true,
    visual: "browser",
    shots: [
      "/projects/imtiaz/home.jpg",
      "/projects/imtiaz/cases.jpg",
      "/projects/imtiaz/dashboard.jpg",
      "/projects/imtiaz/question-banks.jpg",
      "/projects/imtiaz/flash-cards.jpg",
      "/projects/imtiaz/team.jpg",
    ],
    shotUrls: ["imtiaz.app", "imtiaz.app/#features", "imtiaz.app/#features", "imtiaz.app/#features", "imtiaz.app/#features", "imtiaz.app"],
    ghost: "IMTIAZ",
    icon: "stethoscope",
    year: "2026",
    demo: "https://imtiaz.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Sentry"],
    accent: ["#7c3aed", "#22d3ee"],
  },
  {
    id: "ecommerce",
    featured: true,
    visual: "browser",
    shots: ["/projects/ecommerce/catalog.jpg", "/projects/ecommerce/product.jpg", "/projects/ecommerce/featured.jpg"],
    shotUrls: ["ecommerce-project.replit.app/Product", "/Product/Details/1", "ecommerce-project.replit.app"],
    ghost: "SHOP",
    icon: "bag",
    year: "2025",
    repo: gh("EcommerceProject"),
    demo: "https://ecommerce-project.replit.app/",
    stack: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "ASP.NET Identity", "Bootstrap", "Flutter", "Firebase"],
    accent: ["#8e9a6c", "#2596be"],
  },
  {
    id: "hajj-auth",
    featured: true,
    visual: "hajj",
    ghost: "NFC",
    icon: "nfc",
    year: "2025",
    stack: ["Python", "Raspberry Pi", "Linux", "NFC"],
    accent: ["#2596be", "#7fc8de"],
  },
  {
    id: "flutter-store",
    icon: "phone",
    year: "2025",
    repo: gh("bootcamb_1"),
    stack: ["Flutter", "Dart", "REST API", "http"],
    accent: ["#2596be", "#7fc8de"],
  },
  {
    id: "courses-certs",
    icon: "award",
    year: "2024",
    repo: gh("Courses-and-Certificates-System"),
    stack: ["Laravel", "PHP", "MySQL", "Blade", "TCPDF", "Bootstrap"],
    accent: ["#8e9a6c", "#cdbb8a"],
  },
  {
    id: "swiftmemory",
    icon: "hourglass",
    year: "2024",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    accent: ["#9aa67c", "#2596be"],
  },
  {
    id: "todo-laravel",
    icon: "checks",
    year: "2024",
    repo: gh("To-Do-List-web-Laravel"),
    stack: ["Laravel", "PHP", "Eloquent", "Blade"],
    accent: ["#8e9a6c", "#cdbb8a"],
  },
  {
    id: "reef",
    icon: "fish",
    year: "2025",
    repo: gh("Reef-website"),
    stack: ["HTML", "CSS", "Bootstrap"],
    accent: ["#2596be", "#7fc8de"],
  },
  {
    id: "coffee-machine",
    icon: "coffee",
    year: "2023",
    repo: gh("Coffee-Machine-"),
    stack: ["Java", "Maven", "OOP"],
    accent: ["#cdbb8a", "#8e9a6c"],
  },
]

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<ProjectId, ProjectMeta>

// Where each skill family was actually applied — drives the "Applied in" links in the Skills section.
export const skillProjects: Record<SkillCategoryId, ProjectId[]> = {
  languages: ["marsad", "ecommerce", "hajj-auth", "flutter-store", "courses-certs", "coffee-machine"],
  backend: ["marsad", "ecommerce", "courses-certs", "swiftmemory", "todo-laravel"],
  frontend: ["marsad", "imtiaz", "ecommerce", "reef", "courses-certs"],
  mobile: ["flutter-store", "ecommerce"],
  data: ["marsad", "ecommerce", "courses-certs", "swiftmemory"],
  governance: ["marsad"],
  security: ["marsad", "ecommerce"],
  systems: ["hajj-auth"],
  tools: ["marsad", "ecommerce"],
  ai: ["marsad"],
  practice: ["marsad", "ecommerce", "flutter-store"],
}
