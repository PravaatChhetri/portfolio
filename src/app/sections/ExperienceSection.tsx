"use client";

import { Experience } from "@/lib/notion";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  LineGrow,
} from "@/components/Animations";

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <section className="py-32 px-8 md:px-24 bg-surface-dim" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sticky Title */}
          <div className="md:col-span-4">
            <RevealOnScroll>
              <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter uppercase sticky top-32">
                EXPERIENCE
              </h2>
            </RevealOnScroll>
          </div>

          {/* Timeline */}
          <StaggerContainer className="md:col-span-8 flex flex-col gap-24">
            {experience.map((job, i) => (
              <StaggerItem key={job.id}>
                <div className="group border-l border-zinc-800 pl-8 relative">
                  {/* Timeline dot */}
                  {i === 0 ? (
                    <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] bg-white" />
                  ) : (
                    <div className="absolute -left-[1px] top-0 w-px h-0 group-hover:h-full bg-white transition-all duration-500" />
                  )}

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-6">
                    <h3 className="font-headline text-2xl md:text-3xl font-bold uppercase text-white">
                      {job.role}
                    </h3>
                    <span className="font-label text-zinc-500 tracking-widest text-xs mt-2 md:mt-0">
                      {job.period}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="font-label text-zinc-400 mb-8 tracking-wider text-sm">
                    {job.company}
                  </p>

                  {/* Description */}
                  <p className="font-body text-lg text-zinc-300 max-w-2xl leading-relaxed">
                    {job.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {job.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest px-3 py-1 font-label text-[10px] tracking-widest text-zinc-400 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
