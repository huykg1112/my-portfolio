"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal()

  const techs = [
    { name: "Figma", icon: "🎨" },
    { name: "Design", icon: "⚙️" },
    { name: "Development", icon: "💻" },
    { name: "Analytics", icon: "📊" },
    { name: "Database", icon: "🗄️" },
    { name: "Deployment", icon: "🚀" },
    { name: "CI/CD", icon: "🔄" },
    { name: "Testing", icon: "🧪" },
    { name: "Monitoring", icon: "📈" },
    { name: "Security", icon: "🔒" },
    { name: "DevOps", icon: "🛠️" },
    { name: "Cloud", icon: "☁️" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-foreground text-lg">
            I&apos;m currently looking to join a <span className="text-primary font-semibold">cross-functional</span> team
          </p>
          <p className="text-muted-foreground">that values improving people&apos;s lives through accessible design</p>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {techs.map((tech, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <motion.div
                className="w-16 h-16 rounded-lg bg-secondary/50 border border-border shadow-purple-glow flex items-center justify-center text-2xl"
                title={tech.name}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(167, 85, 240, 0.4)",
                  backgroundColor: "rgb(30, 25, 50)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: Math.random() * 2 }}
                >
                  {tech.icon}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center Logo */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-white shadow-purple-glow"
              whileHover={{ scale: 1.1 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Σ
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
