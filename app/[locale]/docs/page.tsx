import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Plus } from "lucide-react"
import { Link } from "@/i18n/navigation"
import Header from "@/components/header"
import SectionHeading from "@/components/section-heading"
import DocsList from "@/components/docs/docs-list"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Docs",
  description: "Study notes and technical write-ups by Tran Hoang Huy, rendered from Markdown.",
}

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Docs")

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("desc")}
          action={
            <Link
              href="/docs/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Plus className="h-4 w-4" />
              {t("newDoc")}
            </Link>
          }
        />
        <div className="mt-10">
          <DocsList />
        </div>
      </section>
    </main>
  )
}
