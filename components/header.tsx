"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-purple-glow">
      <motion.nav
        className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="text-2xl font-bold text-primary">
            <Image
              src="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/lab", label: "Lab" },
          ].map((link, idx) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
            >
              <Link
                href={link.href}
                className=" text-lg text-foreground hover:text-primary transition relative group sm:text-2xl"
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </header>
  );
}
