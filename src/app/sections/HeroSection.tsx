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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const roninY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const roninOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Pravaat Chhetri — Software Engineer & Full Stack Developer"
    >
      {/* SEO landmark: visible to crawlers and screen readers, hidden visually */}
      <h1 className="sr-only">
        Pravaat Chhetri — Software Engineer, AI Engineer &amp; Full Stack
        Developer based in Thimphu, Bhutan. IT Officer at Bhutan National Bank.
        Available for freelance Next.js, React Native, TypeScript, and
        enterprise software projects.
      </h1>
      {/* ── Layer 1: hero-bg.png — deep background, slowest ── */}
      <motion.div
        style={{ y: bgY, top: "-15%", left: 0, right: 0, bottom: "-15%" }}
        className="absolute z-0 pointer-events-none"
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* ── Layer 2: ronin cutout — mid layer, faster ── */}
      {/* Hidden on small phones, visible from sm up, positioned right on tablet+ */}
      <motion.div
        style={{ y: roninY, opacity: roninOpacity }}
        className="absolute z-[1] pointer-events-none
          block
          bottom-0 left-1/2 -translate-x-1/2
          sm:left-auto sm:translate-x-0 sm:right-0
          w-[90vw] sm:w-[52vw] md:w-[52vw] lg:w-[52vw] xl:w-[48vw]
          h-[80%] sm:h-[90%] md:h-[100%]"
      >
        <Image
          src="/ronin.png"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 115vw, (max-width: 768px) 115vw, 115vw"
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* ── Content — left-aligned on tablet+, centered on mobile ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24
          text-center sm:text-left
          max-w-none sm:max-w-[60%] md:max-w-[55%] lg:max-w-[50%]
          sm:ml-0"
      >
        {/* Name tag — visible on mobile only */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-label text-[14px] md:text-[20px] tracking-[0.3em] text-neutral-100 uppercase mb-4 "
        >
          PRAVAAT CHHETRI
        </motion.p>

        {/* Main title */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-headline font-black text-glow uppercase leading-[0.85] tracking-tighter text-white
              text-[17vw]
              xs:text-[15vw]
              sm:text-[11vw]
              md:text-[9vw]
              lg:text-[8rem]
              xl:text-[9rem]"
          >
            DIGITAL
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="font-headline font-black text-glow uppercase leading-[0.85] tracking-tighter text-white
              text-[17vw]
              xs:text-[15vw]
              sm:text-[11vw]
              md:text-[9vw]
              lg:text-[8rem]
              xl:text-[9rem]"
          >
            RONIN
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-label text-zinc-400 tracking-widest uppercase mt-5 mb-10 text-[10px] sm:text-xs md:text-sm"
        >
          Engineering precision in the void
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex justify-center sm:justify-start"
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-3
              border border-white/20 px-6 py-4 sm:px-8 sm:py-4 md:px-10 md:py-5
              text-xs sm:text-sm
              hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="font-headline tracking-widest uppercase">
              Enter the Archive
            </span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — tucked up on short screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-label text-[9px] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ height: [0, 48, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-white/50"
        />
      </motion.div>

      {/* Side label — desktop only */}
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
