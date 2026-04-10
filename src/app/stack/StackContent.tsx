"use client";

import { Experience } from "@/lib/notion";
import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/Animations";

const TECH_STACK = {
  "LANGUAGES": ["TypeScript", "JavaScript", "Python", "Java", "C", "HTML", "CSS"],
  "FRAMEWORKS": ["Next.js", "React.js", "React Native", "Nest.js", "Node.js", "Express", "Django", "Flask", "Astro.js", "Strapi"],
  "DATABASES": ["PostgreSQL", "MongoDB", "MySQL", "MariaDB", "Redis", "Oracle FLEXCUBE"],
  "INFRASTRUCTURE": ["Docker", "Nginx", "AWS", "Vercel", "Linux", "Git"],
  "DESIGN": ["Tailwind CSS", "Framer Motion", "UI/UX Design"],
  "SPECIALIZATION": ["Full-Stack Development", "Enterprise Banking Systems", "AI/ML Integration", "IoT Systems", "Microservices"],
};

const EDUCATION = [
  {
    degree: "B.E. in Information Technology",
    institution: "College of Science and Technology, Royal University of Bhutan",
    period: "2020 — 2024",
    grade: "79%",
  },
  {
    degree: "Science (BHCSE)",
    institution: "Gelephu Higher Secondary School",
    period: "2016 — 2019",
    grade: "73.75%",
  },
];

const CERTIFICATIONS = [
  { name: "Introduction to Linux (LFS101)", issuer: "Linux Foundation" },
  { name: "Red Hat System Administration I & II", issuer: "Red Hat — RH124 & RH134" },
  { name: "Cybersecurity Fundamentals", issuer: "APNIC Academy" },
  { name: "Project Management Series", issuer: "Stanford University" },
  { name: "Data Science Workshop", issuer: "Stanford University" },
];

const STAT_CARDS = [
  { value: "4+", label: "Years Building" },
  { value: "10+", label: "Projects Shipped" },
  { value: "5+", label: "Companies Served" },
  { value: "95%", label: "BERT Accuracy" },
];

export function StackContent({ experience }: { experience: Experience[] }) {
  return (
    <div className="min-h-screen bg-surface pt-24" id="about">

      {/* ─── HEADER ─── */}
      <header className="px-8 md:px-24 py-16 max-w-[1440px] mx-auto border-b border-zinc-900">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7">
              <span className="font-label text-[10px] tracking-[0.4em] text-zinc-600 uppercase block mb-4">
                Systems Profile / v1.0
              </span>
              <h1 className="font-headline text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase text-white leading-[0.85]">
                TECH<br />STACK
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-zinc-400 leading-relaxed mb-6">
                IT Officer at Bhutan National Bank. Full-stack engineer and part-time tech lead with expertise in enterprise systems, AI integration, and scalable infrastructure.
              </p>
              <p className="font-mono text-[10px] text-zinc-700 leading-loose">
                LOCATION: Thimphu, Bhutan<br />
                TIMEZONE: UTC+6<br />
                STATUS: Available for consulting<br />
                CONTACT: pravaatchhetri66@gmail.com
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </header>

      {/* ─── STAT CARDS ─── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-900">
          {STAT_CARDS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.08}>
              <div className="px-8 md:px-12 py-10">
                <span className="font-headline text-4xl md:text-5xl font-black text-white block mb-1">
                  {stat.value}
                </span>
                <span className="font-label text-[10px] tracking-widest text-zinc-600 uppercase">
                  {stat.label}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ─── TECH GRID ─── */}
      <section className="px-8 md:px-24 py-24 max-w-[1440px] mx-auto border-b border-zinc-900">
        <RevealOnScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-16">
            ARSENAL
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900">
          {Object.entries(TECH_STACK).map(([category, techs], i) => (
            <RevealOnScroll key={category} delay={i * 0.07}>
              <div className="bg-surface p-8 h-full">
                <span className="font-label text-[9px] tracking-[0.3em] text-zinc-600 uppercase block mb-6">
                  {category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-headline text-xs tracking-tight text-zinc-300 bg-surface-container-lowest px-3 py-1.5 border border-zinc-900 hover:border-zinc-700 hover:text-white transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section className="px-8 md:px-24 py-24 max-w-[1440px] mx-auto border-b border-zinc-900">
        <RevealOnScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-16">
            FIELD RECORD
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="space-y-px bg-zinc-900" staggerDelay={0.1}>
          {experience.map((exp) => (
            <StaggerItem key={exp.id}>
              <div className="bg-surface p-8 md:p-10 group hover:bg-surface-container-low transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left: period + order */}
                  <div className="md:col-span-3">
                    <span className="font-mono text-[10px] text-zinc-700 block mb-1">
                      {String(exp.order).padStart(2, "0")}
                    </span>
                    <span className="font-label text-[10px] tracking-widest text-zinc-500 uppercase leading-relaxed">
                      {exp.period}
                    </span>
                  </div>

                  {/* Right: content */}
                  <div className="md:col-span-9">
                    <h3 className="font-headline text-xl md:text-2xl font-black tracking-tighter uppercase text-white mb-1">
                      {exp.role}
                    </h3>
                    <p className="font-headline text-sm tracking-tight text-zinc-500 uppercase mb-4">
                      {exp.company}
                    </p>
                    <p className="font-body text-zinc-500 text-sm leading-relaxed mb-6 max-w-2xl">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-label text-[9px] tracking-widest text-zinc-700 uppercase border border-zinc-900 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── EDUCATION & CERTS ─── */}
      <section className="px-8 md:px-24 py-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Education */}
          <div>
            <RevealOnScroll>
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tighter uppercase text-white mb-12">
                EDUCATION
              </h2>
            </RevealOnScroll>
            <div className="space-y-px bg-zinc-900">
              {EDUCATION.map((edu, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <div className="bg-surface p-8">
                    <span className="font-label text-[9px] tracking-widest text-zinc-600 uppercase block mb-3">
                      {edu.period} — {edu.grade}
                    </span>
                    <h3 className="font-headline font-bold text-white uppercase tracking-tighter mb-2">
                      {edu.degree}
                    </h3>
                    <p className="font-body text-zinc-500 text-sm">
                      {edu.institution}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <RevealOnScroll>
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tighter uppercase text-white mb-12">
                CLEARANCES
              </h2>
            </RevealOnScroll>
            <div className="space-y-px bg-zinc-900">
              {CERTIFICATIONS.map((cert, i) => (
                <RevealOnScroll key={i} delay={i * 0.08}>
                  <div className="bg-surface p-6 flex items-start gap-4 group hover:bg-surface-container-low transition-colors">
                    <span className="w-1.5 h-1.5 bg-zinc-700 mt-1.5 shrink-0 group-hover:bg-white transition-colors" />
                    <div>
                      <p className="font-headline text-sm font-bold uppercase tracking-tight text-white">
                        {cert.name}
                      </p>
                      <p className="font-label text-[9px] tracking-widest text-zinc-600 uppercase mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
