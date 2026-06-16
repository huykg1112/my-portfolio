import { prisma } from "./prisma"

/**
 * Content layer. Reads from the database; falls back to the in-memory SEED
 * (used at build time with no DB, and as the source for `prisma db seed`).
 */

type L = { en: string; vi: string }
const pick = (v: L, locale: string) => (locale === "vi" ? v.vi : v.en)

// ─── Resolved types (what the UI consumes) ──────────────────────────────────
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

// ─── Raw localized seed types ────────────────────────────────────────────────
type ProjectRaw = {
  slug: string
  title: string
  subtitle: L
  description: L
  tech: string[]
  tags: string[]
  year: string
  role?: string
  company?: string
  links: { demo?: string; repo?: string }
  featured: boolean
}

type ExperienceRaw = {
  company: string
  role: string
  period: L
  description: L
  tech: string[]
  link?: string
}

type SkillRaw = { name: string; icon: string; category: string }

const CDN = "https://res.cloudinary.com/dq8qq2zed/image/upload"
export const SKILL_CATEGORY_ORDER = ["Frontend", "Backend & Data", "Tools & Platform"]

export const SEED_PROJECTS: ProjectRaw[] = [
  {
    slug: "devosecare-dashboard",
    title: "DevoseCare Dashboard",
    subtitle: { en: "TekNix · Internal product", vi: "TekNix · Sản phẩm nội bộ" },
    description: {
      en: "Internal operations dashboard for a medical center: Kanban appointment board with drag-and-drop, customer management, a CMS module and role-based permissions. Shipped in under four weeks.",
      vi: "Dashboard vận hành nội bộ cho một trung tâm y tế: bảng lịch hẹn Kanban kéo-thả, quản lý khách hàng, module CMS và phân quyền theo vai trò. Hoàn thành trong chưa đầy bốn tuần.",
    },
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
    subtitle: { en: "Bachelor's thesis", vi: "Luận văn tốt nghiệp" },
    description: {
      en: "AI-powered agricultural e-commerce platform with crop-disease diagnosis (PhoBERT fine-tune, ~97% accuracy across 350+ diseases). Web with Next.js, mobile with Flutter, backend on NestJS + PostgreSQL.",
      vi: "Nền tảng thương mại điện tử nông sản tích hợp AI chẩn đoán bệnh cây (PhoBERT fine-tune, ~97% độ chính xác trên 350+ loại bệnh). Web bằng Next.js, mobile bằng Flutter, backend NestJS + PostgreSQL.",
    },
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
    subtitle: { en: "Green Space Solution", vi: "Green Space Solution" },
    description: {
      en: "Web-based transport management system: group, vehicle and maintenance modules. Built the frontend and integrated GraphQL services on a NestJS + Strapi backend.",
      vi: "Hệ thống quản lý vận tải trên web: module nhóm, phương tiện và bảo trì. Mình xây frontend và tích hợp các service GraphQL trên backend NestJS + Strapi.",
    },
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
    subtitle: { en: "UTA · Internal product", vi: "UTA · Sản phẩm nội bộ" },
    description: {
      en: "Internal management dashboard with an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Optimised UI/UX and integrated RESTful APIs.",
      vi: "Dashboard quản lý nội bộ với tính năng chẩn đoán sâu bệnh bằng AI (PhoBERT, ~97% độ chính xác). Tối ưu UI/UX và tích hợp REST API.",
    },
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
    subtitle: { en: "TekNix · 60+ sites", vi: "TekNix · 60+ website" },
    description: {
      en: "Maintained and built 60+ international dental-clinic websites: landing pages, performance and SEO optimisation, and CMS-driven content management.",
      vi: "Bảo trì và xây 60+ website phòng khám nha khoa quốc tế: trang landing, tối ưu hiệu năng và SEO, quản lý nội dung qua CMS.",
    },
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
    subtitle: { en: "Group project", vi: "Dự án nhóm" },
    description: {
      en: "Full-stack homestay booking platform with search, filtering, booking flows and real-time updates for three roles: client, landlord and admin.",
      vi: "Nền tảng đặt homestay full-stack với tìm kiếm, lọc, luồng đặt phòng và cập nhật thời gian thực cho ba vai trò: khách, chủ nhà và admin.",
    },
    tech: ["ReactJS", "Tailwind CSS", "MUI", "REST API", "PostgreSQL"],
    tags: ["Booking", "Full-stack"],
    year: "2024",
    role: "Frontend Developer",
    company: "Group project",
    links: { repo: "https://github.com/tainn03/Homestay-Booking-Client" },
    featured: false,
  },
]

