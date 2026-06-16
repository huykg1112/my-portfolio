"use client"

import { useLocale, useTranslations } from "next-intl"
import { ArrowLeft, Pencil } from "lucide-react"
import { Link } from "@/i18n/navigation"
import Markdown from "@/components/docs/markdown"
import { useDoc } from "@/lib/docs-store"
import { useAdmin } from "@/lib/use-admin"

export default function DocReader({ slug }: { slug: string }) {
  const t = useTranslations("Docs")
  const locale = useLocale()
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" })
  const doc = useDoc(slug)
  const { authed } = useAdmin()

  if (!doc) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-sm text-muted-foreground">{t("notFound")}</p>
        <Link href="/docs" className="mt-3 inline-block text-sm font-medium text-primary hover:brightness-110">
          ← {t("backToDocs")}
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("allDocs")}
        </Link>
        {authed && (
          <Link
            href={`/docs/${doc.slug}/edit`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
          >
            <Pencil className="h-4 w-4" />
            {t("edit")}
          </Link>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
        <time className="tnum" dateTime={new Date(doc.updatedAt).toISOString()}>
          {t("updated", { date: fmt.format(doc.updatedAt) })}
        </time>
        {doc.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{tag}</span>
        ))}
      </div>

      <div className="mt-6">
        <Markdown content={doc.content} />
      </div>
    </article>
  )
}
