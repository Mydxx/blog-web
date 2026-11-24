"use client";

import { isValidElement, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

function detectLanguage(children: React.ReactNode): string {
  if (isValidElement<{ className?: string }>(children)) {
    const cls = children.props?.className || "";
    const match = cls.match(/language-([a-z0-9_+-]+)/i);
    if (match) return match[1].toLowerCase();
  }
  return "code";
}

/** MDX pre 组件包装：优雅终端标题栏 + 语言标识 + 右上角复制反馈 */
export default function CodePre({
  children,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = detectLanguage(children);

  const onCopy = async () => {
    const text = preRef.current?.querySelector("code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="my-7 rounded-lg overflow-hidden border border-[color-mix(in_srgb,var(--term)_18%,transparent)] bg-[var(--code-bg)] shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-[#3ddc97]/55" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7f8c82] ml-1">
            {lang}
          </span>
        </div>
        <button
          onClick={onCopy}
          aria-label="复制代码"
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[11px]
            text-[#8a948b] hover:text-[#3ddc97] hover:bg-white/[0.05] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#3ddc97]" />
              <span className="text-[#3ddc97]">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>
      <pre ref={preRef} {...rest}>
        {children}
      </pre>
    </div>
  );
}
