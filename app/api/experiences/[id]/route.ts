import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import { mapExperienceInput, revalidateContent } from "@/lib/admin-helpers"

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const data = mapExperienceInput(await req.json().catch(() => ({})))
  if (!data.company || !data.role) return NextResponse.json({ error: "Company and role are required" }, { status: 400 })

  try {
    const item = await prisma.experience.update({ where: { id }, data })
    revalidateContent()
    return NextResponse.json({ item })
  } catch {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  try {
    await prisma.experience.delete({ where: { id } })
    revalidateContent()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 })
  }
}
