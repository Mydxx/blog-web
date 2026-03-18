"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedDraft, setSavedDraft] = useState<any>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn !== "true") {
      router.push("/admin");
    } else {
      setIsLoggedIn(true);

      // 从 localStorage 加载草稿
      const draft = localStorage.getItem("blogDraft");
      if (draft) {
        const parsed = JSON.parse(draft);
        setTitle(parsed.title || "");
        setContent(parsed.content || "");
        setTags(parsed.tags || "");
        setExcerpt(parsed.excerpt || "");
        setDate(parsed.date || "");
      }
    }
  }, [slug, router]);

  // 自动保存草稿到 localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const draft = { title, content, tags, excerpt, date };
      localStorage.setItem("blogDraft", JSON.stringify(draft));
      setSavedDraft(draft);
    }
  }, [title, content, tags, excerpt, date, isLoggedIn]);

  const handleSaveDraft = () => {
    const draft = { title, content, tags, excerpt, date };
    localStorage.setItem("blogDraft", JSON.stringify(draft));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearDraft = () => {
    localStorage.removeItem("blogDraft");
    setTitle("");
    setContent("");
    setTags("");
    setExcerpt("");
    setDate("");
    setSaved(false);
  };

  const postSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{slug ? "编辑文章" : "新建文章"}</h1>
        <div className="flex gap-4">
          <Link
            href="/admin/list"
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            返回列表
          </Link>
          <button
            onClick={handleSaveDraft}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {saved ? "已保存 ✓" : "保存草稿"}
          </button>
          <button
            onClick={handleClearDraft}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>提示：</strong> 这是一个静态博客。文章内容保存在本地草稿中。
          要发布文章，请在本地编辑 MDX 文件并推送到 GitHub。
          文件路径：<code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">src/content/posts/</code>
        </p>
        {postSlug && (
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
            文章文件名将保存为：<code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{postSlug}.mdx</code>
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="文章标题"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">标签（用逗号分隔）</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              placeholder="标签1, 标签2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">摘要</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            placeholder="文章摘要"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">内容（Markdown）</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 font-mono"
            rows={20}
            placeholder="使用 Markdown 编写文章内容..."
          />
        </div>

        {content && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">预览</h3>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap">{content}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <EditorContent />
    </Suspense>
  );
}
