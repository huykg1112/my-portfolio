"use client"

import { useEffect, useState } from "react"
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react"

export type Field = {
  name: string
  label: string
  type: "text" | "textarea" | "tags" | "bool" | "number" | "select"
  options?: string[]
}

type Item = Record<string, unknown> & { id: string }

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

export default function ResourceManager({
  title,
  endpoint,
  fields,
  primaryField,
}: {
  title: string
  endpoint: string
  fields: Field[]
  primaryField: string
}) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | "new" | null>(null)
  const [form, setForm] = useState<Record<string, string | boolean>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const r = await fetch(endpoint, { cache: "no-store" })
      const j = await r.json()
      setItems(Array.isArray(j.items) ? j.items : [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint])

  const emptyForm = () => {
    const f: Record<string, string | boolean> = {}
    for (const field of fields) f[field.name] = field.type === "bool" ? false : ""
    return f
  }

  const openNew = () => {
    setForm(emptyForm())
    setError(null)
    setEditing("new")
  }

  const openEdit = (item: Item) => {
    const f: Record<string, string | boolean> = {}
    for (const field of fields) {
      const v = item[field.name]
      if (field.type === "bool") f[field.name] = Boolean(v)
      else if (field.type === "tags") f[field.name] = Array.isArray(v) ? v.join(", ") : String(v ?? "")
      else f[field.name] = v == null ? "" : String(v)
    }
    setForm(f)
    setError(null)
    setEditing(item.id)
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    const isNew = editing === "new"
    const url = isNew ? endpoint : `${endpoint}/${editing}`
    try {
      const r = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!r.ok) {
        const j = await r.json().catch(() => ({}))
        throw new Error(j.error ?? "Failed to save")
      }
      setEditing(null)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item: Item) => {
    if (!confirm(`Delete "${String(item[primaryField])}"?`)) return
    try {
      await fetch(`${endpoint}/${item.id}`, { method: "DELETE" })
      await load()
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.length === 0 && <li className="p-4 text-sm text-muted-foreground">No items yet.</li>}
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 p-3">
              <span className="truncate text-sm font-medium text-foreground">{String(item[primaryField])}</span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  aria-label="Edit"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(item)}
                  aria-label="Delete"
                  className="rounded-md p-1.5 text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Editor panel */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-card p-6 shadow-lg sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {editing === "new" ? `New ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.map((field) => {
                const value = form[field.name]
                const span = field.type === "textarea" ? "sm:col-span-2" : ""
                return (
                  <div key={field.name} className={span}>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">{field.label}</label>
                    {field.type === "bool" ? (
                      <label className="inline-flex items-center gap-2 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.checked }))}
                          className="h-4 w-4 rounded border-border"
                        />
                        {field.label}
                      </label>
                    ) : field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={String(value ?? "")}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                        className={`${input} resize-y`}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={String(value ?? "")}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                        className={input}
                      >
                        {(field.options ?? []).map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        value={String(value ?? "")}
                        onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                        placeholder={field.type === "tags" ? "comma, separated" : undefined}
                        className={input}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
