"use client"

import { useEffect, useId, useState } from "react"
import { useTheme } from "next-themes"

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme()
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "")
  const [svg, setSvg] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose", // allow <br/> in labels (docs are admin-authored)
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
        })
        const { svg } = await mermaid.render(`mmd-${rawId}`, chart)
        if (!cancelled) {
          setSvg(svg)
          setError(null)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Diagram error")
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chart, resolvedTheme, rawId])

  if (error) {
    return (
      <pre className="my-5 overflow-x-auto rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-xs text-destructive">
        {`Mermaid error: ${error}\n\n${chart}`}
      </pre>
    )
  }

  if (!svg) {
    return <div className="my-5 h-40 animate-pulse rounded-xl border border-border bg-secondary" aria-hidden />
  }

  return (
    <div
      className="my-5 flex justify-center overflow-x-auto rounded-xl border border-border bg-card p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      // SVG produced by mermaid; securityLevel "loose" + admin-only authoring
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
