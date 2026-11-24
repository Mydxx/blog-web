import Link from "next/link";
import { getAllPostMeta, getPostsGroupedByYear } from "@/lib/posts";

export const metadata = {
  title: "归档",
  description: "按时间线浏览全部文章",
};

export default function ArchivePage() {
  const groups = getPostsGroupedByYear();
  const all = getAllPostMeta();
  const totalWords = all.reduce((acc, p) => acc + p.wordCount, 0);

  return (
    <div>
      <p className="font-mono text-sm text-muted">
        <span className="text-term">$</span> git log --oneline ./posts
      </p>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
        时间归档
      </h1>
      <p className="mt-2 font-mono text-xs text-muted">
        共 {all.length} 篇文章 · 累计约 {(totalWords / 10000).toFixed(1)} 万字
      </p>

      <div className="mt-10 space-y-12">
        {groups.map(({ year, posts }) => (
          <section key={year}>
            <div className="flex items-baseline gap-3 mb-4 pb-2 border-b border-line">
              <h2 className="font-mono text-xl font-bold text-term">{year}</h2>
              <span className="font-mono text-xs text-muted">
                {posts.length} 篇
              </span>
            </div>

            <ul className="space-y-1 border-l border-line pl-4 sm:pl-5">
              {posts.map((post) => (
                <li key={post.slug} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[21px] sm:-left-[25px] top-3.5 w-2 h-2 rounded-full bg-paper border border-term/60"
                  />
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 py-2 px-2.5 -mx-2.5 rounded-lg hover:bg-surface/85 transition-colors"
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <time className="font-mono text-xs text-muted tabular-nums shrink-0">
                        {post.date.slice(5)}
                      </time>
                      <span className="text-sm sm:text-[15px] font-medium group-hover:text-term transition-colors truncate">
                        {post.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-muted shrink-0 pl-12 sm:pl-0">
                      {post.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
