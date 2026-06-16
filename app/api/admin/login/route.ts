import { NextRequest, NextResponse } from "next/server"
import { ADMIN_PASSWORD, SESSION_COOKIE, MAX_AGE, createToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const password = (body as { password?: unknown }).password

  if (typeof password !== "string" || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  })
  return res
}
