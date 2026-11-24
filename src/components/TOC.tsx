"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { TocItem } from "@/lib/toc";

export function MobileTOC({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <details className="xl:hidden mb-8 rounded-lg border border-line bg-surface/80 px-4 py-3 group">
      <summary className="cursor-pointer list-none flex items-center justify-between font-mono text-xs text-muted select-none">
        <span className="inline-flex items-center gap-2">
          <List className="w-3.5 h-3.5 text-term" />
          <span>目录大纲（{items.length} 节）</span>
        </span>
        <span className="text-term group-open:rotate-90 transition-transform">▸</span>
      </summary>
      <ul className="mt-3 pt-3 border-t border-line space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className="block text-xs text-muted hover:text-term transition-colors leading-relaxed"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function TOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 130) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="目录"
      className="hidden xl:block fixed bottom-6 w-56 overflow-y-auto
        right-[calc(50%-620px)] top-28 max-h-[calc(100vh-9rem)]"
    >
      <p className="font-mono text-xs text-muted mb-3">
        <span className="text-term">$</span> toc
      </p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className={item.depth === 3 ? "pl-5" : "pl-3"}>
              <a
                href={`#${item.id}`}
                className={`block py-0.5 text-xs leading-relaxed transition-colors ${
                  active
                    ? "text-term font-medium border-l-2 border-term -ml-[13px] pl-[11px]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
