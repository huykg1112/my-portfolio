"use client"

import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import Mermaid from "@/components/docs/mermaid"

// Reconstruct raw source text from (possibly highlight-tokenized) children.
function toText(node: ReactNode): string {
  if (node == null || node === false || node === true) return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(toText).join("")
  if (typeof node === "object" && "props" in node) {
    return toText((node as { props?: { children?: ReactNode } }).props?.children)
  }
  return ""
}

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          pre(props) {
            const { children } = props as { children?: ReactNode }
            const child = Array.isArray(children) ? children[0] : children
            const className =
              (child as { props?: { className?: string } } | undefined)?.props?.className ?? ""

            if (typeof className === "string" && className.includes("language-mermaid")) {
              const code = toText((child as { props?: { children?: ReactNode } }).props?.children)
              return <Mermaid chart={code.replace(/\n$/, "")} />
            }
            return <pre>{children}</pre>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
