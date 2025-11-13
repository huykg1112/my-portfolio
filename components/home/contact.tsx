"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Contact() {
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 lg:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-foreground"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <motion.div
          className="space-y-6 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.p className="text-foreground leading-relaxed" variants={itemVariants}>
            I&apos;m looking for opportunities to join a cross-functional team that values innovation and quality. <br />
            Have a project in mind or want to collaborate? Let&apos;s connect!
          </motion.p>

          <motion.a
            href="mailto:huyth.dev@gmail.com"
            className="text-primary text-lg font-semibold shadow-purple-glow inline-block"
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            huyth.dev@gmail.com
          </motion.a>

          {/* Social Links */}
          <motion.div className="flex gap-6 pt-4" variants={itemVariants}>
            {[
              { icon: "🐱‍👤", label: "GitHub", href: "https://github.com/huykg1112"},
              { icon: "FB", label: "Facebook", href: "https://www.facebook.com/tran.huy.113299/" },
              { icon: "📱", label: "Phone", href: "tel:0334114244" },
            ].map((social) => (
              <motion.div key={social.label}>
                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href={social.href}
                    target={social.label === "GitHub" ? "_blank" : undefined}
                    rel={social.label === "GitHub" ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-lg border border-border shadow-purple-glow flex items-center justify-center transition font-semibold text-sm"
                    title={social.label}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
