import { permanentRedirect } from "next/navigation"

// Legacy route — projects now live at /projects.
export default async function RealProjectsRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/projects`)
}
