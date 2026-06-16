import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Mail, MapPin, Phone } from "lucide-react"
import Header from "@/components/header"
import ContactForm from "@/components/home/contact-form"
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/brand-icons"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tran Hoang Huy — Frontend Developer (React / Next.js).",
}

const SOCIALS = [
  { href: "https://github.com/huykg1112", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/in/hoang-huy-tran-23baa6358", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://www.facebook.com/tran.huy.113299/", label: "Facebook", Icon: FacebookIcon },
]

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("Contact")

  const details = [
    { Icon: Mail, label: t("email"), value: "huyth.dev@gmail.com", href: "mailto:huyth.dev@gmail.com" },
    { Icon: Phone, label: t("phone"), value: "+84 334 114 244", href: "tel:+84334114244" },
    { Icon: MapPin, label: t("location"), value: t("locationValue") },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <section className="container-page pt-32 pb-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t("title")}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("desc")}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Details */}
          <div className="space-y-8">
            <ul className="space-y-4">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-primary">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t("elsewhere")}</p>
              <div className="mt-3 flex items-center gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
