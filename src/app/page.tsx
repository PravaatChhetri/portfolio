import { getProjects, getExperience } from "@/lib/notion";
import { HeroSection } from "./sections/HeroSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { PassionsSection } from "./sections/PassionsSection";

export const revalidate = 3600; // ISR: revalidate every hour

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
