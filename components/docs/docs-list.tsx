import { getLocale, getTranslations } from "next-intl/server"
import { FileText } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { getDocs } from "@/lib/docs"

export default async function DocsList() {
  const t = await getTranslations("Docs")
  const locale = await getLocale()
  const docs = await getDocs()
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" })

  if (docs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">{t("empty")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {docs.map((doc) => (
        <Link
          key={doc.slug}
          href={`/docs/${doc.slug}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {doc.imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doc.imgUrl}
              alt=""
              loading="lazy"
              className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
              <FileText className="h-8 w-8 text-primary/50" />
            </div>
          )}

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <time className="tnum" dateTime={doc.updatedAt.toISOString()}>
                {fmt.format(doc.updatedAt)}
              </time>
            </div>
            <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
              {doc.title}
            </h3>
            {doc.summary && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{doc.summary}</p>}
            {doc.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {doc.tags.map((tag) => (
                  <li key={tag} className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