export const SEED_EXPERIENCES: ExperienceRaw[] = [
  {
    company: "TekNix Technology Corporation",
    role: "Frontend Intern",
    period: { en: "Sep 2025 — Present", vi: "09/2025 — Hiện tại" },
    description: {
      en: "Building and maintaining responsive websites for ~60 international dental clinics with React, Next.js and WordPress. Integrating REST APIs and crafting interactive UI with Framer.",
      vi: "Xây dựng và bảo trì website responsive cho ~60 phòng khám nha khoa quốc tế với React, Next.js và WordPress. Tích hợp REST API và làm UI tương tác với Framer.",
    },
    tech: ["ReactJS", "Next.js", "WordPress", "Tailwind CSS", "Framer", "SEO"],
    link: "https://www.teknix.vn/",
  },
  {
    company: "Green Space Solution JSC",
    role: "Full-stack Intern",
    period: { en: "Jun 2025 — Aug 2025", vi: "06/2025 — 08/2025" },
    description: {
      en: "Designed and optimised the AutoTMS transport-management frontend. Integrated components with NestJS, Strapi, Prisma and GraphQL services; took part in code reviews.",
      vi: "Thiết kế và tối ưu frontend hệ thống quản lý vận tải AutoTMS. Tích hợp component với các service NestJS, Strapi, Prisma và GraphQL; tham gia review code.",
    },
    tech: ["Next.js", "Hero UI", "NestJS", "Strapi", "Prisma", "GraphQL"],
    link: "https://www.autotms.vn/",
  },
  {
    company: "UTA Co., Ltd",
    role: "IT Intern",
    period: { en: "Jun 2024 — Apr 2025", vi: "06/2024 — 04/2025" },
    description: {
      en: "Built frontends for internal web apps and an AI-based pest-diagnosis feature (PhoBERT, ~97% accuracy). Improved UI performance and cross-device responsiveness.",
      vi: "Xây frontend cho các ứng dụng web nội bộ và tính năng chẩn đoán sâu bệnh bằng AI (PhoBERT, ~97% độ chính xác). Cải thiện hiệu năng UI và khả năng responsive đa thiết bị.",
    },
    tech: ["ReactJS", "NestJS", "REST API", "PhoBERT", "Tailwind CSS"],
    link: "https://utasolution.com",
  },
]

export const SEED_SKILLS: SkillRaw[] = [
  { name: "ReactJS", icon: `${CDN}/v1762912715/React-icon_aotcdf.png`, category: "Frontend" },
  { name: "Next.js", icon: `${CDN}/v1762912714/nextjs_icon_myecuu.png`, category: "Frontend" },
  { name: "TypeScript", icon: `${CDN}/v1762912715/Typescript_icon_mirpqm.png`, category: "Frontend" },
  { name: "Tailwind CSS", icon: `${CDN}/v1762914096/tailwind_icon_dunczr.svg`, category: "Frontend" },
  { name: "NestJS", icon: `${CDN}/v1762913912/NestJS_icon_awrwgu.png`, category: "Backend & Data" },
  { name: "PostgreSQL", icon: `${CDN}/v1762912715/Postgresql_icon_drdedp.png`, category: "Backend & Data" },
  { name: "GraphQL", icon: `${CDN}/v1762912715/GraphQL_icon_sntg2p.png`, category: "Backend & Data" },
  { name: "REST APIs", icon: `${CDN}/v1762912715/rest-api-icon_lupkys.png`, category: "Backend & Data" },
  { name: "Git & GitHub", icon: `${CDN}/v1762912715/github_icon_o8h8k9.png`, category: "Tools & Platform" },
  { name: "WordPress", icon: `${CDN}/v1762912716/wordpress-icon_ewbqi5.png`, category: "Tools & Platform" },
]

