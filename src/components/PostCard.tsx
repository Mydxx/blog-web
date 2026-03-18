import Link from "next/link";
import { PostMetadata } from "@/lib/posts";
import { Calendar, Clock, Tag } from "lucide-react";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readingTime}
        </span>
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {post.tags.slice(0, 3).join(", ")}
          </span>
        )}
      </div>
    </article>
  );
}
