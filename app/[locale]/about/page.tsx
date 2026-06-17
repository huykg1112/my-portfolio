import type { Metadata } from "next"
import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { GraduationCap, MapPin, Languages, Briefcase } from "lucide-react"
import Header from "@/components/header"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import ExperienceTimeline from "@/components/about/experience-timeline"
import SkillIcon from "@/components/skill-icon"
import { getExperiences, getSkillGroups } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tran Hoang Huy — Frontend Developer specialising in React & Next.js, Software Engineering graduate from Can Tho University (GPA 3.58).",
}

const AVATAR =
  "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png"

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("About")
  const experiences = await getExperiences(locale)
  const skillGroups = await getSkillGroups()

  const facts = [
    { Icon: GraduationCap, label: t("factEducation"), value: t("factEducationValue") },
    { Icon: Briefcase, label: t("factCurrently"), value: t("factCurrentlyValue") },
    { Icon: MapPin, label: t("factLocation"), value: t("factLocationValue") },
    { Icon: Languages, label: t("factLanguages"), value: t("factLanguagesValue") },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      {/* Intro */}
      <section className="container-page pt-32 pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("eyebrow")}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t("title")}</h1>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
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
          {facts.map(({ Icon, label, value }) => (
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
        <SectionHeading eyebrow={t("experienceEyebrow")} title={t("experienceTitle")} />
        <div className="mt-10 max-w-3xl">
          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>

      {/* Skills */}
      <section className="container-page py-16 pb-28">
        <SectionHeading eyebrow={t("skillsEyebrow")} title={t("skillsTitle")} />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.06}>
              <div className="h-full rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground">{group.category}</p>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {group.items.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-2.5">
                      <SkillIcon src={skill.icon} name={skill.name} />
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
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
