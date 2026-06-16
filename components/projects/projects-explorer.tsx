"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import ProjectCard from "@/components/projects/project-card"
import type { Project } from "@/lib/content"

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion()
  const tags = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return ["All", ...Array.from(set).sort()]
  }, [projects])

  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter((p) => p.tags.includes(active))

  return (
    <div>
      <div role="tablist" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = tag === active
          return (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(tag)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
