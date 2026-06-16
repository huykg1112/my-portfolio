"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import DocEditor from "@/components/docs/doc-editor"
import { useDoc } from "@/lib/docs-store"

export default function DocEditLoader({ slug }: { slug: string }) {
  const t = useTranslations("Docs")
  const doc = useDoc(slug)

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

  return <DocEditor initial={doc} />
}
