import { getAllTags, getPostsByTag, getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `#${decodedTag}`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div>
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-term mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        cd ..
      </Link>

      <header className="pb-8 mb-4 border-b border-line">
        <h1 className="font-mono text-2xl font-semibold">
          <span className="text-term">#</span>
          {decodedTag}
        </h1>
        <p className="mt-2 font-mono text-xs text-muted">
          {posts.length} posts
        </p>
      </header>

      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
