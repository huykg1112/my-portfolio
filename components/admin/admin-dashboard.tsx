"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Link } from "@/i18n/navigation"
import ResourceManager from "@/components/admin/resource-manager"
import type { Field } from "@/components/admin/types"

const PROJECT_FIELDS: Field[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "year", label: "Year", type: "text" },
  { name: "subtitleEn", label: "Subtitle (EN)", type: "text" },
  { name: "subtitleVi", label: "Subtitle (VI)", type: "text" },
  { name: "descriptionEn", label: "Description (EN)", type: "textarea" },
  { name: "descriptionVi", label: "Description (VI)", type: "textarea" },
  { name: "tech", label: "Tech (comma separated)", type: "tags" },
  { name: "tags", label: "Tags (comma separated)", type: "tags" },
  { name: "role", label: "Role", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "demoUrl", label: "Demo URL", type: "text" },
  { name: "repoUrl", label: "Repo URL", type: "text" },
  { name: "order", label: "Order", type: "number" },
  { name: "featured", label: "Featured", type: "bool" },
]

const EXPERIENCE_FIELDS: Field[] = [
  { name: "company", label: "Company", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "periodEn", label: "Period (EN)", type: "text" },
  { name: "periodVi", label: "Period (VI)", type: "text" },
  { name: "descriptionEn", label: "Description (EN)", type: "textarea" },
  { name: "descriptionVi", label: "Description (VI)", type: "textarea" },
  { name: "tech", label: "Tech (comma separated)", type: "tags" },
  { name: "link", label: "Link", type: "text" },
  { name: "order", label: "Order", type: "number" },
]

const SKILL_FIELDS: Field[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "icon", label: "Icon URL", type: "text" },
  { name: "category", label: "Category", type: "select", options: ["Frontend", "Backend", "Programming Languages", "Tools & Workflow", "AI-assisted Development", "Soft Skills"] },
  { name: "order", label: "Order", type: "number" },
]

const TABS = [
  { key: "projects", label: "Projects", endpoint: "/api/projects", fields: PROJECT_FIELDS, primary: "title" },
  { key: "experiences", label: "Experiences", endpoint: "/api/experiences", fields: EXPERIENCE_FIELDS, primary: "company" },
  { key: "skills", label: "Skills", endpoint: "/api/skills", fields: SKILL_FIELDS, primary: "name" },
] as const

export default function AdminDashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("projects")
  const active = TABS.find((t) => t.key === tab)!

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">Content manager</h1>
        </div>
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
        >
          <FileText className="h-4 w-4" />
          Manage Docs
        </Link>
      </div>

      <div role="tablist" aria-label="Content type" className="flex gap-1 rounded-lg border border-border bg-card p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ResourceManager
        key={active.key}
        title={active.label}
        endpoint={active.endpoint}
        fields={active.fields as Field[]}
        primaryField={active.primary}
      />
    </div>
  )
}
