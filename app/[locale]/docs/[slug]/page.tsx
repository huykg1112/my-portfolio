import { ArrowLeft } from "lucide-react"
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Header from "@/components/header"
import Markdown from "@/components/docs/markdown"
import DocEditButton from "@/components/docs/doc-edit-button"
import { getDoc } from "@/lib/docs"

export const dynamic = "force-dynamic"

export default async function DocDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Docs")
  const doc = await getDoc(slug)
  const fmt = new Intl.DateTimeFormat(await getLocale(), { day: "numeric", month: "short", year: "numeric" })

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        {!doc ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-sm text-muted-foreground">{t("notFound")}</p>
            <Link href="/docs" className="mt-3 inline-block text-sm font-medium text-primary hover:brightness-110">
              ← {t("backToDocs")}
            </Link>
          </div>
        ) : (
          <article className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("allDocs")}
              </Link>
              <DocEditButton slug={doc.slug} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <time className="tnum" dateTime={doc.updatedAt.toISOString()}>
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
        )}
      </section>
    </main>
  )
}
