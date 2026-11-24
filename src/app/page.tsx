import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { getAllPostMeta, getAllTags } from "@/lib/posts";
import { projects } from "@/lib/projects";
import HomeFeed from "@/components/HomeFeed";

function formatWords(total: number): string {
  if (total >= 10000) return `${(total / 10000).toFixed(1)} 万字`;
  return `${total} 字`;
}

export default function Home() {
  const posts = getAllPostMeta();
  const tags = getAllTags();
  const totalWords = posts.reduce((acc, p) => acc + p.wordCount, 0);
  const featuredProjects = projects.filter((p) => p.highlight).slice(0, 3);

  return (
    <div className="space-y-14">
      {/* 终端编辑风 Hero */}
      <section className="pt-4 pb-2">
        <p className="font-mono text-xs sm:text-sm text-term">
          $ whoami<span className="cursor-blink ml-1" aria-hidden="true" />
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          安全研究 <span className="text-term font-light">×</span> AI{" "}
          <span className="text-term font-light">×</span> 工程实践
        </h1>
        <p className="mt-4 text-[15px] text-muted leading-relaxed max-w-2xl">
          Mydxx 的数字笔记本。专注渗透测试、代码审计、自研安全工具与 AI Agent 工作流，
          只写亲手验证过的原理、踩过的坑和趁手的工程实现。
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-term">→</span> {posts.length} 篇文章
          </span>
          <span className="opacity-40">·</span>
          <span>约 {formatWords(totalWords)}</span>
          <span className="opacity-40">·</span>
          <Link href="/tags" className="hover:text-term transition-colors">
            {tags.length} 个标签
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/archive" className="hover:text-term transition-colors">
            时间归档
          </Link>
          <span className="opacity-40">·</span>
          <a href="/rss.xml" className="hover:text-term transition-colors">
            RSS
          </a>
        </div>
      </section>

      {/* 开源项目精选条 */}
      <section>
        <div className="flex items-center justify-between mb-3.5">
          <p className="font-mono text-xs text-muted inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-term" />
            <span>
              <span className="text-term">$</span> ls ./projects --featured
            </span>
          </p>
          <Link
            href="/projects"
            className="font-mono text-xs text-muted hover:text-term transition-colors"
          >
            全部项目 →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {featuredProjects.map((proj) => (
            <div
              key={proj.name}
              className="group rounded-xl border border-line bg-surface/85 p-4 flex flex-col justify-between hover:border-term/50 hover:bg-surface transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-mono text-[13px] font-semibold truncate group-hover:text-term transition-colors">
                    {proj.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap font-mono text-[10px] text-term bg-term-soft px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-term" />
                    {proj.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">
                  {proj.tagline}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-line/60 flex items-center justify-between font-mono text-[11px] text-muted">
                {proj.postSlug ? (
                  <Link
                    href={`/posts/${proj.postSlug}`}
                    className="hover:text-term transition-colors"
                  >
                    设计笔记
                  </Link>
                ) : (
                  <span />
                )}
                {proj.repo && (
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 hover:text-term transition-colors"
                  >
                    GitHub
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 可按主题筛选的文章流 */}
      <HomeFeed posts={posts} />
    </div>
  );
}
