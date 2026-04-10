import { getExperience } from "@/lib/notion";
import { StackContent } from "./StackContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "STACK",
  description:
    "About Pravaat Chhetri — tech stack, skills, education, and certifications.",
};

export default async function StackPage() {
  const experience = await getExperience();
  return <StackContent experience={experience} />;
}
