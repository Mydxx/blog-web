"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, FolderGit2, Hash, Search, X } from "lucide-react";
import type { PostMetadata } from "@/lib/posts";

interface CommandPaletteProps {
  posts: PostMetadata[];
}

const quickPages = [
  { href: "/", label: "首页", hint: "cd ~" },
  { href: "/projects", label: "开源项目", hint: "ls ./projects" },
  { href: "/archive", label: "时间归档", hint: "git log" },
  { href: "/tags", label: "全部标签", hint: "ls ./tags" },
  { href: "/about", label: "关于 Mydxx", hint: "cat about.txt" },
  { href: "/dino", label: "小恐龙跑酷", hint: "./dino --play" },
];

export default function CommandPalette({ posts }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const openPalette = () => {
    setQuery("");
    setActiveIdx(0);
    setOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else openPalette();
        return;
      }
      if (
        e.key === "/" &&
        !open &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onCustomOpen = () => openPalette();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 15);
      return () => clearTimeout(id);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        pages: quickPages,
        posts: posts.slice(0, 6),
      };
    }
    const matchedPosts = posts.filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.tags.join(" ")} ${p.date}`.toLowerCase();
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    });
    const matchedPages = quickPages.filter((p) =>
      `${p.label} ${p.hint}`.toLowerCase().includes(q)
    );
    return { pages: matchedPages, posts: matchedPosts.slice(0, 10) };
  }, [posts, query]);

  const flatLinks = useMemo(
    () => [
      ...results.posts.map((p) => `/posts/${p.slug}`),
      ...results.pages.map((p) => p.href),
    ],
    [results]
  );



  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/45 backdrop-blur-[3px]"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="全站搜索"
    >
      <div
        className="w-full max-w-xl rounded-xl border border-line bg-surface shadow-2xl overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <Search className="w-4 h-4 text-term shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIdx((i) => Math.min(flatLinks.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIdx((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter" && flatLinks[activeIdx]) {
                e.preventDefault();
                navigate(flatLinks[activeIdx]);
              }
            }}
            placeholder="搜索文章标题、标签或关键字…"
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-muted hover:text-ink transition-colors"
            aria-label="关闭搜索"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.posts.length > 0 && (
            <div className="mb-2">
              <p className="px-2.5 py-1.5 font-mono text-[11px] text-muted">
                文章 ({results.posts.length})
              </p>
              {results.posts.map((post, idx) => {
                const active = idx === activeIdx;
                return (
                  <button
                    key={post.slug}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => navigate(`/posts/${post.slug}`)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start justify-between gap-3 transition-colors ${
                      active ? "bg-term-soft text-ink" : "hover:bg-surface-hover"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FileText className={`w-3.5 h-3.5 shrink-0 ${active ? "text-term" : "text-muted"}`} />
                        <span className="text-sm font-medium truncate">{post.title}</span>
                      </div>
                      <div className="mt-1 pl-5.5 flex items-center gap-2 font-mono text-[11px] text-muted">
                        <span>{post.date}</span>
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className="inline-flex items-center gap-0.5">
                            <Hash className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-opacity ${active ? "text-term opacity-100" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
          )}

          {results.pages.length > 0 && (
            <div>
              <p className="px-2.5 py-1.5 font-mono text-[11px] text-muted">快速跳转</p>
              {results.pages.map((page, i) => {
                const globalIdx = results.posts.length + i;
                const active = globalIdx === activeIdx;
                return (
                  <button
                    key={page.href}
                    onMouseEnter={() => setActiveIdx(globalIdx)}
                    onClick={() => navigate(page.href)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      active ? "bg-term-soft text-ink" : "hover:bg-surface-hover"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-sm">
                      <FolderGit2 className={`w-3.5 h-3.5 ${active ? "text-term" : "text-muted"}`} />
                      {page.label}
                    </span>
                    <span className="font-mono text-xs text-muted">{page.hint}</span>
                  </button>
                );
              })}
            </div>
          )}

          {flatLinks.length === 0 && (
            <p className="py-10 text-center font-mono text-xs text-muted">
              未找到匹配「{query}」的文章
            </p>
          )}
        </div>

        <div className="px-4 py-2 border-t border-line flex items-center justify-between font-mono text-[11px] text-muted bg-paper/60">
          <span>↑↓ 选择 · Enter 打开 · Esc 关闭</span>
          <span>⌘K / / 随时唤起</span>
        </div>
      </div>
    </div>
  );
}
