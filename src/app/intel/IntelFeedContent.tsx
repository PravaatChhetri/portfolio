"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/notion";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/Animations";

export function IntelFeedContent({
  posts,
  allTags,
}: {
  posts: BlogPost[];
  allTags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="min-h-screen bg-surface pt-24">
      {/* Header */}
      <header className="px-8 md:px-24 py-8 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <RevealOnScroll>
            <h1 className="text-2xl font-black tracking-tighter text-white font-headline uppercase">
              INTEL_FEED
            </h1>
          </RevealOnScroll>
          <span className="h-px w-12 bg-zinc-800" />
          <span className="font-label text-[10px] tracking-widest text-zinc-500 uppercase">
            Status: Online
          </span>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="max-w-[1440px] mx-auto grid grid-cols-12 gap-0 pt-8">
        {/* Left Sidebar — Tags */}
        <aside className="col-span-12 md:col-span-3 px-8 md:px-8 order-2 md:order-1 mt-8 md:mt-0">
          <div className="md:sticky md:top-24">
            <h2 className="font-headline font-bold text-[10px] tracking-[0.3em] text-zinc-500 mb-8 uppercase">
              Classification_Tags
            </h2>

            {/* Tag Filters */}
            <div className="flex flex-wrap md:flex-col gap-3">
              <button
                onClick={() => setActiveTag(null)}
                className={`group flex items-center gap-3 text-left transition-all ${
                  activeTag === null ? "" : ""
                }`}
              >
                <span
                  className={`w-2 h-2 ${
                    activeTag === null ? "bg-white" : "bg-zinc-800 group-hover:bg-zinc-500"
                  }`}
                />
                <span
                  className={`font-headline text-xs tracking-widest ${
                    activeTag === null
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-zinc-200 group-hover:pl-2"
                  } transition-all`}
                >
                  ALL_ENTRIES
                </span>
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className="group flex items-center gap-3 text-left transition-all"
                >
                  <span
                    className={`w-2 h-2 ${
                      activeTag === tag
                        ? "bg-white"
                        : "bg-zinc-800 group-hover:bg-zinc-500"
                    }`}
                  />
                  <span
                    className={`font-headline text-xs tracking-widest ${
                      activeTag === tag
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-zinc-200 group-hover:pl-2"
                    } transition-all`}
                  >
                    {tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Quote block */}
            <div className="mt-20 p-6 bg-surface-container-low border-l-4 border-white hidden md:block">
              <p className="font-headline text-[10px] leading-relaxed text-zinc-400 uppercase tracking-tighter">
                &quot;The code is the katana. Precision is the soul.&quot;
                <br />
                <br />— Log entries serve as a technical record of explorations
                within the digital void.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <div className="col-span-12 md:col-span-8 px-8 md:px-0 order-1 md:order-2">
          {/* Vertical label */}
          <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30">
            <span className="font-headline text-[80px] font-black text-zinc-900/60 uppercase vertical-text tracking-tighter leading-none">
              V_LOG_FILE
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-24 pb-24"
            >
              {filteredPosts.map((post) => (
                <article key={post.id} className="group relative">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-4">
                    {/* Timestamp */}
                    <time className="font-headline text-sm font-light text-zinc-600 tracking-tighter shrink-0">
                      {post.publishedAt}
                    </time>

                    {/* Status badge */}
                    {post.status === "URGENT" && (
                      <span className="bg-white text-black px-2 py-0.5 font-label text-[9px] tracking-widest uppercase font-bold">
                        URGENT
                      </span>
                    )}

                    {/* Title */}
                    <Link href={`/intel/${post.slug}`}>
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black font-headline tracking-tighter text-white uppercase leading-none hover:text-zinc-300 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="md:ml-[180px] space-y-6">
                    {/* Excerpt */}
                    <p className="text-zinc-400 font-body leading-relaxed max-w-2xl">
                      {post.excerpt}
                    </p>

                    {/* Code snippet preview (if applicable) */}
                    {post.hasCodeSnippet && (
                      <div className="bg-surface-container-lowest p-6 border border-zinc-800/50">
                        <pre className="font-mono text-xs text-zinc-500 overflow-x-auto hide-scrollbar">
                          <code>{`// ${post.title.toLowerCase().replace(/ /g, "_")}.rs
// Technical implementation details in full log entry
// READ_TIME: ${post.readTime}`}</code>
                        </pre>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(tag)}
                          className="bg-zinc-900 text-zinc-500 px-3 py-1 text-[10px] font-headline tracking-widest uppercase hover:text-white hover:bg-surface-container-highest transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Read time */}
                    <div className="flex items-center gap-4">
                      <span className="font-label text-[10px] tracking-widest text-zinc-700 uppercase">
                        READ_TIME: {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination CTA */}
          <div className="flex justify-center pb-24">
            <button className="group flex items-center gap-4 border border-zinc-800 px-10 py-5 hover:bg-white hover:text-black transition-all duration-300">
              <span className="font-headline tracking-widest uppercase text-sm">
                Access Older Records
              </span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
