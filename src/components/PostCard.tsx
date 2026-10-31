import { Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import type { PostMetadata } from "@/lib/posts";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group py-5 border-b border-line last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <time className="font-mono text-xs text-muted shrink-0 pt-0.5 tabular-nums">
            {post.date}
          </time>
          <h2 className="text-lg font-semibold leading-snug group-hover:text-term transition-colors">
            {post.title}
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
          {post.tags.length > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {post.tags.join(" / ")}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
