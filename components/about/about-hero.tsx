"use client"

import { motion } from "framer-motion"

export default function AboutHero() {
  return (
    <section className="min-h-screen flex items-center pt-32 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-5xl md:text-7xl font-extrabold text-foreground" whileHover={{ scale: 1.02 }}>
            About Me
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Final-year Software Engineering student at Can Tho University with hands-on experience in real-world projects 
            as a Front-End and Full-Stack Developer. Building scalable, user-friendly web applications with modern technologies.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
