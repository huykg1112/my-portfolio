import Header from "@/components/header"
import DocReader from "@/components/docs/doc-reader"

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <DocReader slug={slug} />
      </section>
    </main>
  )
}
