"use client"

import { useCallback, useEffect, useState } from "react"

export function useAdmin() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/me", { cache: "no-store" })
      const j = await r.json()
      setAuthed(Boolean(j.authed))
    } catch {
      setAuthed(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (password: string) => {
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (r.ok) {
      setAuthed(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthed(false)
  }, [])

  return { authed, loading, login, logout, refresh }
}
