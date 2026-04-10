import { getProjects } from "@/lib/notion";
import { WorkArchiveContent } from "./WorkArchiveContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "WORK",
  description:
    "Selected works and case studies by Pravaat Chhetri — enterprise banking systems, AI platforms, tourism tech, and more.",
};

export default async function WorkPage() {
  const projects = await getProjects();
  return <WorkArchiveContent projects={projects} />;
}
