export type Field = {
  name: string
  label: string
  type: "text" | "textarea" | "tags" | "bool" | "number" | "select"
  options?: string[]
  required?: boolean
}

export type ResourceValues = Record<string, string | number | boolean>
