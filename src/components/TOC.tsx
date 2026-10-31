"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export default function TOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => {
      // 取视口顶部 120px 之上最后一个标题作为当前小节
      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) {
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
      className="hidden xl:block fixed bottom-6 w-60 overflow-y-auto
        right-[calc(50%-624px)] top-28 max-h-[calc(100vh-9rem)]"
    >
      <p className="font-mono text-xs text-muted mb-3">
        <span className="text-term">$</span> toc
      </p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className={item.depth === 3 ? "pl-6" : "pl-3"}>
              <a
                href={`#${item.id}`}
                className={`block py-0.5 text-xs leading-relaxed transition-colors ${
                  active
                    ? "text-term border-l border-term -ml-px"
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
