import { setRequestLocale } from "next-intl/server"
import Header from "@/components/header"
import DocReader from "@/components/docs/doc-reader"

export default async function DocDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <DocReader slug={slug} />
      </section>
    </main>
  )
}
