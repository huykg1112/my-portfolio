"use client"

import Link from "next/link"
import DocEditor from "@/components/docs/doc-editor"
import { useDoc } from "@/lib/docs-store"

export default function DocEditLoader({ slug }: { slug: string }) {
  const doc = useDoc(slug)

  if (!doc) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-sm text-muted-foreground">Document not found.</p>
        <Link href="/docs" className="mt-3 inline-block text-sm font-medium text-primary hover:brightness-110">
          ← Back to all docs
        </Link>
      </div>
    )
  }

  return <DocEditor initial={doc} />
}
