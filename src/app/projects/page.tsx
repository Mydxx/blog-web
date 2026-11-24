import Link from "next/link";
import { ArrowUpRight, BookOpen, FolderGit2 } from "lucide-react";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "项目",
  description: "Mydxx 维护的安全工具、代码审计知识库与工程项目",
};

const statusLabel: Record<string, string> = {
  active: "持续迭代",
  maintained: "稳定维护",
  archived: "已归档",
};

export default function ProjectsPage() {
  return (
    <div>
      <p className="font-mono text-sm text-muted">
        <span className="text-term">$</span> ls -la ./projects
      </p>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
        开源与自研项目
      </h1>
      <p className="mt-2.5 text-sm text-muted leading-relaxed">
        日常安全研究与工程实践里顺手打磨的工具，追求轻量、直观与零多余依赖。
      </p>

      <div className="mt-8 grid gap-4">
        {projects.map((proj) => (
          <article
            key={proj.name}
            className="group rounded-xl border border-line bg-surface/85 p-5 sm:p-6 hover:border-term/50 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <FolderGit2 className="w-4 h-4 text-term shrink-0" />
                <h2 className="font-mono text-base sm:text-lg font-semibold group-hover:text-term transition-colors">
                  {proj.name}
                </h2>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-term-soft text-term">
                  {statusLabel[proj.status] || proj.status}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                {proj.postSlug && (
                  <Link
                    href={`/posts/${proj.postSlug}`}
                    className="inline-flex items-center gap-1 text-muted hover:text-term transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    阅读文章
                  </Link>
                )}
                {proj.repo && (
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-line text-ink hover:border-term hover:text-term transition-colors"
                  >
                    GitHub
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm font-medium text-ink/90">{proj.tagline}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {proj.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {proj.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2 py-0.5 rounded border border-line/80 bg-paper text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
