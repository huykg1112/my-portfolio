"use client"

import { motion } from "framer-motion"
import projects from "@/data/real-projects.json"

export default function LabHero() {

  return (
    <section className="min-h-screen flex items-start pt-32 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            Real projects I've worked on
          </motion.h1>

          <motion.p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Below are a selection of real products I've worked on with cross-functional teams — contributing as a frontend engineer, fullstack developer, or technical lead depending on the project. Each entry lists the role, core technologies, and measurable impact.
          </motion.p>

          <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.name}
                className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ translateY: -6 }}
              >
                <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                <div className="text-sm text-muted-foreground mt-1">{p.period} • {p.role}</div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-foreground/80">
                    <strong>Tech:</strong> {p.tech.join(", ")}
                  </div>
                  <span className="text-sm text-primary font-medium">{p.impact}</span>
                </div>

                <a
                  href={p.link}
                  className="inline-block mt-4 text-sm text-primary hover:underline"
                  aria-label={`View details for ${p.name}`}
                >
                  View details →
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
