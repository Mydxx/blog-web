import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://mydxx.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const staticPages = ["", "tags/", "about/"].map((path) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: new Date(),
  }));

  return [...posts, ...staticPages];
}
