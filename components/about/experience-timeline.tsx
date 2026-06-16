import { ArrowUpRight } from "lucide-react"
import Reveal from "@/components/reveal"
import type { Experience } from "@/lib/content"

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <ol className="relative ml-3 border-l border-border">
      {experiences.map((exp, i) => (
        <li key={exp.company} className="relative pl-8 pb-10 last:pb-0">
          <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
          <Reveal delay={i * 0.06}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground tnum">{exp.period}</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">
              {exp.role}
              <span className="text-muted-foreground"> · </span>
              {exp.link ? (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-primary transition-colors hover:brightness-110"
                >
                  {exp.company}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                exp.company
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <li key={t} className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
