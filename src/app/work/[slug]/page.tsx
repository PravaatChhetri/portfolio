import { getProjects, getProjectBySlug, getPageBlocks } from "@/lib/notion";
import { notFound } from "next/navigation";
import { CaseStudyContent } from "./CaseStudyContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Try to fetch Notion page blocks for rich content
  let blocks: any[] = [];
  try {
    blocks = await getPageBlocks(project.id);
  } catch {
    // Fall back to structured data
  }

  return <CaseStudyContent project={project} blocks={blocks} />;
}
