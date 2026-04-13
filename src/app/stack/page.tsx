import { getExperience } from "@/lib/notion";
import { StackContent } from "./StackContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Skills, Stack & Experience",
  description:
    "Pravaat Chhetri's tech stack, work experience, education, and certifications. Skills include Next.js, React Native, TypeScript, Python, Docker, PostgreSQL, AI/ML, and enterprise banking systems. IT Officer at Bhutan National Bank. B.E. IT from Royal University of Bhutan.",
  alternates: { canonical: "https://pravaat-chhetri.vercel.app/stack" },
  openGraph: {
    title: "Skills, Stack & Experience — Pravaat Chhetri",
    description:
      "Full-stack developer with 4+ years of experience. Next.js, React Native, TypeScript, Docker, AI/ML, enterprise banking. IT Officer at Bhutan National Bank.",
    url: "https://pravaat-chhetri.vercel.app/stack",
    type: "profile",
  },
};

export default async function StackPage() {
  const experience = await getExperience();
  return <StackContent experience={experience} />;
}
