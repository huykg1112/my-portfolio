import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import ProjectCard from "@/components/projects/project-card"
import { featuredProjects } from "@/lib/content"

export default function FeaturedProjects() {
  return (
    <section id="work" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects I'm proud of"
        description="A few things I've built recently — from internal dashboards to an AI-powered platform."
        action={
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
