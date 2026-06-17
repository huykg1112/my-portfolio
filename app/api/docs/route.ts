import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/docs"
import { isAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const docs = await prisma.doc.findMany({ orderBy: { updatedAt: "desc" } })
    return NextResponse.json({ docs })
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { title, summary, imgUrl, tags, content } = body as Record<string, unknown>

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  try {
    const base = slugify(title)
    let slug = base
    let n = 2
    while (await prisma.doc.findUnique({ where: { slug } })) slug = `${base}-${n++}`

    const doc = await prisma.doc.create({
      data: {
        slug,
        title: title.trim(),
        summary: typeof summary === "string" ? summary.trim() : "",
        imgUrl: typeof imgUrl === "string" ? imgUrl.trim() : "",
        tags: Array.isArray(tags) ? tags.map(String).map((t) => t.trim()).filter(Boolean) : [],
        content: typeof content === "string" ? content : "",
      },
    })
    return NextResponse.json({ slug: doc.slug }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
