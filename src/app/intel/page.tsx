import { getBlogPosts } from "@/lib/notion";
import { IntelFeedContent } from "./IntelFeedContent";

export const revalidate = 3600;

export const metadata = {
  title: "INTEL_FEED — Technical Archives",
  description:
    "Technical logs, architecture decisions, and engineering explorations by Pravaat Chhetri.",
};

export default async function IntelPage() {
  const posts = await getBlogPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return <IntelFeedContent posts={posts} allTags={allTags} />;
}
