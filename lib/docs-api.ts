import type { DocInput } from "@/lib/docs"

async function readError(res: Response): Promise<string> {
  try {
    const j = await res.json()
    return j.error ?? "Request failed"
  } catch {
    return "Request failed"
  }
}

export async function createDoc(input: DocInput): Promise<string> {
  const res = await fetch("/api/docs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await readError(res))
  const { slug } = await res.json()
  return slug
}

export async function updateDoc(slug: string, input: DocInput): Promise<string> {
  const res = await fetch(`/api/docs/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(await readError(res))
  const data = await res.json()
  return data.slug
}

export async function removeDoc(slug: string): Promise<void> {
  const res = await fetch(`/api/docs/${slug}`, { method: "DELETE" })
  if (!res.ok) throw new Error(await readError(res))
}
