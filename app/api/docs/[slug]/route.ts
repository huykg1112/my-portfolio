import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"

type Ctx = { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params
  try {
    const doc = await prisma.doc.findUnique({ where: { slug } })
    if (!doc || (!doc.published && !(await isAdmin()))) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ doc })
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
  }
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await params
  const body = await req.json().catch(() => ({}))
  const { title, summary, imgUrl, tags, content, published } = body as Record<string, unknown>

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  try {
    const doc = await prisma.doc.update({
      where: { slug },
      data: {
        title: title.trim(),
        summary: typeof summary === "string" ? summary.trim() : "",
        imgUrl: typeof imgUrl === "string" ? imgUrl.trim() : "",
        tags: Array.isArray(tags) ? tags.map(String).map((t) => t.trim()).filter(Boolean) : [],
        content: typeof content === "string" ? content : "",
        published: typeof published === "boolean" ? published : true,
      },
    })
    return NextResponse.json({ slug: doc.slug })
  } catch {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await params
  try {
    await prisma.doc.delete({ where: { slug } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
