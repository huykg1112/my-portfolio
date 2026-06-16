"use client"

import Link from "next/link"
import { FileText } from "lucide-react"
import { useDocs } from "@/lib/docs-store"

const fmt = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" })

export default function DocsList() {
  const docs = useDocs()

  if (docs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">No documents yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {docs.map((doc) => (
        <Link
          key={doc.slug}
          href={`/docs/${doc.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <time className="tnum" dateTime={new Date(doc.updatedAt).toISOString()}>
              {fmt.format(doc.updatedAt)}
            </time>
          </div>
          <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground group-hover:text-primary">
            {doc.title}
          </h3>
          {doc.summary && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{doc.summary}</p>}
          {doc.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {doc.tags.map((t) => (
                <li key={t} className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </Link>
      ))}
    </div>
  )
}
