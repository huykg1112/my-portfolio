import { setRequestLocale } from "next-intl/server"
import Header from "@/components/header"
import AdminGate from "@/components/docs/admin-gate"
import DocEditor from "@/components/docs/doc-editor"

export default async function NewDocPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <AdminGate>
          <DocEditor />
        </AdminGate>
      </section>
    </main>
  )
}
