"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/work", label: "WORK", id: "work" },
  { href: "/intel", label: "INTEL", id: "intel" },
  { href: "/stack", label: "STACK", id: "stack" },
  { href: "/contact", label: "CONTACT", id: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "frosted-obsidian" : "bg-transparent"}`}>
        <div className="flex justify-between items-center w-full px-8 md:px-12 py-5 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter text-white font-headline uppercase">
              PROBOT
            </span>
          </Link>

          {/* Center Links — Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`font-headline tracking-tighter uppercase text-sm font-bold transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-white border-b-2 border-white pb-1"
                    : scrolled
                    ? "text-zinc-500 hover:text-zinc-200"
                    : "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_0_14px_rgba(255,255,255,1)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Resume Button — Desktop */}
          <div className="hidden md:block">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-on-primary font-headline font-bold px-6 py-2 tracking-tighter uppercase text-xs hover:bg-zinc-200 transition-all duration-100 active:bg-zinc-300"
            >
              RESUME
            </a>
          </div>

          {/* Hamburger — Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="block w-6 h-px bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-headline text-4xl font-black tracking-tighter uppercase ${
                      isActive(link.href) ? "text-white" : "text-zinc-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-block bg-white text-black font-headline font-bold px-8 py-4 tracking-tighter uppercase text-sm"
                >
                  DOWNLOAD RESUME
                </a>
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-12 left-8 right-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-label text-[10px] tracking-widest text-zinc-600 uppercase">
                    PRAVAAT CHHETRI
                  </p>
                  <p className="font-label text-[10px] tracking-widest text-zinc-700 uppercase mt-1">
                    THIMPHU, BHUTAN
                  </p>
                </div>
                <p className="font-label text-[10px] tracking-widest text-zinc-700 uppercase">
                  UTC+6
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
