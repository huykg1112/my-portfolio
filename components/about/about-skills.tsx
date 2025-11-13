"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Image from "next/image"
import skills from "@/data/skills.json"

export default function AboutSkills() {
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
          {skills.map((skill, idx) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <motion.div
                className="group relative bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-6 shadow-purple-glow hover:shadow-purple-glow-hover overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(167, 85, 240, 0.5)",
                }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }} />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <motion.h3 className="text-xl font-semibold text-foreground flex items-center gap-3" whileHover={{ x: 5 }}>
                        <Image src={skill.icon} alt={skill.name} width={40} height={40} objectFit="cover" className="bg-white rounded-[5px]" />
                        {skill.name}
                      </motion.h3>
                    </div>
                    <motion.span
                      className="text-lg font-bold text-primary"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-primary to-accent" initial={{ width: 0 }} animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }} transition={{ duration: 1, delay: idx * 0.1 }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
