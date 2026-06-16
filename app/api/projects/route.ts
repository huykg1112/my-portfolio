import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/docs"
import { isAdmin } from "@/lib/auth"
import { mapProjectInput, revalidateContent } from "@/lib/admin-helpers"

export async function GET() {
  try {
    const items = await prisma.project.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = mapProjectInput(await req.json().catch(() => ({})))
  if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  try {
    const base = slugify(data.title)
    let slug = base
    let n = 2
    while (await prisma.project.findUnique({ where: { slug } })) slug = `${base}-${n++}`

    const item = await prisma.project.create({ data: { ...data, slug } })
    revalidateContent()
    return NextResponse.json({ item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
