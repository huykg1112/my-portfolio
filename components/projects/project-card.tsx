import { useTranslations } from "next-intl"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/brand-icons"
import type { Project } from "@/lib/content"

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("Card")
  const { title, subtitle, description, tech, tags, year, links } = project
  const shown = tech.slice(0, 4)
  const extra = tech.length - shown.length

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground tnum">{year}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-0.5 text-xs font-medium text-primary">{subtitle}</p>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">{description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {shown.map((t) => (
          <li key={t} className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {t}
          </li>
        ))}
        {extra > 0 && (
          <li className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground">+{extra}</li>
        )}
      </ul>

      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        {links.demo && (
          <a
            href={links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ExternalLink className="h-4 w-4" />
            {t("liveDemo")}
          </a>
        )}
        {links.repo && (
          <a
            href={links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <GithubIcon className="h-4 w-4" />
            {t("code")}
          </a>
        )}
        {!links.demo && !links.repo && (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <ArrowUpRight className="h-4 w-4" />
            {t("private")}
          </span>
        )}
      </div>
    </article>
  )
}
