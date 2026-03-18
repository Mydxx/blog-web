import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function GET() {
  const postsDirectory = path.join(process.cwd(), "src/content/posts");

  if (!fs.existsSync(postsDirectory)) {
    return NextResponse.json([]);
  }

  const entries = fs.readdirSync(postsDirectory).filter((entry) => entry.endsWith(".mdx"));

  const posts = entries.map((entry) => {
    const slug = entry.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, entry);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
      readingTime: calculateReadingTime(content),
    };
  });

  posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return NextResponse.json(posts);
}
