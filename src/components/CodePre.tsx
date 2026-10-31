"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** MDX pre 组件包装：右上角复制按钮（代码块底色恒为暗色） */
export default function CodePre({
  children,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const text = preRef.current?.querySelector("code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // 剪贴板不可用（非安全上下文）时静默失败
    }
  };

  return (
    <div className="group relative">
      <pre ref={preRef} {...rest}>
        {children}
      </pre>
      <button
        onClick={onCopy}
        aria-label="复制代码"
        className="absolute right-3 top-3 p-1.5 rounded border border-white/10 bg-[#14181a]/90
          text-[#8a948b] opacity-0 group-hover:opacity-100 focus:opacity-100
          hover:text-[#3ddc97] hover:border-[#3ddc97]/40 transition-all"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
