import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import Reveal from "@/components/reveal"

export default async function CTA() {
  const t = await getTranslations("Home")

  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="absolute -inset-px -z-10 bg-linear-to-tr from-primary/5 via-transparent to-accent/5" aria-hidden />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{t("ctaDesc")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:huyth.dev@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              huyth.dev@gmail.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
