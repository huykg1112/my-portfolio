"use client"

import { useTranslations } from "next-intl"
import { Pencil } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useAdmin } from "@/lib/use-admin"

export default function DocEditButton({ slug }: { slug: string }) {
  const t = useTranslations("Docs")
  const { authed } = useAdmin()

  if (!authed) return null

  return (
    <Link
      href={`/docs/${slug}/edit`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
    >
      <Pencil className="h-4 w-4" />
      {t("edit")}
    </Link>
  )
}
