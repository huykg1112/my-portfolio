"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center pt-32 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <p className="text-sm text-muted-foreground">Hello! I am</p>
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-primary"
                whileHover={{ scale: 1.02 }}
              >
                Tran Hoang Huy
              </motion.h1>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <p className="text-sm text-muted-foreground">A Designer who</p>
              <h2 className="text-5xl md:text-7xl font-extrabold text-foreground">
                Judges a book <br /> by its{" "}
                <span className="text-primary">cover</span>...
              </h2>
              <p className="text-sm text-muted-foreground pt-2">
                Because if the cover does not impress you what else can?
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Avatar */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={
              isVisible
                ? { opacity: 1, scale: 1, x: 0 }
                : { opacity: 0, scale: 0.8, x: 50 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden shadow-purple-glow"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(167, 85, 240, 0.6)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="relative w-full h-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Image
                  src="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png"
                  alt="Avatar Image"
                  fill 
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Engineer Section */}
        <motion.div
          className="mt-20 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h3
            className="text-4xl md:text-5xl font-bold text-foreground"
            whileHover={{ x: 5 }}
          >
            I&apos;m a Software Engineer.|
          </motion.h3>
          <motion.p
            className="text-lg text-foreground leading-relaxed max-w-2xl"
            variants={itemVariants}
          >
            Currently, I&apos;m a Software Engineer at{" "}
            <motion.a
              href="#"
              className="text-primary hover:text-accent transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Teknix Corporation
            </motion.a>
            .
          </motion.p>
          <div className="space-y-4 text-foreground leading-relaxed max-w-3xl">
            <motion.p variants={itemVariants}>
              A self-taught UI/UX designer, functioning in the industry for 1+
              years now.
            </motion.p>
            <motion.p variants={itemVariants}>
              I make meaningful and delightful digital products that create an
              equilibrium <br />
              between user needs and business goals.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
