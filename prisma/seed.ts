import { prisma } from "../lib/prisma"
import {
  SEED_PROJECTS,
  SEED_EXPERIENCES,
  SEED_SKILLS,
  projectRow,
  experienceRow,
} from "../lib/content"

const docs = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting started with Next.js App Router",
    summary: "Notes on routing, server components and data fetching in the App Router.",
    tags: ["Next.js", "React"],
    content: `# Next.js App Router — study notes

The **App Router** brings React Server Components to Next.js.

## Server vs Client components

- Components are **server** by default — they can be \`async\` and fetch data directly.
- Add \`"use client"\` only when you need state, effects or browser APIs.
`,
  },
  {
    slug: "css-grid-cheatsheet",
    title: "CSS Grid cheatsheet",
    summary: "The grid properties I always forget, in one place.",
    tags: ["CSS"],
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

async function main() {
  for (const doc of docs) {
    await prisma.doc.upsert({ where: { slug: doc.slug }, update: doc, create: doc })
  }

  for (let i = 0; i < SEED_PROJECTS.length; i++) {
    const row = projectRow(SEED_PROJECTS[i], i)
    await prisma.project.upsert({ where: { slug: row.slug }, update: row, create: row })
  }

  await prisma.skill.deleteMany({})
  await prisma.skill.createMany({ data: SEED_SKILLS.map((s, i) => ({ ...s, order: i })) })

  await prisma.experience.deleteMany({})
  await prisma.experience.createMany({ data: SEED_EXPERIENCES.map((e, i) => experienceRow(e, i)) })

  console.log(
    `Seeded ${docs.length} docs, ${SEED_PROJECTS.length} projects, ${SEED_SKILLS.length} skills, ${SEED_EXPERIENCES.length} experiences.`,
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
