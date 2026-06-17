import { getTranslations } from "next-intl/server"
import Reveal from "@/components/reveal"
import SectionHeading from "@/components/section-heading"
import SkillIcon from "@/components/skill-icon"
import { getSkillGroups } from "@/lib/content"

export default async function TechStack() {
  const t = await getTranslations("Home")
  // Home shows the technical groups; soft skills live on the About page.
  const skillGroups = (await getSkillGroups()).filter((g) => g.category !== "Soft Skills")

  return (
    <section id="stack" className="container-page py-20 sm:py-28">
      <SectionHeading eyebrow={t("stackEyebrow")} title={t("stackTitle")} description={t("stackDesc")} />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.06}>
            <div className="h-full rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground">{group.category}</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
  )
}
