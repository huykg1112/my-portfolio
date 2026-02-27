import Header from '@/components/header'
import Hero from '@/components/home/hero'
import FeaturedProjects from '@/components/home/featured-projects'
import WorkExperience from '@/components/home/work-experience'
import TechStack from '@/components/home/tech-stack'
import Contact from '@/components/home/contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedProjects />
      <WorkExperience />
      <TechStack />
      <Contact />
    </main>
  )
}
