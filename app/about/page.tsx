"use client"

import Header from "@/components/header"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import AboutSkills from "@/components/about/about-skills"
import AboutTimeline from "@/components/about/about-timeline"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutSkills />
      <AboutTimeline />
    </main>
  )
}
