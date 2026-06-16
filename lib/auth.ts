import crypto from "crypto"
import { cookies } from "next/headers"

/**
 * Minimal signed-cookie auth for the single site owner.
 * Set ADMIN_PASSWORD and ADMIN_SECRET in the environment; the defaults are for
 * local mock use only. Swap for a real provider later without touching the UI.
 */

const SECRET = process.env.ADMIN_SECRET || "dev-mock-secret-change-me"
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin"
export const SESSION_COOKIE = "admin_session"
export const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function createToken(): string {
  const exp = Date.now() + MAX_AGE * 1000
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url")
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url")
  return `${payload}.${sig}`
}

/** Server-side: is the current request authenticated as admin? */
export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return verifyToken(token)
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString())
    return typeof exp === "number" && exp > Date.now()
  } catch {
    return false
  }
}
