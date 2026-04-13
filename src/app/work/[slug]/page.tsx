import { getProjects, getProjectBySlug, getPageBlocks } from "@/lib/notion";
import { notFound } from "next/navigation";
import { CaseStudyContent } from "./CaseStudyContent";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const url = `https://pravaat-chhetri.vercel.app/work/${slug}`;
  return {
    title: `${project.title} — Case Study`,
    description: `${project.tagline} Built by Pravaat Chhetri using ${project.techStack.slice(0, 4).join(", ")}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Case Study | Pravaat Chhetri`,
      description: project.tagline,
      url,
      type: "article",
    },
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

  const url = `https://pravaat-chhetri.vercel.app/work/${slug}`;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://pravaat-chhetri.vercel.app" },
          { name: "Projects", url: "https://pravaat-chhetri.vercel.app/work" },
          { name: project.title, url },
        ]}
      />
      <ProjectJsonLd
        title={project.title}
        description={project.tagline}
        url={url}
        techStack={project.techStack}
      />
      <CaseStudyContent project={project} blocks={blocks} />
    </>
  );
}
