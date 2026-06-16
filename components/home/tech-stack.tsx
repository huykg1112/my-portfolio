import Image from "next/image"
import { getTranslations } from "next-intl/server"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import { getSkillGroups } from "@/lib/content"

export default async function TechStack() {
  const t = await getTranslations("Home")
  const skillGroups = await getSkillGroups()

  return (
    <section id="stack" className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow={t("stackEyebrow")} title={t("stackTitle")} description={t("stackDesc")} />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.08}>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">{group.category}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.items.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background p-1.5">
                      <Image src={skill.icon} alt="" width={24} height={24} className="h-full w-full object-contain" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
