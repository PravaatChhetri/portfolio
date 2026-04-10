"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/notion";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/Animations";

const PLACEHOLDER_IMAGES = [
  "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1c1c1c 100%)",
  "linear-gradient(225deg, #0e0e0e 0%, #1a1a1a 50%, #131313 100%)",
  "linear-gradient(180deg, #151515 0%, #0a0a0a 60%, #1e1e1e 100%)",
  "linear-gradient(45deg, #111111 0%, #1a1a1a 50%, #0e0e0e 100%)",
  "linear-gradient(315deg, #131313 0%, #0a0a0a 50%, #171717 100%)",
  "linear-gradient(90deg, #0e0e0e 0%, #1c1c1c 50%, #111111 100%)",
];

export function WorkArchiveContent({ projects }: { projects: Project[] }) {
  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface pt-24">
      {/* Header */}
      <header className="px-8 md:px-24 py-16 max-w-[1440px] mx-auto border-b border-zinc-900">
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="font-label text-[10px] tracking-[0.4em] text-zinc-600 uppercase block mb-4">
                Selected Works / Volume 01
              </span>
              <h1 className="font-headline text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase text-white leading-[0.85]">
                THE<br />ARCHIVE
              </h1>
            </div>
            <p className="font-body text-zinc-500 max-w-xs leading-relaxed text-sm md:text-right">
              Engineering precision in enterprise systems, AI platforms, and distributed infrastructure.
            </p>
          </div>
        </RevealOnScroll>
      </header>

      {/* Category Filter */}
      <div className="px-8 md:px-24 py-8 max-w-[1440px] mx-auto border-b border-zinc-900">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-headline text-[10px] tracking-widest uppercase px-4 py-2 transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <main className="px-8 md:px-24 py-16 max-w-[1440px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900" staggerDelay={0.06}>
              {filtered.map((project, i) => (
                <StaggerItem key={project.id}>
                  <Link href={`/work/${project.slug}`} className="group block bg-surface">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.coverImage ? (
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover project-image"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full h-full project-image"
                          style={{ background: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length] }}
                        >
                          <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                              backgroundSize: "40px 40px",
                            }}
                          />
                          {/* Project title watermark */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-headline text-3xl font-black text-zinc-800 uppercase tracking-tighter opacity-60">
                              {project.title}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white text-black font-label text-[9px] tracking-widest uppercase px-2 py-1">
                            FEATURED
                          </span>
                        </div>
                      )}

                      {/* Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="material-symbols-outlined text-white text-xl">
                          arrow_outward
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 border-t border-zinc-900 group-hover:border-zinc-700 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="font-headline font-black text-white uppercase tracking-tighter text-xl group-hover:text-zinc-200 transition-colors">
                          {project.title}
                        </h2>
                        <span className="font-label text-[9px] tracking-widest text-zinc-600 uppercase shrink-0 mt-1">
                          {String(project.order).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="font-body text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.tagline}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="font-label text-[9px] tracking-widest text-zinc-700 uppercase">
                          {project.category}
                        </span>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="font-label text-[9px] tracking-widest text-zinc-700 uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {filtered.length === 0 && (
              <div className="py-32 text-center">
                <p className="font-headline text-zinc-700 uppercase tracking-widest">
                  No entries in this classification
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex items-center justify-between">
          <span className="font-label text-[10px] tracking-widest text-zinc-700 uppercase">
            {filtered.length} / {projects.length} entries
          </span>
          <span className="font-label text-[10px] tracking-widest text-zinc-700 uppercase">
            Archive Vol.01 — {new Date().getFullYear()}
          </span>
        </div>
      </main>
    </div>
  );
}
