import { prisma } from "./prisma"

export type Doc = {
  slug: string
  title: string
  summary: string
  tags: string[]
  content: string
  updatedAt: Date
}

export type DocInput = {
  title: string
  summary: string
  tags: string[]
  content: string
}

/** Fallback sample docs shown when no database is configured yet. */
const SEED: Doc[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting started with Next.js App Router",
    summary: "Notes on routing, server components and data fetching in the App Router.",
    tags: ["Next.js", "React"],
    updatedAt: new Date("2025-06-04"),
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

| Feature | Server | Client |
| --- | --- | --- |
| async/await | ✅ | ❌ |
| useState | ❌ | ✅ |
`,
  },
  {
    slug: "css-grid-cheatsheet",
    title: "CSS Grid cheatsheet",
    summary: "The grid properties I always forget, in one place.",
    tags: ["CSS"],
    updatedAt: new Date("2025-05-20"),
    content: `# CSS Grid cheatsheet

A quick reference for layout work.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
\`\`\`

- \`place-items: center\` -> center children on both axes.
- \`grid-column: 1 / -1\` -> span the full row.
`,
  },
]

export async function getDocs(): Promise<Doc[]> {
  try {
    return await prisma.doc.findMany({
      orderBy: { updatedAt: "desc" },
      select: { slug: true, title: true, summary: true, tags: true, content: true, updatedAt: true },
    })
  } catch {
    return SEED
  }
}

export async function getDoc(slug: string): Promise<Doc | null> {
  try {
    return await prisma.doc.findUnique({
      where: { slug },
      select: { slug: true, title: true, summary: true, tags: true, content: true, updatedAt: true },
    })
  } catch {
    return SEED.find((d) => d.slug === slug) ?? null
  }
}

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "untitled"
  )
}
