import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 我的博客. 使用 Next.js 和 MDX 构建.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              关于
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
