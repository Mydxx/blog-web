"use client";

import { useMemo, useState } from "react";
import type { PostMetadata } from "@/lib/posts";
import PostCard from "./PostCard";

interface HomeFeedProps {
  posts: PostMetadata[];
}

const TOPICS = [
  { id: "all", label: "全部", match: () => true },
  {
    id: "sec",
    label: "安全研究",
    match: (p: PostMetadata) =>
      p.tags.some((t) =>
        ["渗透测试", "代码审计", "漏洞分析", "安全研究", "安全加固", "逻辑漏洞", "AI安全", "JWT", "SSO", "文件上传"].includes(t)
      ),
  },
  {
    id: "ai",
    label: "AI / Agent",
    match: (p: PostMetadata) =>
      p.tags.some((t) => ["AI", "Agent", "A2A", "AI安全"].includes(t)),
  },
  {
    id: "tool",
    label: "工具开发",
    match: (p: PostMetadata) =>
      p.tags.some((t) => ["工具开发", "浏览器扩展", "Electron", "桌面开发", "效率工具"].includes(t)),
  },
  {
    id: "eng",
    label: "工程实践",
    match: (p: PostMetadata) =>
      p.tags.some((t) => ["工程实践", "Next.js", "TypeScript", "设计", "部署", "环境配置", "运维"].includes(t)),
  },
];

export default function HomeFeed({ posts }: HomeFeedProps) {
  const [topic, setTopic] = useState("all");

  const filtered = useMemo(() => {
    const def = TOPICS.find((t) => t.id === topic) || TOPICS[0];
    return posts.filter(def.match);
  }, [posts, topic]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="font-mono text-xs text-muted">
          <span className="text-term">$</span> ls ./posts --sort=date{" "}
          <span className="opacity-60">({filtered.length})</span>
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          {TOPICS.map((t) => {
            const active = topic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTopic(t.id)}
                className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active
                    ? "border-term bg-term-soft text-term font-medium"
                    : "border-line bg-surface/60 text-muted hover:text-ink hover:border-line"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <p className="text-muted py-10 font-mono text-sm">
            total 0 — 该分类暂无文章
          </p>
        ) : (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </section>
  );
}
