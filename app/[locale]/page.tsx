import { setRequestLocale } from "next-intl/server"
import Header from "@/components/header"
import Hero from "@/components/home/hero"
import FeaturedProjects from "@/components/home/featured-projects"
import TechStack from "@/components/home/tech-stack"
import CTA from "@/components/home/cta"

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedProjects />
      <TechStack />
      <CTA />
    </main>
  )
}
