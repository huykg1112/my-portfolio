"use client"

import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import type { Field, ResourceValues } from "@/components/admin/types"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

function buildSchema(fields: Field[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const f of fields) {
    if (f.type === "bool") shape[f.name] = z.boolean()
    else if (f.type === "number") shape[f.name] = z.coerce.number().int()
    else if (f.required) shape[f.name] = z.string().trim().min(1, `${f.label} is required`)
    else shape[f.name] = z.string()
  }
  return z.object(shape)
}

export default function ResourceForm({
  fields,
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  serverError,
}: {
  fields: Field[]
  defaultValues: ResourceValues
  onSubmit: (values: ResourceValues) => void
  onCancel: () => void
  submitting: boolean
  serverError?: string | null
}) {
  const schema = useMemo(() => buildSchema(fields), [fields])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResourceValues>({
    // dynamic schema built from field config → loose resolver typing on purpose
    resolver: zodResolver(schema) as never,
    defaultValues: defaultValues as ResourceValues,
  })

  return (
    <form onSubmit={handleSubmit((v) => onSubmit(v as ResourceValues))}>
      {serverError && (
        <p role="alert" className="mb-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => {
          const err = errors[field.name]?.message as string | undefined
          const span = field.type === "textarea" ? "sm:col-span-2" : ""
          return (
            <div key={field.name} className={span}>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">{field.label}</label>
              {field.type === "bool" ? (
                <label className="inline-flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" {...register(field.name)} className="h-4 w-4 rounded border-border" />
                  {field.label}
                </label>
              ) : field.type === "textarea" ? (
                <textarea rows={3} {...register(field.name)} className={`${input} resize-y`} />
              ) : field.type === "select" ? (
                <select {...register(field.name)} className={input}>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.type === "tags" ? "comma, separated" : undefined}
                  {...register(field.name)}
                  className={input}
                />
              )}
              {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </button>
      </div>
    </form>
  )
}
