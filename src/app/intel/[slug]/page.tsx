import { getBlogPosts, getPageBlocks } from "@/lib/notion";
import { notFound } from "next/navigation";
import { BlogPostContent } from "./BlogPostContent";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  const url = `https://pravaat-chhetri.vercel.app/intel/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Pravaat Chhetri`,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Pravaat Chhetri"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  const url = `https://pravaat-chhetri.vercel.app/intel/${slug}`;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://pravaat-chhetri.vercel.app" },
          { name: "Journal", url: "https://pravaat-chhetri.vercel.app/intel" },
          { name: post.title, url },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        url={url}
        tags={post.tags}
      />
      <BlogPostContent post={post} blocks={blocks} />
    </>
  );
}
