import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import { BlogPageReveal } from "@/components/BlogPageReveal";

export const metadata: Metadata = {
  title: "Blog | Manuel Cuerdo",
  description: "Notes on development, systems, and the work behind the work.",
};

type BlogPageProps = {
  searchParams: Promise<{ from?: string | string[] }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const requestedSource = (await searchParams).from;
  const source = requestedSource === "terminal" || requestedSource === "bento"
    ? requestedSource
    : null;
  const portfolioHref = source ? `/?view=${source}` : "/";
  const sourceQuery = source ? `?from=${source}` : "";

  return (
    <BlogPageReveal className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 py-10 text-neutral-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <header className="flex items-center justify-between pb-6">
          <Link
            href={portfolioHref}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2 font-mono text-[10px] text-neutral-400 transition-colors hover:border-emerald-500/30 hover:text-neutral-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </Link>

          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Writing index
            <span className="hidden text-neutral-700 sm:inline">//</span>
            <span className="hidden sm:inline">{String(blogPosts.length).padStart(2, "0")} entries</span>
          </div>
        </header>

        <section className="py-16 sm:py-20">
          <div className="mb-12 max-w-2xl">
            <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300/80">
              <BookOpen className="h-3.5 w-3.5" />
              ~/blog
            </div>
            <h1
              className="text-4xl font-normal leading-tight text-neutral-100 sm:text-5xl"
              style={{ fontFamily: "Lora, serif" }}
            >
              Notes from <span className="italic text-neutral-400">the build.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-400">
              Thoughts on development, system design, experiments, and lessons collected while making things work.
            </p>
          </div>

          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                className="group grid gap-4 py-4 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-8"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-300/80">
                  {String(index + 1).padStart(2, "0")} / Note
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
            ))}
          </div>
        </section>

        <footer className="flex items-center justify-between py-5 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
          <span>Manuel Cuerdo</span>
          <span>UTF-8 // Writing</span>
        </footer>
      </div>
    </BlogPageReveal>
  );
}
