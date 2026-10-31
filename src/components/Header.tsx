import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" },
];

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          mydxx<span className="text-term">://</span>blog
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm text-muted hover:text-term transition-colors"
            >
              <span className="text-term/60 mr-0.5 hidden sm:inline">/</span>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
