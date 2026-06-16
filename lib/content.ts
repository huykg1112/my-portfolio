/**
 * Typed mock content layer.
 * Swap these exports for CMS/DB calls later — the UI only depends on the types.
 */

export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  tags: string[]
  year: string
  role?: string
  company?: string
  links: { demo?: string; repo?: string }
  featured: boolean
}

export type Experience = {
  company: string
  role: string
  period: string
  description: string
  tech: string[]
  link?: string
}

export type Skill = { name: string; icon: string }
export type SkillGroup = { category: string; items: Skill[] }

const CDN = "https://res.cloudinary.com/dq8qq2zed/image/upload"

export const projects: Project[] = [
  {
    slug: "devosecare-dashboard",
    title: "DevoseCare Dashboard",
    subtitle: "TekNix · Internal product",
    description:
      "Internal operations dashboard for a medical center: Kanban appointment board with drag-and-drop, customer management, a CMS module and role-based permissions. Shipped in under four weeks.",
    tech: ["ReactJS", "Vite", "Tailwind CSS", "Shadcn UI", "Zustand", "dnd-kit"],
    tags: ["Dashboard", "Drag & drop"],
    year: "2026",
    role: "Frontend Developer",
    company: "TekNix Technology",
    links: { demo: "https://devoscare-dashboard.blocktrend.xyz" },
    featured: true,
  },
  {
    slug: "ecommerce-farm",
    title: "E-commerce Farm Platform",
    subtitle: "Bachelor's thesis",
    description:
      "AI-powered agricultural e-commerce platform with crop-disease diagnosis (PhoBERT fine-tune, ~97% accuracy across 350+ diseases). Web with Next.js, mobile with Flutter, backend on NestJS + PostgreSQL.",
    tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Flutter"],
    tags: ["AI", "E-commerce", "Full-stack"],
    year: "2025",
    role: "Full-stack Developer",
    company: "Can Tho University",
    links: { repo: "https://github.com/huykg1112/project-ecommerce-farm" },
    featured: true,
  },
  {
    slug: "autotms",
    title: "AutoTMS — Transport Management",
    subtitle: "Green Space Solution",
    description:
      "Web-based transport management system: group, vehicle and maintenance modules. Built the frontend and integrated GraphQL services on a NestJS + Strapi backend.",
    tech: ["Next.js", "Hero UI", "NestJS", "Strapi", "Prisma", "GraphQL"],
    tags: ["Enterprise", "Full-stack"],
    year: "2025",
    role: "Full-stack Intern",
    company: "Green Space Solution",
    links: {},
    featured: true,
  },
  {
    slug: "pago-dashboard",
    title: "Pago Dashboard",
    subtitle: "UTA · Internal product",
    description:
      "Internal management dashboard with an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Optimised UI/UX and integrated RESTful APIs.",
    tech: ["ReactJS", "NestJS", "REST API", "Tailwind CSS", "PhoBERT"],
    tags: ["AI", "Dashboard"],
    year: "2024",
    role: "IT Intern",
    company: "UTA Co., Ltd",
    links: {},
    featured: false,
  },
  {
    slug: "patient-honey",
    title: "Patient Honey — Clinic Websites",
    subtitle: "TekNix · 60+ sites",
    description:
      "Maintained and built 60+ international dental-clinic websites: landing pages, performance and SEO optimisation, and CMS-driven content management.",
    tech: ["Next.js", "WordPress", "TanaCMS", "Framer", "SEO"],
    tags: ["Web", "SEO"],
    year: "2025",
    role: "Frontend Intern",
    company: "TekNix Technology",
    links: {},
    featured: false,
  },
  {
    slug: "homestay-booking",
    title: "Homestay Booking",
    subtitle: "Group project",
    description:
      "Full-stack homestay booking platform with search, filtering, booking flows and real-time updates for three roles: client, landlord and admin.",
    tech: ["ReactJS", "Tailwind CSS", "MUI", "REST API", "PostgreSQL"],
    tags: ["Booking", "Full-stack"],
    year: "2024",
    role: "Frontend Developer",
    company: "Group project",
    links: { repo: "https://github.com/tainn03/Homestay-Booking-Client" },
    featured: false,
  },
]

export const experiences: Experience[] = [
  {
    company: "TekNix Technology Corporation",
    role: "Frontend Intern",
    period: "Sep 2025 — Present",
    description:
      "Building and maintaining responsive websites for ~60 international dental clinics with React, Next.js and WordPress. Integrating REST APIs and crafting interactive UI with Framer.",
    tech: ["ReactJS", "Next.js", "WordPress", "Tailwind CSS", "Framer", "SEO"],
    link: "https://www.teknix.vn/",
  },
  {
    company: "Green Space Solution JSC",
    role: "Full-stack Intern",
    period: "Jun 2025 — Aug 2025",
    description:
      "Designed and optimised the AutoTMS transport-management frontend. Integrated components with NestJS, Strapi, Prisma and GraphQL services; took part in code reviews.",
    tech: ["Next.js", "Hero UI", "NestJS", "Strapi", "Prisma", "GraphQL"],
    link: "https://www.autotms.vn/",
  },
  {
    company: "UTA Co., Ltd",
    role: "IT Intern",
    period: "Jun 2024 — Apr 2025",
    description:
      "Built frontends for internal web apps and an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Improved UI performance and cross-device responsiveness.",
    tech: ["ReactJS", "NestJS", "REST API", "PhoBERT", "Tailwind CSS"],
    link: "https://utasolution.com",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "ReactJS", icon: `${CDN}/v1762912715/React-icon_aotcdf.png` },
      { name: "Next.js", icon: `${CDN}/v1762912714/nextjs_icon_myecuu.png` },
      { name: "TypeScript", icon: `${CDN}/v1762912715/Typescript_icon_mirpqm.png` },
      { name: "Tailwind CSS", icon: `${CDN}/v1762914096/tailwind_icon_dunczr.svg` },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "NestJS", icon: `${CDN}/v1762913912/NestJS_icon_awrwgu.png` },
      { name: "PostgreSQL", icon: `${CDN}/v1762912715/Postgresql_icon_drdedp.png` },
      { name: "GraphQL", icon: `${CDN}/v1762912715/GraphQL_icon_sntg2p.png` },
      { name: "REST APIs", icon: `${CDN}/v1762912715/rest-api-icon_lupkys.png` },
    ],
  },
  {
    category: "Tools & Platform",
    items: [
      { name: "Git & GitHub", icon: `${CDN}/v1762912715/github_icon_o8h8k9.png` },
      { name: "WordPress", icon: `${CDN}/v1762912716/wordpress-icon_ewbqi5.png` },
    ],
  },
]

/** Flat list for compact marquees / home strip. */
export const allSkills: Skill[] = skillGroups.flatMap((g) => g.items)

export const featuredProjects = projects.filter((p) => p.featured)
