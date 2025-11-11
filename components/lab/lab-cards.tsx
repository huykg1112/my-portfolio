"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const items = [
  {
    title: "Experiment",
    description: "Test new technologies and innovative ideas in a safe environment",
  },
  {
    title: "Learn",
    description: "Continuous learning through hands-on experimentation and prototyping",
  },
  {
    title: "Share",
    description: "Open source contributions and knowledge sharing with the community",
  },
]

export default function LabCards() {
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
          {items.map((item) => (
            <motion.div key={item.title} variants={cardVariants}>
              <motion.div className="group relative bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 shadow-purple-glow h-full" whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(167, 85, 240, 0.5)" }}>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" transition={{ duration: 0.3 }} />

                <div className="relative space-y-4">
                  <motion.h3 className="text-2xl font-bold text-foreground" whileHover={{ x: 5 }}>
                    {item.title}
                  </motion.h3>
                  <motion.p className="text-foreground leading-relaxed">{item.description}</motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
