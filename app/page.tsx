import type { Metadata } from 'next'
import Header from '@/components/header'
import Hero from '@/components/home/hero'
import FeaturedProjects from '@/components/home/featured-projects'
import TechStack from '@/components/home/tech-stack'
import CTA from '@/components/home/cta'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
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
