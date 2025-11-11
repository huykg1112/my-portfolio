"use client"

import Header from "@/components/header"
import LabHero from "@/components/lab/lab-hero"
import LabCards from "@/components/lab/lab-cards"
import LabProjects from "@/components/lab/lab-projects"

export default function LabPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <LabHero />
      <LabCards />
      <LabProjects />
    </main>
  )
}
