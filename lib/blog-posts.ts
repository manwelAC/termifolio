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
    publishedAt: "2025-05",
  },

  {
    slug:"pre-employment",
    title:"Pre Employment",
    description:"Blog about my journey after graduating in College",
    publishedAt:"2026-04",

  },

  {
    slug:"employment",
    title:"I got the Job!",
    description:"Blog about me taking the full leap of faith",
    publishedAt:"2026-06",
  },

  {
    slug:"virtual-machines",
    title:"Know Virtual Machines!",
    description:"Blog about how Virtual Machines should be normalized in workflows.",
    publishedAt:"2026-06",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
