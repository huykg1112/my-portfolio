"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function AboutStory() {
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
          My Story
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 text-foreground leading-relaxed"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.p className="text-lg" variants={itemVariants}>
              I&apos;m a final-year Software Engineering student at Can Tho University (GPA: 3.55/4.0) with hands-on 
              experience as a Front-End and Full-Stack Developer in real-world projects.
            </motion.p>
            <motion.p className="text-lg" variants={itemVariants}>
              Skilled in ReactJS, Next.js, NestJS, and PostgreSQL, I focus on building scalable, user-friendly web 
              applications. I&apos;ve worked on projects ranging from e-commerce platforms to AI-powered diagnostic systems.
            </motion.p>
            <motion.p className="text-lg" variants={itemVariants}>
              Currently enhancing my technical expertise and English communication skills, my goal is to become a 
              professional Front-End Developer, continuously improving with modern web tools and best practices.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl overflow-hidden shadow-purple-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(167, 85, 240, 0.6)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}>
                💻
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
