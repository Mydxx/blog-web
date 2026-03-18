# 个人博客

使用 Next.js 14 + MDX + Tailwind CSS 构建的现代化个人博客。

## 功能特点

- **Next.js 14 App Router** - 现代化的 React 框架
- **MDX 支持** - 在 Markdown 中使用 React 组件
- **暗色模式** - 支持明暗主题切换
- **标签系统** - 按标签分类浏览文章
- **代码高亮** - 优雅的代码展示
- **管理后台** - 简单的文章管理界面
- **GitHub Pages 部署** - 自动化 CI/CD

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run start
```

## 项目结构

```
blog-web/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx            # 首页
│   │   ├── posts/[slug]/       # 文章详情页
│   │   ├── tags/               # 标签相关页面
│   │   ├── about/              # 关于页面
│   │   ├── admin/              # 管理后台
│   │   └── api/                # API 路由
│   ├── components/             # React 组件
│   ├── lib/                    # 工具函数
│   └── content/
│       └── posts/              # MDX 文章目录
│           └── *.mdx           # 文章文件
└── public/                    # 静态资源
```

## 写作指南

### 创建新文章

在 `src/content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2024-03-19"
tags: ["标签1", "标签2"]
excerpt: "文章摘要..."
---

# 文章正文

使用 Markdown 编写内容...
```

### 管理后台

访问 `/admin` 进入管理后台：

- 用户名：无（只需密码）
- 密码：`admin123`（生产环境请修改）

管理后台功能：
- 查看所有文章列表
- 保存文章草稿到本地
- 编辑文章元信息

**注意**：由于是静态博客，文章内容需要手动编辑 MDX 文件。

## 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到 `main` 分支
3. 在仓库 Settings > Pages 中启用 GitHub Pages
4. 选择 Source: GitHub Actions
5. 推送后会自动部署

## 自定义配置

### 修改博客信息

- 标题/描述：`src/app/layout.tsx` 中的 metadata
- 关于页面：`src/app/about/page.tsx`
- 样式：`src/app/globals.css`

### 修改管理密码

在 `src/app/admin/page.tsx` 中修改密码验证逻辑。

### 添加更多页面

在 `src/app/` 下创建新的路由目录即可。

## 技术栈

- **框架**：Next.js 14
- **样式**：Tailwind CSS
- **内容**：MDX + gray-matter
- **图标**：Lucide React
- **部署**：GitHub Actions + GitHub Pages

## License

MIT
