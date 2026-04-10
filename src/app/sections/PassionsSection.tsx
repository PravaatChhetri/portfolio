"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/Animations";

const PASSIONS = [
  {
    title: "BHUTANESE HERITAGE",
    description:
      "Rooted in the traditions of the Thunder Dragon Kingdom. The discipline of Driglam Namzha — Bhutan's code of etiquette — informs every architectural decision. Precision as culture.",
    lineColor: "bg-white",
  },
  {
    title: "SYSTEM ARCHITECTURE",
    description:
      "Building digital cathedrals from the ground up. Designing for permanence, scalability, and structural integrity. Every deployment is a fortress.",
    lineColor: "bg-zinc-700",
  },
  {
    title: "OPEN SOURCE",
    description:
      "Contributing back to the ecosystem that made everything possible. From Docker configurations to Next.js patterns — knowledge shared is knowledge multiplied.",
    lineColor: "bg-zinc-800",
  },
];

export function PassionsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      className="py-48 px-8 md:px-12 relative overflow-hidden"
      id="passions"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, top: "-20%", left: 0, right: 0, bottom: "-20%" }}
        className="absolute z-0 pointer-events-none"
      >
        <Image
          src="/footer-bg.png"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <RevealOnScroll>
          <span className="font-label text-[12px] tracking-void text-zinc-500 uppercase mb-8 block">
            UNFILTERED EXPLORATION
          </span>
          <h2 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter uppercase text-white mb-24 text-glow">
            BEYOND THE CODE
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left"
          staggerDelay={0.15}
        >
          {PASSIONS.map((passion) => (
            <StaggerItem key={passion.title}>
              <div className="space-y-6">
                <div className={`w-12 h-1 ${passion.lineColor} mb-8`} />
                <h4 className="font-headline text-2xl font-bold uppercase text-white">
                  {passion.title}
                </h4>
                <p className="font-body text-zinc-400 leading-relaxed italic">
                  {passion.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
