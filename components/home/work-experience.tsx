"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function WorkExperience() {
  const { ref, isVisible } = useScrollReveal()

  const experiences = [
    {
      id: 1,
      title: "CIB on the Mobile",
      description: "Led a digital transformation...",
      icon: "🚀",
    },
    {
      id: 2,
      title: "CIB on the Mobile",
      description: "Led a digital transformation...",
      icon: "🎨",
    },
    {
      id: 3,
      title: "CIB on the Mobile",
      description: "Led a digital transformation...",
      icon: "💻",
    },
    {
      id: 4,
      title: "CIB on the Mobile",
      description: "Led a digital transformation...",
      icon: "🔧",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
          Work Experience
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={cardVariants}>
              <motion.div
                className="group relative bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 overflow-hidden cursor-pointer h-full shadow-purple-glow"
                whileHover={{
                  scale: 1.05,
                  border: "1px solid rgb(167, 85, 240)",
                  boxShadow: "0 0 50px rgba(167, 85, 240, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={
                    isVisible
                      ? {
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }
                      : {}
                  }
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />

                <motion.div className="relative space-y-4" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <motion.h3 className="text-2xl md:text-3xl font-semibold text-foreground" whileHover={{ x: 5 }}>
                        {exp.title}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                    <motion.span
                      className="text-3xl md:text-4xl"
                      animate={{ rotate: 360, y: [0, -5, 0] }}
                      transition={{
                        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        y: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      {exp.icon}
                    </motion.span>
                  </div>
                  <motion.button
                    className="text-sm uppercase tracking-widest text-primary font-semibold"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    LEARN MORE
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
