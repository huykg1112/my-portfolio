import type { Metadata } from "next"
import Header from "@/components/header"
import ProjectsExplorer from "@/components/projects/projects-explorer"
import { projects } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Tran Hoang Huy — dashboards, an AI-powered e-commerce platform, transport management and more, built with React, Next.js and NestJS.",
  alternates: { canonical: "/projects" },
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Things I've built
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A mix of production work from internships, a graduation thesis and side projects.
            Filter by what interests you.
          </p>
        </div>

        <div className="mt-12">
          <ProjectsExplorer projects={projects} />
        </div>
      </section>
    </main>
  )
}
