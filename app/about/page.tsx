import type { Metadata } from "next"
import Image from "next/image"
import { GraduationCap, MapPin, Languages, Briefcase } from "lucide-react"
import Header from "@/components/header"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import ExperienceTimeline from "@/components/about/experience-timeline"
import { skillGroups } from "@/lib/content"

const baseUrl = process.env.URL_BASE || "https://thhuydev.id.vn"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tran Hoang Huy — Frontend Developer specialising in React & Next.js, Software Engineering graduate from Can Tho University (GPA 3.58).",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About – Trần Hoàng Huy",
    description: "Frontend Developer (React / Next.js). Experience, skills and story.",
    type: "profile",
    url: `${baseUrl}/about`,
  },
}

const AVATAR =
  "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png"

const FACTS = [
  { Icon: GraduationCap, label: "Education", value: "Software Engineering, Can Tho University · GPA 3.58" },
  { Icon: Briefcase, label: "Currently", value: "Frontend Intern at TekNix Technology" },
  { Icon: MapPin, label: "Based in", value: "Ninh Kiều, Cần Thơ, Vietnam" },
  { Icon: Languages, label: "Languages", value: "Vietnamese (native), English (working)" },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      {/* Intro */}
      <section className="container-page pt-32 pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">About</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frontend developer who likes shipping real things
            </h1>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I'm Huy, a final-year Software Engineering student at Can Tho University. Over three
                internships I've built production interfaces — from clinic websites at scale to internal
                dashboards and an AI-powered platform for my thesis.
              </p>
              <p>
                I care about performance, accessibility and clean component design. My comfort zone is
                React and Next.js with TypeScript, but I'm just as happy wiring up a NestJS API or a
                PostgreSQL schema when a project needs it.
              </p>
              <p>
                Outside of work I write study notes (you'll find some in the Docs section) and keep
                experimenting with new tools to ship faster without cutting corners.
              </p>
            </div>
          </div>

          <Reveal className="lg:pt-2">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <Image
                src={AVATAR}
                alt="Portrait of Tran Hoang Huy"
                width={440}
                height={520}
                className="h-auto w-full object-cover"
                style={{ objectPosition: "top center" }}
              />
            </div>
          </Reveal>
        </div>

        {/* Quick facts */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FACTS.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="container-page py-16">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="mt-10 max-w-3xl">
          <ExperienceTimeline />
        </div>
      </section>

      {/* Skills */}
      <section className="container-page py-16 pb-28">
        <SectionHeading eyebrow="Skills" title="What I work with" />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.08}>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">{group.category}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
