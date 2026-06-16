import { getLocale, getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import ProjectCard from "@/components/projects/project-card"
import { getFeaturedProjects } from "@/lib/content"

export default async function FeaturedProjects() {
  const t = await getTranslations("Home")
  const locale = await getLocale()
  const featured = getFeaturedProjects(locale)

  return (
    <section id="work" className="container-page py-20 sm:py-28">
      <SectionHeading
        eyebrow={t("workEyebrow")}
        title={t("workTitle")}
        description={t("workDesc")}
        action={
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            {t("workViewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
