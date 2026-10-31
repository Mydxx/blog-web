# mydxx://blog

个人博客：安全研究 × AI × 工程实践。终端极简风，在线访问 [mydxx.github.io](https://mydxx.github.io)。

## 技术栈

- **Next.js 16** App Router + 静态导出（SSG）
- **MDX** 文章格式，`rehype-slug` + `rehype-highlight` 代码高亮
- **Tailwind CSS 4**，CSS 变量驱动的双主题（暗色优先）
- **GitHub Actions** 自动构建部署到 GitHub Pages

## 写文章

在 `src/content/posts/` 新建 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2026-01-01"
tags: ["标签1", "标签2"]
excerpt: "列表页摘要"
---

正文，支持 MDX 与代码高亮。
```

构建时自动生成文章列表、标签页、RSS（`/rss.xml`）与上下篇导航。

## 本地开发

```bash
npm install
npm run dev    # 开发模式
npm run build  # 构建到 out/
```

## 部署

推送 `main` 分支后 Actions 自动执行：构建 → 复制 `out/` 到 `docs/` → 发布 GitHub Pages。
