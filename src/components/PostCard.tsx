import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import type { PostMetadata } from "@/lib/posts";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative py-5 px-3 -mx-3 rounded-xl border-b border-line/70 last:border-b-0 hover:bg-surface/80 transition-colors">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
              <time className="tabular-nums">{post.date}</time>
              <span className="text-term/40">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
            <h2 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight group-hover:text-term transition-colors">
              {post.title}
            </h2>
          </div>
          <ArrowUpRight className="w-4 h-4 text-muted/40 shrink-0 mt-1 group-hover:text-term group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-line/80 text-muted group-hover:border-term/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
