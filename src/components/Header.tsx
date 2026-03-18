import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          我的博客
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            首页
          </Link>
          <Link href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            标签
          </Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            关于
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
