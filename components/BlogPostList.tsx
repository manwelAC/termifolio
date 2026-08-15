"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";

const PAGE_SIZE = 5;

type BlogPostListProps = {
  posts: BlogPost[];
  sourceQuery: string;
};

export function BlogPostList({ posts, sourceQuery }: BlogPostListProps) {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(posts.length / PAGE_SIZE);
  const hasPagination = pageCount > 1;
  const canGoBack = page > 0;
  const canGoForward = page < pageCount - 1;
  const visiblePosts = useMemo(
    () => posts.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [page, posts],
  );

  return (
    <div>
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {visiblePosts.map((post, index) => {
              const noteNumber = page * PAGE_SIZE + index + 1;

              return (
                <article
                  key={post.slug}
                  className="group grid gap-4 py-4 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-300/80">
                    {String(noteNumber).padStart(2, "0")} / Note
                  </div>
                  <Link href={`/blog/${post.slug}${sourceQuery}`} className="min-w-0">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h2
                          className="text-2xl font-normal text-neutral-100 transition-colors group-hover:text-emerald-200"
                          style={{ fontFamily: "Lora, serif" }}
                        >
                          {post.title}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
                          {post.description}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-600 transition-colors group-hover:text-emerald-300" />
                    </div>
                    <div className="mt-5 flex items-center gap-4">
                      <span className="h-px w-12 bg-emerald-300/70 transition-all duration-300 group-hover:w-20" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">
                        {post.publishedAt}
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {hasPagination ? (
        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-900 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">
            Page {String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">
            {canGoBack ? (
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-neutral-400 transition-colors hover:border-purple-400/40 hover:text-neutral-100"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
            ) : null}

            {canGoForward ? (
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-300/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-emerald-200 transition-colors hover:border-emerald-300/70 hover:bg-emerald-300/15"
              >
                View more
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
