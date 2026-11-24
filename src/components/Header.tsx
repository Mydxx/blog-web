"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/archive", label: "归档" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" },
];

export default function Header() {
  const pathname = usePathname() || "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 h-15 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-mono text-base sm:text-lg font-semibold tracking-tight hover:opacity-85 transition-opacity shrink-0"
        >
          mydxx<span className="text-term">://</span>blog
        </Link>

        <nav className="flex items-center gap-3.5 sm:gap-5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs sm:text-sm transition-colors ${
                  active ? "text-term font-medium" : "text-muted hover:text-ink"
                }`}
              >
                <span className="text-term/55 mr-0.5 hidden md:inline">/</span>
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="搜索文章"
            title="全站速搜 (⌘K 或 /)"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-line bg-surface/70
              font-mono text-xs text-muted hover:border-term hover:text-term transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] opacity-80">⌘K</span>
          </button>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
