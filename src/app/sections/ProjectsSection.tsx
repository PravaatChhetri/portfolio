"use client";

import Link from "next/link";
import { Project } from "@/lib/notion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/Animations";

// Asymmetric grid layout patterns matching the design
const GRID_PATTERNS = [
  { colSpan: "md:col-span-8", aspect: "aspect-[16/10]", mt: "" },
  { colSpan: "md:col-span-4", aspect: "aspect-[4/5]", mt: "md:mt-48" },
  { colSpan: "md:col-span-5", aspect: "aspect-square", mt: "" },
  { colSpan: "md:col-span-7", aspect: "aspect-[16/9]", mt: "md:-mt-24" },
  { colSpan: "md:col-span-6", aspect: "aspect-[3/2]", mt: "" },
  { colSpan: "md:col-span-6", aspect: "aspect-[4/3]", mt: "md:mt-16" },
];

// Placeholder images — atmospheric dark moody shots
const PLACEHOLDER_IMAGES = [
  "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1c1c1c 100%)",
  "linear-gradient(225deg, #0e0e0e 0%, #1a1a1a 50%, #131313 100%)",
  "linear-gradient(180deg, #151515 0%, #0a0a0a 60%, #1e1e1e 100%)",
  "linear-gradient(45deg, #111111 0%, #1a1a1a 50%, #0e0e0e 100%)",
  "linear-gradient(315deg, #131313 0%, #0a0a0a 50%, #171717 100%)",
  "linear-gradient(90deg, #0e0e0e 0%, #1c1c1c 50%, #111111 100%)",
];

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-low" id="projects">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div>
              <h2 className="font-headline text-6xl md:text-8xl font-black tracking-tighter uppercase text-white">
                ARCHIVE
              </h2>
              <p className="font-label text-zinc-500 tracking-blueprint uppercase mt-4">
                Selected works / volume 01
              </p>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-zinc-800 mb-6" />
          </div>
        </RevealOnScroll>

        {/* Asymmetric Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
          staggerDelay={0.15}
        >
          {projects.map((project, i) => {
            const pattern = GRID_PATTERNS[i % GRID_PATTERNS.length];
            return (
              <StaggerItem
                key={project.id}
                className={`${pattern.colSpan} ${pattern.mt} group cursor-pointer`}
              >
                <Link href={`/work/${project.slug}`}>
                  <div className={`relative overflow-hidden ${pattern.aspect} bg-zinc-900`}>
                    {/* Project Image or Gradient Placeholder */}
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
                        style={{
                          background: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
                        }}
                      >
                        {/* Grid texture overlay */}
                        <div
                          className="absolute inset-0 opacity-[0.04]"
                          style={{
                            backgroundImage:
                              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                          }}
                        />
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Project Info */}
                    <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 z-10">
                      <span className="font-label text-[10px] tracking-widest text-white/50 mb-2 block uppercase">
                        {project.category}
                      </span>
                      <h3
                        className={`font-headline font-bold text-white uppercase ${
                          i % 4 === 0 || i % 4 === 3
                            ? "text-3xl md:text-4xl"
                            : "text-2xl md:text-3xl"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Hover arrow indicator */}
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined text-white/60 text-2xl">
                        arrow_outward
                      </span>
                    </div>
                  </div>

                  {/* Tech stack below card */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-label text-[9px] tracking-widest text-zinc-600 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
