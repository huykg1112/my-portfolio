import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SESSION_COOKIE, verifyToken } from "@/lib/auth"

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return NextResponse.json({ authed: verifyToken(token) })
}
