import Header from "@/components/header"
import AdminGate from "@/components/docs/admin-gate"
import DocEditLoader from "@/components/docs/doc-edit-loader"

export default async function EditDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <AdminGate>
          <DocEditLoader slug={slug} />
        </AdminGate>
      </section>
    </main>
  )
}
