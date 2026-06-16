import { revalidatePath } from "next/cache"
import { routing } from "@/i18n/routing"

/** Revalidate the public pages that render DB content, for every locale. */
export function revalidateContent() {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/projects`)
    revalidatePath(`/${locale}/about`)
  }
}

export function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v.trim() : fallback
}

export function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean)
  return []
}

export function asInt(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : parseInt(String(v), 10)
  return Number.isFinite(n) ? n : fallback
}

// ─── Field mappers (shared by POST/PUT route handlers) ───────────────────────
export function mapProjectInput(b: unknown) {
  const o = b as Record<string, unknown>
  return {
    title: asString(o.title),
    subtitleEn: asString(o.subtitleEn),
    subtitleVi: asString(o.subtitleVi),
    descriptionEn: asString(o.descriptionEn),
    descriptionVi: asString(o.descriptionVi),
    tech: asStringArray(o.tech),
    tags: asStringArray(o.tags),
    year: asString(o.year),
    role: asString(o.role) || null,
    company: asString(o.company) || null,
    demoUrl: asString(o.demoUrl) || null,
    repoUrl: asString(o.repoUrl) || null,
    featured: Boolean(o.featured),
    order: asInt(o.order),
  }
}

export function mapExperienceInput(b: unknown) {
  const o = b as Record<string, unknown>
  return {
    company: asString(o.company),
    role: asString(o.role),
    periodEn: asString(o.periodEn),
    periodVi: asString(o.periodVi),
    descriptionEn: asString(o.descriptionEn),
    descriptionVi: asString(o.descriptionVi),
    tech: asStringArray(o.tech),
    link: asString(o.link) || null,
    order: asInt(o.order),
  }
}

export function mapSkillInput(b: unknown) {
  const o = b as Record<string, unknown>
  return {
    name: asString(o.name),
    icon: asString(o.icon),
    category: asString(o.category) || "Frontend",
    order: asInt(o.order),
  }
}
