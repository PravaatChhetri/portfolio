"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/notion";
import { NotionBlockRenderer } from "@/components/NotionBlockRenderer";
import { RevealOnScroll } from "@/components/Animations";
import { motion } from "framer-motion";

export function BlogPostContent({
  post,
  blocks,
}: {
  post: BlogPost;
  blocks: any[];
}) {
  return (
    <article className="min-h-screen bg-surface">
      {/* ─── HERO ─── */}
      <section className="min-h-[60vh] flex flex-col justify-end px-8 md:px-24 pb-20 pt-32 relative overflow-hidden border-b border-zinc-900">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-4xl">
          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {post.status === "URGENT" && (
              <span className="bg-white text-black font-label text-[9px] tracking-widest uppercase px-2 py-1">
                URGENT
              </span>
            )}
            <span className="font-label text-[10px] tracking-widest text-zinc-600 uppercase">
              {post.publishedAt}
            </span>
            <span className="h-px w-8 bg-zinc-800" />
            <span className="font-label text-[10px] tracking-widest text-zinc-600 uppercase">
              READ_TIME: {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-headline text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white"
            >
              {post.title}
            </motion.h1>
          </div>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-body text-zinc-400 text-lg leading-relaxed max-w-2xl mb-8"
          >
            {post.excerpt}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/intel?tag=${tag}`}
                className="bg-surface-container-highest text-zinc-500 px-3 py-1 font-label text-[9px] tracking-widest uppercase hover:text-white hover:bg-zinc-800 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="px-8 md:px-24 py-24 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sidebar metadata */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="lg:sticky lg:top-28 space-y-10">
            <div>
              <span className="font-label text-[9px] tracking-[0.3em] text-zinc-600 uppercase block mb-4">
                Classification
              </span>
              <div className="space-y-2">
                {post.tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-zinc-700" />
                    <span className="font-headline text-[10px] tracking-widest text-zinc-500 uppercase">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-label text-[9px] tracking-[0.3em] text-zinc-600 uppercase block mb-4">
                Log Entry
              </span>
              <p className="font-mono text-[10px] text-zinc-700 leading-relaxed">
                DATE: {post.publishedAt}
                <br />
                READ: {post.readTime}
                <br />
                STATUS: {post.status}
                {post.hasCodeSnippet && (
                  <>
                    <br />
                    CONTAINS: CODE
                  </>
                )}
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-900">
              <Link
                href="/intel"
                className="group flex items-center gap-2 font-label text-[10px] tracking-widest text-zinc-600 uppercase hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                All Entries
              </Link>
            </div>
          </div>
        </aside>

        {/* Main body */}
        <div className="lg:col-span-9 order-1 lg:order-2">
          {blocks.length > 0 ? (
            <NotionBlockRenderer blocks={blocks} />
          ) : (
            /* Fallback when no Notion blocks — show excerpt styled as full content */
            <RevealOnScroll>
              <div className="space-y-8">
                <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
                <div className="bg-surface-container-lowest border border-zinc-800/40 p-8">
                  <p className="font-mono text-xs text-zinc-600 leading-relaxed">
                    {`// full_article.log\n// Content synced from Notion CMS\n// Connect NOTION_BLOG_DB to load the complete entry`}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* ─── FOOTER NAV ─── */}
      <section className="px-8 md:px-24 py-16 border-t border-zinc-900 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/intel"
            className="group flex items-center gap-3 font-label text-[10px] tracking-widest text-zinc-500 uppercase hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Intel Feed
          </Link>
          <span className="font-label text-[10px] tracking-widest text-zinc-800 uppercase hidden md:block">
            VANGUARD_OS // LOG_ENTRY
          </span>
        </div>
      </section>
    </article>
  );
}
