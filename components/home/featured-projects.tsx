"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import projects from "@/data/featured-projects.json";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProjects() {
  const { ref, isVisible } = useScrollReveal();

  // projects are imported from data/featured-projects.json

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-24">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              idx === 1 ? "lg:grid-flow-dense" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            {/* Project Card / Mockup */}
            <motion.div className={idx === 1 ? "lg:col-start-2" : ""}>
              <motion.div
                className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 backdrop-blur-sm border border-border aspect-video flex items-center justify-center shadow-purple-glow overflow-hidden group cursor-pointer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 50px rgba(167, 85, 240, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Link href={project.link || "#"}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />{" "}
                </Link>
                <motion.div
                  className="text-center space-y-4 relative z-10"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-28 h-28 bg-border rounded flex items-center justify-center mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png"
                      alt="Logo"
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </motion.div>
                  <p className="text-muted-foreground text-sm">
                    Project Preview
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Project Info */}
            <motion.div
              className={`space-y-6 ${idx === 1 ? "lg:col-start-1" : ""}`}
              variants={{
                hidden: { opacity: 0, x: idx === 1 ? 40 : -40 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: idx * 0.2 + 0.2 }}
            >
              <div className="space-y-2">
                <motion.p
                  className="text-sm text-primary uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: idx * 0.2 + 0.4 }}
                >
                  {project.sub || "Featured Project"}
                </motion.p>
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-foreground"
                  whileHover={{ x: 5 }}
                >
                  {project.title}
                </motion.h3>
              </div>

              <motion.div
                className="bg-secondary/50 backdrop-blur rounded-lg p-6 border border-border shadow-purple-glow hover:shadow-purple-glow-hover"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(167, 85, 240, 0.4)",
                }}
              >
                <p className="text-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: idx * 0.2 + 0.5 }}
              >
                <motion.span
                  className="text-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {project.badge}
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
