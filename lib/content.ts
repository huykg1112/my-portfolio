/**
 * Typed mock content layer (localized).
 * Swap these for CMS/DB calls later — the UI only depends on the resolved types.
 */

type L = { en: string; vi: string }
const pick = (v: L, locale: string) => (locale === "vi" ? v.vi : v.en)

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

export type Project = Omit<ProjectRaw, "subtitle" | "description"> & {
  subtitle: string
  description: string
}

type ExperienceRaw = {
  company: string
  role: string
  period: L
  description: L
  tech: string[]
  link?: string
}

export type Experience = Omit<ExperienceRaw, "period" | "description"> & {
  period: string
  description: string
}

export type Skill = { name: string; icon: string }
export type SkillGroup = { category: string; items: Skill[] }

const CDN = "https://res.cloudinary.com/dq8qq2zed/image/upload"

const PROJECTS: ProjectRaw[] = [
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

const EXPERIENCES: ExperienceRaw[] = [
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

export function getProjects(locale: string): Project[] {
  return PROJECTS.map((p) => ({ ...p, subtitle: pick(p.subtitle, locale), description: pick(p.description, locale) }))
}

export function getFeaturedProjects(locale: string): Project[] {
  return getProjects(locale).filter((p) => p.featured)
}

export function getExperiences(locale: string): Experience[] {
  return EXPERIENCES.map((e) => ({ ...e, period: pick(e.period, locale), description: pick(e.description, locale) }))
}

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
