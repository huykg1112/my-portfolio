import Header from "@/components/header"
import AdminGate from "@/components/docs/admin-gate"
import DocEditor from "@/components/docs/doc-editor"

export default function NewDocPage() {
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
