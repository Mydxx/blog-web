import Link from "next/link";
import { getAllPostMeta, getAllTags } from "@/lib/posts";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "关于",
  description: "关于 Mydxx 与这个博客",
};

export default function AboutPage() {
  const posts = getAllPostMeta();
  const tags = getAllTags();
  const totalWords = posts.reduce((acc, p) => acc + p.wordCount, 0);

  return (
    <div>
      <p className="font-mono text-sm text-muted mb-2">
        <span className="text-term">$</span> cat about.txt
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-line bg-surface/85 p-4">
          <p className="font-mono text-xs text-muted">文章数</p>
          <p className="mt-1 font-mono text-xl font-bold text-term">{posts.length}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/85 p-4">
          <p className="font-mono text-xs text-muted">累计字数</p>
          <p className="mt-1 font-mono text-xl font-bold text-term">
            {(totalWords / 10000).toFixed(1)}w
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface/85 p-4">
          <p className="font-mono text-xs text-muted">开源项目</p>
          <p className="mt-1 font-mono text-xl font-bold text-term">
            {projects.length}
            <span className="text-xs font-normal text-muted ml-1">({tags.length} tags)</span>
          </p>
        </div>
      </div>

      <div className="prose max-w-none mt-8">
        <h2>我是谁</h2>
        <p>
          Mydxx，安全研究方向，关注 AI 与网络安全的交叉地带。
          日常在渗透测试、代码审计、安全工具开发之间切换，也写一些桌面应用和 Web 工程。
        </p>

        <h2>我在做什么</h2>
        <ul>
          <li>
            <strong>浏览器安全工作台</strong>
            ：开发并维护免代理跨端抓包、静默响应替换与改包重放扩展{" "}
            <a
              href="https://github.com/Mydxx/TraceBurp"
              target="_blank"
              rel="noopener noreferrer"
            >
              TraceBurp
            </a>
            ，服务日常高频 Web 测试。
          </li>
          <li>
            <strong>安全工具</strong>
            ：维护目录扫描器{" "}
            <a
              href="https://github.com/Mydxx/Lyscan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lyscan
            </a>
            ，折腾过基于 Fofa API 的 GUI 信息搜集工具。
          </li>
          <li>
            <strong>代码审计</strong>
            ：整理 Java 代码审计相关的 Skills 与方法论（
            <a
              href="https://github.com/Mydxx/java-audit-skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              java-audit-skills
            </a>
            ），研究反序列化利用链与鉴权逻辑漏洞。
          </li>
          <li>
            <strong>AI × Security</strong>
            ：拆解 AI 驱动的渗透测试 Agent，探索 Agent 协议信任边界与安全研究工作流落地。
          </li>
        </ul>

        <h2>关于本站</h2>
        <p>
          使用 Next.js 16 + MDX + Tailwind CSS v4 构建，静态导出部署在 GitHub Pages，
          暖纸白与墨绿暗夜双主题，支持 <code>⌘K</code> 全站速搜、目录联动、阅读进度与 RSS 订阅。
          欢迎浏览{" "}
          <Link href="/projects">项目页</Link> 或{" "}
          <Link href="/archive">时间归档</Link>。
        </p>

        <h2>联系</h2>
        <ul>
          <li>
            GitHub：{" "}
            <a
              href="https://github.com/Mydxx"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Mydxx
            </a>
          </li>
          <li>
            RSS 订阅： <a href="/rss.xml">/rss.xml</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
