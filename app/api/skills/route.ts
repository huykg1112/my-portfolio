import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import { mapSkillInput, revalidateContent } from "@/lib/admin-helpers"

export async function GET() {
  try {
    const items = await prisma.skill.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = mapSkillInput(await req.json().catch(() => ({})))
  if (!data.name) return NextResponse.json({ error: "Name is required" }, { status: 400 })

  try {
    const item = await prisma.skill.create({ data })
    revalidateContent()
    return NextResponse.json({ item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create skill (name may already exist)" }, { status: 500 })
  }
}
