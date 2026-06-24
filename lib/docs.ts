import { prisma } from "./prisma"

export type Doc = {
  slug: string
  title: string
  summary: string
  imgUrl: string
  tags: string[]
  content: string
  published: boolean
  updatedAt: Date
}

export type DocInput = {
  title: string
  summary: string
  imgUrl: string
  tags: string[]
  content: string
  published: boolean
}

const SELECT = {
  slug: true,
  title: true,
  summary: true,
  imgUrl: true,
  tags: true,
  content: true,
  published: true,
  updatedAt: true,
} as const

/** Fallback sample docs shown when no database is configured yet. */
const SEED: Doc[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting started with Next.js App Router",
    summary: "Notes on routing, server components and data fetching in the App Router.",
    imgUrl: "",
    tags: ["Next.js", "React"],
    published: true,
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
`,
  },
  {
    slug: "css-grid-cheatsheet",
    title: "CSS Grid cheatsheet",
    summary: "The grid properties I always forget, in one place.",
    imgUrl: "",
    tags: ["CSS"],
    published: true,
    updatedAt: new Date("2025-05-20"),
    content: `# CSS Grid cheatsheet

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
\`\`\`
`,
  },
]

export async function getDocs(opts?: { includePrivate?: boolean }): Promise<Doc[]> {
  try {
    return await prisma.doc.findMany({
      where: opts?.includePrivate ? undefined : { published: true },
      orderBy: { updatedAt: "desc" },
      select: SELECT,
    })
  } catch {
    return opts?.includePrivate ? SEED : SEED.filter((d) => d.published)
  }
}

export async function getDoc(slug: string): Promise<Doc | null> {
  try {
    return await prisma.doc.findUnique({ where: { slug }, select: SELECT })
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
