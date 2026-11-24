"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="返回顶部"
      className="fixed right-5 bottom-6 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        border border-line bg-surface/90 backdrop-blur-md font-mono text-xs text-muted
        shadow-sm hover:border-term hover:text-term transition-all"
    >
      <ArrowUp className="w-3.5 h-3.5" />
      top
    </button>
  );
}
