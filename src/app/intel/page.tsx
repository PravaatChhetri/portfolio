import { getBlogPosts } from "@/lib/notion";
import { IntelFeedContent } from "./IntelFeedContent";

export const revalidate = 3600;

export const metadata = {
  title: "Journal — Engineering Articles & Technical Writing",
  description:
    "Technical articles, architecture decisions, and engineering deep-dives by Pravaat Chhetri — covering Docker, Next.js, AI/ML pipelines, enterprise systems, and full-stack development.",
  alternates: { canonical: "https://pravaatchhetri.dev/intel" },
  openGraph: {
    title: "Journal — Engineering Articles by Pravaat Chhetri",
    description:
      "Technical writing on Docker, Next.js, AI detection pipelines, and enterprise banking systems by Pravaat Chhetri, Software Engineer.",
    url: "https://pravaatchhetri.dev/intel",
    type: "website",
  },
};

export default async function IntelPage() {
  const posts = await getBlogPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return <IntelFeedContent posts={posts} allTags={allTags} />;
}
