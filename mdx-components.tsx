import type { MDXComponents } from "mdx/types";

const articleComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2
      className="mb-4 mt-12 text-2xl font-normal text-neutral-100 sm:text-3xl"
      style={{ fontFamily: "Lora, serif" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-emerald-300">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-base leading-8 text-neutral-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2 pl-5 text-neutral-300 marker:text-emerald-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-5 text-neutral-300 marker:font-mono marker:text-purple-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-emerald-300/70 pl-5 italic text-neutral-400">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-sm text-emerald-200">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-4" href={href}>
      {children}
    </a>
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...articleComponents, ...components };
}
