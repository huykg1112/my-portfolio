import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import { mapExperienceInput, revalidateContent } from "@/lib/admin-helpers"

export async function GET() {
  try {
    const items = await prisma.experience.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = mapExperienceInput(await req.json().catch(() => ({})))
  if (!data.company || !data.role) return NextResponse.json({ error: "Company and role are required" }, { status: 400 })

  try {
    const item = await prisma.experience.create({ data })
    revalidateContent()
    return NextResponse.json({ item }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 })
  }
}
