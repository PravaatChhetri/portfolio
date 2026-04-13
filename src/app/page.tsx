import type { Metadata } from "next";
import { getProjects, getExperience } from "@/lib/notion";
import { HeroSection } from "./sections/HeroSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { PassionsSection } from "./sections/PassionsSection";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title:
    "Pravaat Chhetri — Software Engineer, AI Engineer & Full Stack Developer | Bhutan",
  description:
    "Pravaat Chhetri is a Software Engineer and IT Officer at Bhutan National Bank, Thimphu, Bhutan. Expert in Next.js, React Native, TypeScript, AI/ML integration, and enterprise banking systems. B.E. IT graduate with 4+ years of building production systems. Open to freelance and remote work.",
  alternates: {
    canonical: "https://pravaat-chhetri.vercel.app",
  },
  openGraph: {
    title:
      "Pravaat Chhetri — Software Engineer, AI Engineer & Full Stack Developer",
    description:
      "IT Officer at Bhutan National Bank. Building enterprise banking systems, AI platforms, and scalable full-stack apps with Next.js, React Native, and TypeScript. Open to freelance work.",
    url: "https://pravaat-chhetri.vercel.app",
    type: "website",
  },
};

export default async function HomePage() {
  const [projects, experience] = await Promise.all([
    getProjects(),
    getExperience(),
  ]);

  return (
    <>
      <HeroSection />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <PassionsSection />
    </>
  );
}
