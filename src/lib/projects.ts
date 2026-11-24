export interface ProjectItem {
  name: string;
  tagline: string;
  description: string;
  status: "active" | "maintained" | "archived";
  stack: string[];
  repo?: string;
  postSlug?: string;
  highlight?: boolean;
}

export const projects: ProjectItem[] = [
  {
    name: "TraceBurp",
    tagline: "免代理、免装证书的浏览器内安全抓包与重放工作台",
    description:
      "零运行时依赖的 MV3 跨端扩展（Chrome / Edge / Firefox）。支持全屏抓包、精确路径静默响应替换（Match & Replace）、DNR Cookie/Origin 覆写重放、Diff 对比、原位编解码与全能安全编解码器。",
    status: "active",
    stack: ["Manifest V3", "CDP", "WebExtensions", "IndexedDB", "Zero-Dep"],
    repo: "https://github.com/Mydxx/TraceBurp",
    postSlug: "traceburp-browser-proxy-design",
    highlight: true,
  },
  {
    name: "Lyscan",
    tagline: "专注低误报与软 404 识别的轻量目录扫描器",
    description:
      "用造轮子的方式吃透目录扫描器的并发模型、字典策略与动态基准软 404 过滤，适合授权测试中的快速资产探测。",
    status: "maintained",
    stack: ["Python", "AsyncIO", "HTTP", "Pentest"],
    repo: "https://github.com/Mydxx/Lyscan",
    postSlug: "lyscan-design-notes",
    highlight: true,
  },
  {
    name: "java-audit-skills",
    tagline: "面向 AI Agent 与安全研究员的 Java 代码审计知识库",
    description:
      "将反序列化利用链、危险 Sink 识别与常见框架鉴权绕过沉淀为结构化 Skills，配合 Agent 工作流提升审计效率。",
    status: "active",
    stack: ["Java", "Code Audit", "AI Skills", "Security"],
    repo: "https://github.com/Mydxx/java-audit-skills",
    postSlug: "java-deserialization-audit",
    highlight: true,
  },
  {
    name: "Fofa GUI",
    tagline: "基于 Fofa API 的桌面端资产测绘与分页导出工具",
    description:
      "解决高频空间测绘查询中的语法复用、深度翻页陷阱与结果去重，在授权范围内提升信息搜集效率。",
    status: "maintained",
    stack: ["Python", "Fofa API", "GUI", "Recon"],
    postSlug: "fofa-gui-tool-practice",
  },
  {
    name: "blog-web",
    tagline: "你正在阅读的终端极简风静态博客",
    description:
      "基于 Next.js 16 + MDX + Tailwind CSS v4 构建，暖纸白与墨绿暗夜双主题，支持全站速搜、目录联动、RSS 与 GitHub Pages 自动部署。",
    status: "active",
    stack: ["Next.js 16", "MDX", "Tailwind v4", "TypeScript"],
    repo: "https://github.com/Mydxx/blog-web",
    postSlug: "blog-terminal-redesign",
  },
];