// ─── Seed-row mappers (used by prisma/seed.ts) ───────────────────────────────
export function projectRow(p: ProjectRaw, order: number) {
  return {
    slug: p.slug,
    title: p.title,
    subtitleEn: p.subtitle.en,
    subtitleVi: p.subtitle.vi,
    descriptionEn: p.description.en,
    descriptionVi: p.description.vi,
    tech: p.tech,
    tags: p.tags,
    year: p.year,
    role: p.role ?? null,
    company: p.company ?? null,
    demoUrl: p.links.demo ?? null,
    repoUrl: p.links.repo ?? null,
    featured: p.featured,
    order,
  }
}

export function experienceRow(e: ExperienceRaw, order: number) {
  return {
    company: e.company,
    role: e.role,
    periodEn: e.period.en,
    periodVi: e.period.vi,
    descriptionEn: e.description.en,
    descriptionVi: e.description.vi,
    tech: e.tech,
    link: e.link ?? null,
    order,
  }
}

// ─── DB-backed getters with SEED fallback ────────────────────────────────────
function resolveSeedProjects(locale: string): Project[] {
  return SEED_PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: pick(p.subtitle, locale),
    description: pick(p.description, locale),
    tech: p.tech,
    tags: p.tags,
    year: p.year,
    role: p.role,
    company: p.company,
    links: p.links,
    featured: p.featured,
  }))
}

export async function getProjects(locale: string): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({ orderBy: { order: "asc" } })
    if (rows.length === 0) return resolveSeedProjects(locale)
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      subtitle: locale === "vi" ? r.subtitleVi : r.subtitleEn,
      description: locale === "vi" ? r.descriptionVi : r.descriptionEn,
      tech: r.tech,
      tags: r.tags,
      year: r.year,
      role: r.role ?? undefined,
      company: r.company ?? undefined,
      links: { demo: r.demoUrl ?? undefined, repo: r.repoUrl ?? undefined },
      featured: r.featured,
    }))
  } catch {
    return resolveSeedProjects(locale)
  }
}

export async function getFeaturedProjects(locale: string): Promise<Project[]> {
  return (await getProjects(locale)).filter((p) => p.featured)
}

export async function getExperiences(locale: string): Promise<Experience[]> {
  try {
    const rows = await prisma.experience.findMany({ orderBy: { order: "asc" } })
    if (rows.length === 0) throw new Error("empty")
    return rows.map((r) => ({
      company: r.company,
      role: r.role,
      period: locale === "vi" ? r.periodVi : r.periodEn,
      description: locale === "vi" ? r.descriptionVi : r.descriptionEn,
      tech: r.tech,
      link: r.link ?? undefined,
    }))
  } catch {
    return SEED_EXPERIENCES.map((e) => ({
      company: e.company,
      role: e.role,
      period: pick(e.period, locale),
      description: pick(e.description, locale),
      tech: e.tech,
      link: e.link,
    }))
  }
}

function groupSkills(items: SkillRaw[]): SkillGroup[] {
  const byCat = new Map<string, Skill[]>()
  for (const s of items) {
    if (!byCat.has(s.category)) byCat.set(s.category, [])
    byCat.get(s.category)!.push({ name: s.name, icon: s.icon })
  }
  const ordered = [...SKILL_CATEGORY_ORDER, ...[...byCat.keys()].filter((c) => !SKILL_CATEGORY_ORDER.includes(c))]
  return ordered.filter((c) => byCat.has(c)).map((category) => ({ category, items: byCat.get(category)! }))
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  try {
    const rows = await prisma.skill.findMany({ orderBy: { order: "asc" } })
    if (rows.length === 0) return groupSkills(SEED_SKILLS)
    return groupSkills(rows.map((r) => ({ name: r.name, icon: r.icon, category: r.category })))
  } catch {
    return groupSkills(SEED_SKILLS)
  }
}
