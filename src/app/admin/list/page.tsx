"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
}

// 静态文章列表 - 手动同步更新
const STATIC_POSTS: Post[] = [
  {
    slug: "nextjs-mdx-blog",
    title: "使用 Next.js 和 MDX 构建博客",
    date: "2024-03-19",
    tags: ["Next.js", "MDX", "教程"],
    excerpt: "本文介绍如何使用 Next.js 14 和 MDX 从零开始构建一个现代化的个人博客...",
    readingTime: "5 min read"
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript 最佳实践指南",
    date: "2024-03-18",
    tags: ["TypeScript", "编程语言", "教程"],
    excerpt: "本文总结了 TypeScript 开发中的一些最佳实践...",
    readingTime: "4 min read"
  },
  {
    slug: "dev-environment",
    title: "我的开发环境配置",
    date: "2024-03-17",
    tags: ["工具", "效率", "开发环境"],
    excerpt: "分享我的日常开发环境配置...",
    readingTime: "3 min read"
  }
];

export default function AdminListPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts] = useState<Post[]>(STATIC_POSTS);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/editor"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            新建文章
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>提示：</strong> 这是一个静态博客。文章文件位于 <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">src/content/posts/</code> 目录。
          要管理文章，请在本地编辑 MDX 文件然后推送到 GitHub。
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/editor?slug=${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                编辑
              </Link>
              <Link
                href={`/posts/${post.slug}`}
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:underline"
              >
                查看
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
