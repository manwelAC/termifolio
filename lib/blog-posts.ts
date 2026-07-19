export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-beginning",
    title: "The Beginning",
    description: "Blog about my experiences before I graduated in College.",
    publishedAt: "2026-07-19",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
