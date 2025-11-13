"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import timeline from "@/data/timeline.json";

export default function AboutTimeline() {
  const { ref, isVisible } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Journey Timeline
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {timeline.map((item, idx) => (
            <motion.div key={item.id} variants={itemVariants}>
              <motion.div
                className="relative flex gap-6 pb-8 border-l-2 border-primary/30 pl-6"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full -translate-x-1.5 shadow-purple-glow"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: idx * 0.2,
                  }}
                />

                <div className="space-y-2">
                  <motion.p
                    className="text-sm text-primary font-semibold uppercase"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.year}
                  </motion.p>
                  <motion.h3
                    className="text-xl font-semibold text-foreground"
                    whileHover={{ x: 5 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p className="text-muted-foreground">
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
