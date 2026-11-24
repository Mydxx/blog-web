import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  wordCount: number;
}

export interface Post extends PostMetadata {
  content: string;
}

function countWords(content: string): number {
  const plain = content.replace(/```[\s\S]*?```/g, " ").replace(/[#*`>\-\[\]()]/g, " ");
  const cjk = plain.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0;
  const latin = plain
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return cjk + latin;
}

function calculateReadingTime(content: string): string {
  const cjkChars = content.match(/[\u3400-\u9fff\uf900-\ufaff]/g)?.length ?? 0;
  const words = content
    .replace(/[\u3400-\u9fff\uf900-\ufaff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.ceil(cjkChars / 400 + words / 200);
  return `${Math.max(1, minutes)} min read`;
}

export function getAdjacentPosts(slug: string): {
  newer: PostMetadata | null;
  older: PostMetadata | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getRelatedPosts(slug: string, limit = 3): PostMetadata[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.reduce((acc, t) => acc + (tagSet.has(t.toLowerCase()) ? 1 : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((x) => ({
      slug: x.post.slug,
      title: x.post.title,
      date: x.post.date,
      tags: x.post.tags,
      excerpt: x.post.excerpt,
      readingTime: x.post.readingTime,
      wordCount: x.post.wordCount,
    }));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const entries = fs.readdirSync(postsDirectory);
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title || "Untitled",
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    tags: data.tags || [],
    excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
    readingTime: calculateReadingTime(content),
    wordCount: countWords(content),
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));

  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getAllPostMeta(): PostMetadata[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tags: p.tags,
    excerpt: p.excerpt,
    readingTime: p.readingTime,
    wordCount: p.wordCount,
  }));
}

export function getPostsGroupedByYear(): { year: string; posts: PostMetadata[] }[] {
  const posts = getAllPostMeta();
  const map = new Map<string, PostMetadata[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const list = map.get(year) ?? [];
    list.push(post);
    map.set(year, list);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, list]) => ({ year, posts: list }));
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
