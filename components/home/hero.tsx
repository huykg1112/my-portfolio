"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowUpRight, Mail } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

// Two portraits. Light: shows FRONT by default, flips to BACK on hover.
// Dark:  shows BACK by default, flips to FRONT on hover.
const AVATAR_FRONT = "https://res.cloudinary.com/dq8qq2zed/image/upload/v1776170060/TranHoangHuy_2_tsghsx.jpg"
const AVATAR_BACK = "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png"

const STACK = ["React", "Next.js", "TypeScript", "NestJS", "Odoo", "PostgreSQL"]

const SOCIALS = [
  { href: "https://github.com/huykg1112", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/in/hoang-huy-tran-23baa6358", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "mailto:huyth.dev@gmail.com", label: "Email", Icon: Mail },
]

export default function Hero() {
  const t = useTranslations("Hero")
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="container-page flex min-h-[88svh] items-center pt-24 pb-16">
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — copy */}
        <div className="max-w-xl">
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t("availability")}
          </motion.div>

          <motion.h1
            {...rise(0.05)}
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Tran Hoang Huy
          </motion.h1>

          <motion.p {...rise(0.1)} className="mt-3 text-xl font-medium text-foreground/90 sm:text-2xl">
            {t.rich("lead", { hl: (chunks) => <span className="text-primary">{chunks}</span> })}
          </motion.p>

          <motion.p {...rise(0.15)} className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("intro")}
          </motion.p>

          {/* CTAs */}
          <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t("viewProjects")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("getInTouch")}
            </Link>

            <div className="ml-1 flex items-center gap-1">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stack */}
          <motion.ul {...rise(0.25)} className="mt-9 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right — framed portrait */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto"
        >
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-linear-to-tr from-primary/10 to-accent/10" aria-hidden />
          <div className="group [perspective:1200px]">
            <div className="relative aspect-[4/5] w-full transform-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-x-180 dark:rotate-x-180 dark:group-hover:rotate-x-0">
              {/* Front — image 1 (light default / dark on hover) */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card shadow-md backface-hidden">
                <Image
                  src={AVATAR_FRONT}
                  alt="Portrait of Tran Hoang Huy"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover"
                  style={{ objectPosition: "top center" }}
                />
              </div>
              {/* Back — image 2 (dark default / light on hover) */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card shadow-md backface-hidden rotate-x-180">
                <Image
                  src={AVATAR_BACK}
                  alt="Portrait of Tran Hoang Huy"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover"
                  style={{ objectPosition: "top center" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
