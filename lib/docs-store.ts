"use client"

import { useSyncExternalStore } from "react"

/**
 * MOCK docs store backed by localStorage.
 * Swap this module for API/DB calls when the backend lands — the components
 * only depend on the exported types and hooks.
 */

export type Doc = {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
  updatedAt: number
}

const KEY = "thh-docs-v1"

const SEED: Doc[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting started with Next.js App Router",
    summary: "Notes on routing, server components and data fetching in the App Router.",
    tags: ["Next.js", "React"],
    updatedAt: 1749000000000,
    content: `# Next.js App Router — study notes

The **App Router** brings React Server Components to Next.js. Here's what stuck with me.

## Server vs Client components

- Components are **server** by default — they can be \`async\` and fetch data directly.
- Add \`"use client"\` only when you need state, effects or browser APIs.

\`\`\`tsx
// app/page.tsx — a server component
export default async function Page() {
  const data = await getData()
  return <main>{data.title}</main>
}
\`\`\`

## Data fetching

> Fetch where you use it. Next dedupes identical requests in one render pass.

1. Co-locate \`fetch\` in the component that needs it.
2. Use \`revalidate\` for ISR.
3. Reach for a client component only for interactivity.

| Feature | Server | Client |
| --- | --- | --- |
| async/await | ✅ | ❌ |
| useState | ❌ | ✅ |
| direct DB access | ✅ | ❌ |
`,
  },
  {
    slug: "css-grid-cheatsheet",
    title: "CSS Grid cheatsheet",
    summary: "The grid properties I always forget, in one place.",
    tags: ["CSS"],
    updatedAt: 1748000000000,
    content: `# CSS Grid cheatsheet

A quick reference for layout work.

## Defining a grid

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## Useful tricks

- \`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))\` → responsive cards with no media queries.
- \`place-items: center\` → center children on both axes.
- \`grid-column: 1 / -1\` → span the full row.
`,
  },
]

function read(): Doc[] {
  if (typeof window === "undefined") return SEED
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(SEED))
      return SEED
    }
    return JSON.parse(raw) as Doc[]
  } catch {
    return SEED
  }
}

let cache: Doc[] | null = null
const listeners = new Set<() => void>()

function getSnapshot(): Doc[] {
  if (cache === null) cache = read()
  return cache
}

function emit() {
  listeners.forEach((l) => l())
}

function commit(next: Doc[]) {
  cache = next.slice().sort((a, b) => b.updatedAt - a.updatedAt)
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(cache))
  }
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function useDocs(): Doc[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => SEED)
}

export function useDoc(slug: string): Doc | undefined {
  return useDocs().find((d) => d.slug === slug)
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export function saveDoc(input: { slug?: string; title: string; summary: string; tags: string[]; content: string }): string {
  const docs = getSnapshot()
  const slug = input.slug || ensureUnique(slugify(input.title) || "untitled", docs)
  const next: Doc = {
    slug,
    title: input.title.trim() || "Untitled",
    summary: input.summary.trim(),
    tags: input.tags.map((t) => t.trim()).filter(Boolean),
    content: input.content,
    updatedAt: Date.now(),
  }
  const rest = docs.filter((d) => d.slug !== slug)
  commit([next, ...rest])
  return slug
}

export function deleteDoc(slug: string) {
  commit(getSnapshot().filter((d) => d.slug !== slug))
}

function ensureUnique(base: string, docs: Doc[]): string {
  let slug = base
  let n = 2
  while (docs.some((d) => d.slug === slug)) slug = `${base}-${n++}`
  return slug
}
