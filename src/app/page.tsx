import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      {/* 终端 hero */}
      <section className="pt-6 pb-10">
        <p className="font-mono text-sm text-term">
          $ whoami<span className="cursor-blink ml-1" aria-hidden="true" />
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          安全研究 <span className="text-term">×</span> AI{" "}
          <span className="text-term">×</span> 工程实践
        </h1>
        <p className="mt-4 text-muted leading-relaxed max-w-xl">
          记录渗透测试、代码审计、AI 应用的学习与实践，
          偶尔写写桌面开发和这个博客本身。
        </p>
        <p className="mt-6 font-mono text-xs text-muted">
          <span className="text-term">→</span> {posts.length} posts ·{" "}
          {tags.length} tags · <a href="/rss.xml" className="hover:text-term transition-colors">rss</a>
        </p>
      </section>

      {/* 文章列表 */}
      <section>
        <p className="font-mono text-sm text-muted mb-2">
          <span className="text-term">$</span> ls ./posts --sort=date
        </p>
        <div>
          {posts.length === 0 ? (
            <p className="text-muted py-8 font-mono text-sm">
              total 0 — 暂无文章
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
