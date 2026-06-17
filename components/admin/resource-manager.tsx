"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react"
import ResourceForm from "@/components/admin/resource-form"
import type { Field, ResourceValues } from "@/components/admin/types"

type Item = Record<string, unknown> & { id: string }

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
  const qc = useQueryClient()
  const [editing, setEditing] = useState<Item | "new" | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const { data: items = [], isLoading } = useQuery<Item[]>({
    queryKey: [endpoint],
    queryFn: () =>
      fetch(endpoint, { cache: "no-store" })
        .then((r) => r.json())
        .then((j) => (Array.isArray(j.items) ? j.items : [])),
  })

  const saveMutation = useMutation({
    mutationFn: async (values: ResourceValues) => {
      const isNew = editing === "new"
      const url = isNew ? endpoint : `${endpoint}/${(editing as Item).id}`
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error ?? "Failed to save")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [endpoint] })
      setEditing(null)
      setFormError(null)
    },
    onError: (e) => setFormError(e instanceof Error ? e.message : "Failed to save"),
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [endpoint] }),
  })

  const buildDefaults = (item: Item | "new"): ResourceValues => {
    const v: ResourceValues = {}
    for (const f of fields) {
      if (item === "new") {
        v[f.name] = f.type === "bool" ? false : f.type === "number" ? 0 : f.type === "select" ? f.options?.[0] ?? "" : ""
      } else {
        const raw = item[f.name]
        v[f.name] =
          f.type === "bool"
            ? Boolean(raw)
            : f.type === "number"
            ? Number(raw ?? 0)
            : f.type === "tags"
            ? Array.isArray(raw) ? raw.join(", ") : String(raw ?? "")
            : raw == null ? "" : String(raw)
      }
    }
    return v
  }

  const open = (item: Item | "new") => {
    setFormError(null)
    setEditing(item)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        <button
          type="button"
          onClick={() => open("new")}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {isLoading ? (
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
                  onClick={() => open(item)}
                  aria-label="Edit"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete "${String(item[primaryField])}"?`)) deleteMutation.mutate(item.id)
                  }}
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

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-card p-6 shadow-lg sm:rounded-2xl">
            <div className="mb-4 flex items-center justify-between">
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

            <ResourceForm
              key={editing === "new" ? "new" : editing.id}
              fields={fields}
              defaultValues={buildDefaults(editing)}
              onSubmit={(values) => saveMutation.mutate(values)}
              onCancel={() => setEditing(null)}
              submitting={saveMutation.isPending}
              serverError={formError}
            />
          </div>
        </div>
      )}
    </div>
  )
}
