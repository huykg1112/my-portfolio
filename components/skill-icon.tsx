"use client"

import { useState } from "react"

export default function SkillIcon({ src, name }: { src?: string; name: string }) {
  const [broken, setBroken] = useState(false)
  const showImg = src && !broken

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-5 w-5 object-contain"
        />
      ) : (
        <span className="text-sm font-bold text-zinc-700">{name.slice(0, 1).toUpperCase()}</span>
      )}
    </span>
  )
}
