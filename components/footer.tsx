import { getTranslations } from "next-intl/server"
import { Mail, Phone } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/brand-icons"

const NAV = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/docs", key: "docs" },
] as const

const SOCIALS = [
  { href: "https://github.com/huykg1112", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/in/hoang-huy-tran-23baa6358", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://www.facebook.com/tran.huy.113299/", label: "Facebook", Icon: FacebookIcon },
  { href: "tel:+84334114244", label: "Phone", Icon: Phone },
]

export default async function Footer() {
  const t = await getTranslations("Nav")
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <div className="text-sm font-semibold text-foreground">Tran Hoang Huy</div>
          <div className="text-sm text-muted-foreground">Fullstack Developer · {year}</div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t(item.key)}
            </Link>
          ))}
          <a
            href="mailto:huyth.dev@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:brightness-110"
          >
            <Mail className="h-4 w-4" />
            huyth.dev@gmail.com
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
