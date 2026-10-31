import Link from "next/link";

interface TagCloudProps {
  tags: string[];
  counts?: Record<string, number>;
}

export default function TagCloud({ tags, counts }: TagCloudProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className="font-mono text-xs px-2.5 py-1 rounded border border-line text-muted hover:border-term hover:text-term transition-colors"
        >
          #{tag}
          {counts && counts[tag] !== undefined && (
            <span className="ml-1.5 opacity-60">{counts[tag]}</span>
          )}
        </Link>
      ))}
    </div>
  );
}
