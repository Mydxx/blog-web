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

export default function AdminListPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);
      // 从 API 获取文章列表
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch(() => setPosts([]));
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
        {posts.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            暂无文章，请先在本地创建 MDX 文件
          </p>
        )}
      </div>
    </div>
  );
}
