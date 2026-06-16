import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Header from "@/components/header"
import AdminGate from "@/components/docs/admin-gate"
import DocEditor from "@/components/docs/doc-editor"
import { getDoc } from "@/lib/docs"

export const dynamic = "force-dynamic"

export default async function EditDocPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Docs")
  const doc = await getDoc(slug)

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <AdminGate>
          {doc ? (
            <DocEditor initial={doc} />
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">{t("notFound")}</p>
              <Link href="/docs" className="mt-3 inline-block text-sm font-medium text-primary hover:brightness-110">
                ← {t("backToDocs")}
              </Link>
            </div>
          )}
        </AdminGate>
      </section>
    </main>
  )
}
