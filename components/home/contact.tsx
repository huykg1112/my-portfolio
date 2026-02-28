"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import dynamic from "next/dynamic"

// bundle-dynamic-imports: load heavy form only when Contact section enters viewport
const ContactForm = dynamic(() => import("./contact-form"), {
  loading: () => (
    <div className="space-y-5 animate-pulse">
      {[120, 80, 120, 160, 48].map((h, i) => (
        <div key={i} className={`h-${h === 120 ? "12" : h === 80 ? "10" : h === 160 ? "32" : "12"} rounded-lg bg-secondary/40`} />
      ))}
    </div>
  ),
})

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
          className="text-4xl md:text-5xl font-bold text-foreground text-wrap-balance"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left – Info */}
          <motion.div
            className="space-y-6"
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
              className="text-primary text-lg font-semibold shadow-purple-glow inline-block hover:text-accent transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              huyth.dev@gmail.com
            </motion.a>

            {/* Social Links */}
            <motion.div className="flex gap-4 pt-2" variants={itemVariants}>
              {[
                { icon: "🐱‍👤", label: "GitHub", href: "https://github.com/huykg1112", external: true },
                { icon: "FB", label: "Facebook", href: "https://www.facebook.com/tran.huy.113299/", external: true },
                { icon: "📱", label: "Phone: 0334114244", href: "tel:+84334114244", external: false },
              ].map((social) => (
                <motion.div key={social.label} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg border border-border shadow-purple-glow flex items-center justify-center transition-colors hover:border-primary font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <span className="text-lg" aria-hidden="true">{social.icon}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

