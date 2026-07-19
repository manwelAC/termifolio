import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";
import { BlogPageReveal } from "@/components/BlogPageReveal";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Manuel Cuerdo`,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params, searchParams }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const requestedSource = (await searchParams).from;
  const source = requestedSource === "terminal" || requestedSource === "bento"
    ? requestedSource
    : null;
  const blogHref = source ? `/blog?from=${source}` : "/blog";

  if (!post) notFound();

  const { default: Article } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <BlogPageReveal className="relative min-h-screen overflow-hidden bg-neutral-950 px-4 py-10 text-neutral-100 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(52,211,153,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(52,211,153,0.035)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between pb-12">
          <Link
            href={blogHref}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2 font-mono text-[10px] text-neutral-400 transition-colors hover:border-emerald-500/30 hover:text-neutral-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Blog index
          </Link>
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">
            {post.publishedAt}
          </span>
        </header>

        <div className="pb-12">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-purple-300">
            Article // {post.slug}
          </p>
          <h1
            className="text-4xl font-normal leading-tight text-neutral-100 sm:text-5xl"
            style={{ fontFamily: "Lora, serif" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
            {post.description}
          </p>
        </div>

        <article className="pb-20">
          <Article />
        </article>

        <footer className="flex items-center justify-between pb-5 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
          <span>Manuel Cuerdo</span>
          <Link href={blogHref} className="transition-colors hover:text-emerald-300">
            Back to index
          </Link>
        </footer>
      </div>
    </BlogPageReveal>
  );
}
