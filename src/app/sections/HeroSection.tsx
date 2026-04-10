"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/ronin.png"
          alt=""
          fill
          priority
          className="object-cover object-center lg:object-top"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6"
      >
        {/* Main Title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-headline text-[12vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter uppercase text-white font-black text-glow"
          >
            DIGITAL
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="font-headline text-[12vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter uppercase text-white font-black text-glow"
          >
            SAMURAI
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-label text-zinc-400 tracking-void uppercase mt-6 mb-14 text-sm md:text-base"
        >
          Engineering precision in the void
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex justify-center"
        >
          <Link
            href="#projects"
            className="group flex items-center gap-4 border border-white/20 px-10 py-5 hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="font-headline tracking-widest uppercase text-sm">
              Enter the Archive
            </span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-label text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ height: [0, 64, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-white/50"
        />
      </motion.div>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-8 bottom-12 hidden lg:block"
      >
        <span className="font-label text-[10px] tracking-widest text-zinc-700 uppercase vertical-text">
          EST. 2020 // THIMPHU, BHUTAN
        </span>
      </motion.div>
    </section>
  );
}
