"use client"

import { useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Lock, Loader2 } from "lucide-react"
import { useAdmin } from "@/lib/use-admin"

export default function AdminGate({ children }: { children: ReactNode }) {
  const t = useTranslations("Docs")
  const { authed, loading, login } = useAdmin()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    )
  }

  if (authed) return <>{children}</>

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const ok = await login(password)
    if (!ok) setError(t("wrongPassword"))
    setSubmitting(false)
  }

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8 text-center">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-primary">
        <Lock className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{t("adminOnly")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("adminDesc")}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3 text-left">
        <label htmlFor="admin-password" className="sr-only">{t("password")}</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password")}
          aria-invalid={!!error}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !password}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("unlock")}
        </button>
      </form>
    </div>
  )
}
