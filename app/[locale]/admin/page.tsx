import { setRequestLocale } from "next-intl/server"
import Header from "@/components/header"
import AdminGate from "@/components/docs/admin-gate"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata = { robots: { index: false, follow: false } }

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <AdminGate>
          <AdminDashboard />
        </AdminGate>
      </section>
    </main>
  )
}
