"use client";


import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import navLinks from "@/data/navigation.json";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

        {/* Navigation Links (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link, idx) => {
            // Determine if the current link is active
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`text-lg transition relative group sm:text-2xl ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
        {/* CV Download CTA (hidden on mobile) */}
        <motion.div className="hidden sm:flex items-center">
          <motion.a
            href="/TranHoangHuy-SoftwareEngineer.pdf"
            download
            className="ml-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-background font-semibold hover:brightness-95 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Download CV"
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Mobile menu button (right) */}
        <div className="sm:hidden ml-2">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-secondary/30 transition"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {/* Mobile Sidebar (overlay + panel) */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              <motion.aside
                className="fixed right-0 top-0 h-screen w-72 bg-background/80 backdrop-blur-md z-50 border-r border-border shadow-2xl p-6"
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src="https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="font-bold text-lg text-foreground">Menu</span>
                  </div>
                  <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-secondary/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <nav className="flex flex-col gap-4 justify-center items-center">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`py-2 px-3 text-lg font-medium rounded-md transition ${
                          isActive
                            ? "bg-primary/20 text-primary font-bold"
                            : "text-foreground hover:text-primary hover:bg-secondary/30"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  <a href="/TranHoangHuy-SoftwareEngineer-VC.pdf" download className="mt-4 inline-block px-4 py-2 rounded-md bg-primary text-background font-semibold hover:brightness-95 transition">
                    Download CV
                  </a>
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
