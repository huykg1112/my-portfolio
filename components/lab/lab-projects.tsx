"use client"

import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const experiments = [
  {
    id: 1,
    title: "AI Chat Interface",
    description: "Interactive chatbot with natural language processing and real-time responses",
    tags: ["React", "OpenAI", "WebSocket"],
    icon: "🤖",
    status: "Active",
  },
  {
    id: 2,
    title: "3D Data Visualization",
    description: "Three.js powered interactive data visualization dashboard",
    tags: ["Three.js", "D3.js", "WebGL"],
    icon: "📊",
    status: "Active",
  },
  {
    id: 3,
    title: "Motion Design System",
    description: "Component library with advanced motion and interaction patterns",
    tags: ["Framer Motion", "Storybook", "TypeScript"],
    icon: "✨",
    status: "Active",
  },
  {
    id: 4,
    title: "Real-time Collaboration",
    description: "WebRTC powered collaborative document editor with live cursors",
    tags: ["WebRTC", "Operational Transform", "Node.js"],
    icon: "🚀",
    status: "Experimental",
  },
  {
    id: 5,
    title: "ML Model Playground",
    description: "Interactive playground for testing machine learning models in browser",
    tags: ["TensorFlow.js", "React", "Python"],
    icon: "🧠",
    status: "Experimental",
  },
  {
    id: 6,
    title: "Generative Art Tool",
    description: "Browser-based tool for creating generative art with algorithms",
    tags: ["Canvas API", "P5.js", "Algorithms"],
    icon: "🎨",
    status: "Active",
  },
]

export default function LabProjects() {
  const { ref, isVisible } = useScrollReveal()

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h2 className="text-4xl md:text-5xl font-bold text-foreground" initial={{ opacity: 0, x: -30 }} animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ duration: 0.6 }}>
          Experiments & Projects
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
          {experiments.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <motion.div className="group relative bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-6 overflow-hidden shadow-purple-glow h-full flex flex-col cursor-pointer" whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(167, 85, 240, 0.6)" }} transition={{ duration: 0.3 }}>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100" transition={{ duration: 0.3 }} />

                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div className="text-4xl" animate={{ rotate: 360, y: [0, -5, 0] }} transition={{ rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, y: { duration: 3, repeat: Number.POSITIVE_INFINITY } }}>
                      {project.icon}
                    </motion.div>
                    <motion.span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.status === "Active" ? "bg-primary/30 text-primary" : "bg-accent/30 text-accent"}`} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                      {project.status}
                    </motion.span>
                  </div>

                  <motion.h3 className="text-xl font-semibold text-foreground mb-2" whileHover={{ x: 5 }}>
                    {project.title}
                  </motion.h3>
                  <motion.p className="text-sm text-muted-foreground mb-6 flex-grow">{project.description}</motion.p>

                  <motion.div className="flex flex-wrap gap-2 pt-4 border-t border-primary/20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    {project.tags.map((tag) => (
                      <motion.span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded" whileHover={{ scale: 1.1, backgroundColor: "rgba(167, 85, 240, 0.3)" }}>
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.button className="mt-6 text-sm uppercase tracking-widest text-primary font-semibold" whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.95 }}>
                    View Project →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
