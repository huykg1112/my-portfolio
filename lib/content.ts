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

const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}`
export const SKILL_CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Programming Languages",
  "Tools & Workflow",
  "AI-assisted Development",
  "Soft Skills",
]

export const SEED_PROJECTS: ProjectRaw[] = [
  {
    slug: "doko-school",
    title: "DOKO — School Management (Odoo)",
    subtitle: { en: "BMS Tech · Odoo modules", vi: "BMS Tech · Module Odoo" },
    description: {
      en: "Two modules on the DOKO school platform (Odoo 17): school_helpdesk for ticket intake, assignment, access control and status tracking; and school_kiosk, a touchscreen OWL.js SPA for class/exam schedules, honor boards, news and campus maps.",
      vi: "Hai module trên nền tảng trường học DOKO (Odoo 17): school_helpdesk quản lý tiếp nhận ticket, phân công, phân quyền và trạng thái; và school_kiosk — SPA màn hình cảm ứng bằng OWL.js xem lịch học/thi, bảng vinh danh, tin tức và bản đồ trường.",
    },
    tech: ["Odoo 17", "Python", "OWL.js", "XML/QWeb", "PostgreSQL", "SCSS"],
    tags: ["ERP", "Odoo"],
    year: "2026",
    role: "Odoo Developer",
    company: "BMS Tech",
    links: {},
    featured: true,
  },
  {
    slug: "devosecare-dashboard",
    title: "DevoseCare Dashboard",
    subtitle: { en: "TekNix · Internal product", vi: "TekNix · Sản phẩm nội bộ" },
    description: {
      en: "Internal operations dashboard for a medical center: Kanban appointment board with drag-and-drop, customer management, a CMS module and role-based permissions. Shipped in under four weeks.",
      vi: "Dashboard vận hành nội bộ cho một trung tâm y tế: bảng lịch hẹn Kanban kéo-thả, quản lý khách hàng, module CMS và phân quyền theo vai trò. Hoàn thành trong chưa đầy bốn tuần.",
    },
    tech: ["ReactJS", "Vite", "Tailwind CSS", "Shadcn UI", "Zustand", "dnd-kit", "React Query"],
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
      en: "AI-powered agricultural e-commerce platform with crop-disease diagnosis (PhoBERT fine-tune, ~97% accuracy across 350+ diseases). Web with Next.js, mobile with Flutter, backend on NestJS + PostgreSQL. Final thesis score 9.9/10.",
      vi: "Nền tảng thương mại điện tử nông sản tích hợp AI chẩn đoán bệnh cây (PhoBERT fine-tune, ~97% độ chính xác trên 350+ loại bệnh). Web bằng Next.js, mobile bằng Flutter, backend NestJS + PostgreSQL. Điểm luận văn 9.9/10.",
    },
    tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "TypeORM", "Redux Toolkit", "Flutter"],
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
    featured: false,
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
    company: "BMS Tech",
    role: "Fresher Odoo Developer",
    period: { en: "Mar 2026 — Jun 2026", vi: "03/2026 — 06/2026" },
    description: {
      en: "Built Odoo 17 modules: school_helpdesk (ticket lifecycle, assignment, status tracking) and school_kiosk (touchscreen SPA for schedules, honor boards, news and feedback). Created reusable Odoo Website snippets and UIs for DOKO, DOKO Kiosk and client sites.",
      vi: "Xây các module Odoo 17: school_helpdesk (vòng đời ticket, phân công, theo dõi trạng thái) và school_kiosk (SPA màn hình cảm ứng xem lịch, bảng vinh danh, tin tức, góp ý). Tạo snippet website Odoo tái sử dụng và UI cho DOKO, DOKO Kiosk cùng các site khách hàng.",
    },
    tech: ["Odoo 17", "Python", "OWL.js", "XML/QWeb", "PostgreSQL"],
  },
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
  // Frontend
  { name: "ReactJS", icon: SI("react"), category: "Frontend" },
  { name: "Next.js", icon: SI("nextdotjs"), category: "Frontend" },
  { name: "WordPress", icon: SI("wordpress"), category: "Frontend" },
  { name: "Redux Toolkit", icon: SI("redux"), category: "Frontend" },
  { name: "Zustand", icon: "", category: "Frontend" },
  { name: "Tailwind CSS", icon: SI("tailwindcss"), category: "Frontend" },
  { name: "Shadcn/UI", icon: SI("shadcnui"), category: "Frontend" },
  { name: "Responsive Design", icon: "", category: "Frontend" },
  { name: "UI/UX Best Practices", icon: "", category: "Frontend" },
  { name: "OWL.js", icon: "", category: "Frontend" },
  // Backend
  { name: "RESTful APIs", icon: "", category: "Backend" },
  { name: "NestJS", icon: SI("nestjs"), category: "Backend" },
  { name: "JWT Authentication", icon: SI("jsonwebtokens"), category: "Backend" },
  { name: "OAuth 2.0", icon: SI("auth0"), category: "Backend" },
  { name: "PostgreSQL", icon: SI("postgresql"), category: "Backend" },
  { name: "TypeORM", icon: SI("typeorm"), category: "Backend" },
  { name: "Odoo (17,18,19)", icon: SI("odoo"), category: "Backend" },
  // Programming Languages
  { name: "JavaScript", icon: SI("javascript"), category: "Programming Languages" },
  { name: "TypeScript", icon: SI("typescript"), category: "Programming Languages" },
  { name: "Python", icon: SI("python"), category: "Programming Languages" },
  { name: "PHP", icon: SI("php"), category: "Programming Languages" },
  { name: "XML", icon: "", category: "Programming Languages" },
  // Tools & Workflow
  { name: "Git", icon: SI("git"), category: "Tools & Workflow" },
  { name: "GitHub", icon: SI("github"), category: "Tools & Workflow" },
  { name: "GitLab", icon: SI("gitlab"), category: "Tools & Workflow" },
  { name: "Postman", icon: SI("postman"), category: "Tools & Workflow" },
  { name: "Vercel", icon: SI("vercel"), category: "Tools & Workflow" },
  { name: "DBeaver", icon: SI("dbeaver"), category: "Tools & Workflow" },
  { name: "VS Code", icon: "", category: "Tools & Workflow" },
  { name: "Framer", icon: SI("framer"), category: "Tools & Workflow" },
  { name: "Google Colab", icon: SI("googlecolab"), category: "Tools & Workflow" },
  // AI-assisted Development
  { name: "GitHub Copilot", icon: SI("githubcopilot"), category: "AI-assisted Development" },
  { name: "ChatGPT", icon: SI("openai"), category: "AI-assisted Development" },
  { name: "Claude", icon: SI("claude"), category: "AI-assisted Development" },
  // Soft Skills
  { name: "Communication", icon: "", category: "Soft Skills" },
  { name: "Teamwork", icon: "", category: "Soft Skills" },
  { name: "Problem Solving", icon: "", category: "Soft Skills" },
  { name: "Reporting", icon: "", category: "Soft Skills" },
  { name: "Team Leadership", icon: "", category: "Soft Skills" },
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
