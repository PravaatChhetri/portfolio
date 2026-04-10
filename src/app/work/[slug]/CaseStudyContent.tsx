"use client";

import { Project } from "@/lib/notion";
import { NotionBlockRenderer } from "@/components/NotionBlockRenderer";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  ParallaxSection,
} from "@/components/Animations";
import { motion } from "framer-motion";
import Link from "next/link";

export function CaseStudyContent({
  project,
  blocks,
}: {
  project: Project;
  blocks: any[];
}) {
  return (
    <article className="min-h-screen bg-surface">
      {/* ─── HERO SECTION ─── */}
      <section className="min-h-[80vh] flex flex-col justify-end px-8 md:px-24 pb-24 pt-32 relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 70% 20%, rgba(40,40,40,0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 80%, rgba(20,20,20,0.6) 0%, transparent 60%),
                #131313
              `,
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="z-10 max-w-5xl">
          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-surface-container-highest px-3 py-1 font-label text-[10px] tracking-widest uppercase text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-5xl md:text-[7rem] lg:text-[9rem] font-headline font-black leading-[0.85] tracking-tighter uppercase mb-8"
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Specs Grid + Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12 border-t border-zinc-800/30 pt-12"
          >
            {/* Specs */}
            <div className="md:col-span-4">
              <span className="font-label text-zinc-500 text-[10px] tracking-blueprint uppercase mb-4 block">
                SPECIFICATIONS
              </span>
              <div className="space-y-2 font-headline text-base">
                {Object.entries(project.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-zinc-900 pb-2"
                  >
                    <span className="text-zinc-500 text-sm">{key}</span>
                    <span className="text-white text-sm font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-8">
              <p className="font-body text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── THE CHALLENGE ─── */}
      {project.challenge && (
        <section className="bg-surface-container-low py-32 px-8 md:px-24">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5">
              <RevealOnScroll>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-8">
                  THE_CHALLENGE
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-zinc-400 font-body text-lg leading-relaxed">
                  {project.challenge}
                </p>
              </RevealOnScroll>
            </div>

            {/* Architecture diagram placeholder */}
            <div className="md:col-span-7 flex items-center justify-center">
              <RevealOnScroll delay={0.2}>
                <div className="w-full max-w-md aspect-square relative">
                  {/* System diagram visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-zinc-800 flex items-center justify-center relative">
                      <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
                        {project.title}
                      </span>
                      {/* Connection nodes */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-label text-[9px] text-zinc-600 tracking-widest">
                        CORE
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-label text-[9px] text-zinc-600 tracking-widest">
                        MEM
                      </div>
                      <div className="absolute top-1/2 -left-8 -translate-y-1/2 font-label text-[9px] text-zinc-600 tracking-widest">
                        IO
                      </div>
                      <div className="absolute top-1/2 -right-8 -translate-y-1/2 font-label text-[9px] text-zinc-600 tracking-widest">
                        NET
                      </div>
                    </div>
                  </div>
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* ─── THE SOLUTION ─── */}
      {project.solution && (
        <section className="bg-surface py-32 px-8 md:px-24">
          <div className="max-w-[1440px] mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter uppercase">
                  THE_SOLUTION
                </h2>
                <p className="font-label text-[10px] tracking-widest text-zinc-600 uppercase mt-4 md:mt-0 max-w-xs text-right">
                  OPTIMIZED FOR HORIZONTAL SCALING AND LINEAR PERFORMANCE PREDICTABILITY
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <p className="text-zinc-400 font-body text-lg leading-relaxed max-w-3xl">
                {project.solution}
              </p>
            </RevealOnScroll>

            {/* Description from full content */}
            <RevealOnScroll delay={0.2}>
              <div className="mt-16 bg-surface-container-lowest p-8 border border-zinc-800/30">
                <p className="font-body text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─── METRICS ─── */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="bg-surface-container-low py-32 px-8 md:px-24">
          <div className="max-w-[1440px] mx-auto">
            <RevealOnScroll>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-20">
                SYSTEM_PERFORMANCE
              </h2>
            </RevealOnScroll>

            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-16"
              staggerDelay={0.15}
            >
              {project.metrics.map((metric) => (
                <StaggerItem key={metric.label}>
                  <div>
                    <span className="font-label text-[10px] tracking-widest text-zinc-600 uppercase block mb-4">
                      {metric.label}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <AnimatedCounter
                        value={metric.value}
                        className="font-headline text-5xl md:text-7xl font-black text-white tracking-tighter"
                      />
                      <span className="font-label text-zinc-500 text-sm tracking-widest uppercase">
                        {metric.unit}
                      </span>
                    </div>
                    <p className="font-body text-zinc-600 text-sm mt-4">
                      {metric.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ─── NOTION CONTENT BLOCKS ─── */}
      {blocks.length > 0 && (
        <section className="bg-surface py-32 px-8 md:px-24">
          <div className="max-w-[900px] mx-auto">
            <NotionBlockRenderer blocks={blocks} />
          </div>
        </section>
      )}

      {/* ─── LINKS & CTA ─── */}
      <section className="bg-surface-container-lowest py-24 px-8 md:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-headline font-bold px-8 py-4 tracking-tighter uppercase text-sm hover:bg-zinc-200 transition-colors flex items-center gap-3"
              >
                LIVE DEPLOYMENT
                <span className="material-symbols-outlined text-base">
                  arrow_outward
                </span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-container-highest text-white font-headline font-bold px-8 py-4 tracking-tighter uppercase text-sm hover:bg-surface-bright transition-colors ghost-border flex items-center gap-3"
              >
                SOURCE CODE
                <span className="material-symbols-outlined text-base">
                  code
                </span>
              </a>
            )}
          </div>

          <Link
            href="/"
            className="font-label text-zinc-500 tracking-widest uppercase text-xs hover:text-white transition-colors group flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            RETURN TO ARCHIVE
          </Link>
        </div>
      </section>
    </article>
  );
}
