"use client"

import { useCallback } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useAdmin() {
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["admin-me"],
    queryFn: () => fetch("/api/admin/me", { cache: "no-store" }).then((r) => r.json()),
    staleTime: 60_000,
  })

  const authed = Boolean(data?.authed)

  const login = useCallback(
    async (password: string) => {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (r.ok) {
        await qc.invalidateQueries({ queryKey: ["admin-me"] })
        return true
      }
      return false
    },
    [qc],
  )

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    await qc.invalidateQueries({ queryKey: ["admin-me"] })
  }, [qc])

  return { authed, loading: isLoading, login, logout }
}
