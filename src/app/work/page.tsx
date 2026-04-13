import { getProjects } from "@/lib/notion";
import { WorkArchiveContent } from "./WorkArchiveContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects & Case Studies",
  description:
    "Software engineering projects by Pravaat Chhetri — enterprise banking systems (Bhutan National Bank), AI content detection platforms, tourism tech, Chrome extensions, and more. Full-stack work in Next.js, React Native, Docker, and TypeScript.",
  alternates: { canonical: "https://pravaatchhetri.dev/work" },
  openGraph: {
    title: "Projects & Case Studies — Pravaat Chhetri",
    description:
      "Enterprise banking systems, AI platforms, and full-stack apps built by Pravaat Chhetri, Software Engineer at Bhutan National Bank.",
    url: "https://pravaatchhetri.dev/work",
    type: "website",
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkArchiveContent projects={projects} />;
}
