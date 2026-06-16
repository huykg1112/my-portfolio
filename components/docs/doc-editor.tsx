"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Eye, Pencil, Save, Trash2, X } from "lucide-react"
import { useRouter } from "@/i18n/navigation"
import Markdown from "@/components/docs/markdown"
import { saveDoc, deleteDoc, type Doc } from "@/lib/docs-store"

const field =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export default function DocEditor({ initial }: { initial?: Doc }) {
  const t = useTranslations("Docs")
  const router = useRouter()
  const [title, setTitle] = useState(initial?.title ?? "")
  const [summary, setSummary] = useState(initial?.summary ?? "")
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "")
  const [content, setContent] = useState(initial?.content ?? "# New document\n\nStart writing in **Markdown**…")
  const [mobileView, setMobileView] = useState<"write" | "preview">("write")

  const onSave = () => {
    const slug = saveDoc({
      slug: initial?.slug,
      title,
      summary,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      content,
    })
    router.push(`/docs/${slug}`)
  }

  const onDelete = () => {
    if (initial && confirm(t("confirmDelete"))) {
      deleteDoc(initial.slug)
      router.push("/docs")
    }
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {initial ? t("editTitle") : t("newTitle")}
        </h1>
        <div className="flex items-center gap-2">
          {initial && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-destructive transition-colors hover:border-destructive/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Trash2 className="h-4 w-4" />
              {t("delete")}
            </button>
          )}
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!title.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Save className="h-4 w-4" />
            {t("save")}
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={field} placeholder={t("fieldTitle")} value={title} onChange={(e) => setTitle(e.target.value)} aria-label={t("fieldTitle")} />
        <input className={field} placeholder={t("fieldTags")} value={tags} onChange={(e) => setTags(e.target.value)} aria-label={t("fieldTags")} />
      </div>
      <input className={field} placeholder={t("fieldSummary")} value={summary} onChange={(e) => setSummary(e.target.value)} aria-label={t("fieldSummary")} />

      {/* Mobile view switch */}
      <div className="flex gap-1 rounded-lg border border-border bg-card p-1 sm:hidden">
        {(["write", "preview"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setMobileView(v)}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              mobileView === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {v === "write" ? <Pencil className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {v === "write" ? t("write") : t("preview")}
          </button>
        ))}
      </div>

      {/* Split editor / preview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={mobileView === "write" ? "block" : "hidden sm:block"}>
          <label htmlFor="md-input" className="sr-only">Markdown source</label>
          <textarea
            id="md-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="h-[60vh] w-full resize-none rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className={mobileView === "preview" ? "block" : "hidden sm:block"}>
          <div className="h-[60vh] overflow-y-auto rounded-xl border border-border bg-card p-5">
            <Markdown content={content} />
          </div>
        </div>
      </div>
    </div>
  )
}
