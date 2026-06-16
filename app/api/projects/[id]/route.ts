import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import { mapProjectInput, revalidateContent } from "@/lib/admin-helpers"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const data = mapProjectInput(await req.json().catch(() => ({})))
  if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  try {
    const item = await prisma.project.update({ where: { id }, data })
    revalidateContent()
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  try {
    await prisma.project.delete({ where: { id } })
    revalidateContent()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
