import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DinoGame from "@/components/DinoGame";

export const metadata = {
  title: "Dino Runner",
  description: "经典像素小恐龙跑酷彩蛋页 — 按空格键开玩",
};

export default function DinoPage() {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-term mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        cd ..
      </Link>

      <p className="font-mono text-sm text-muted">
        <span className="text-term">$</span> ./dino --play
      </p>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
        像素小恐龙跑酷
      </h1>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        从 GitHub 主页点过来的朋友欢迎摸鱼两分钟——支持空格跳跃、下蹲躲飞龙与本地最高分记录。
      </p>

      <div className="mt-8">
        <DinoGame />
      </div>
    </div>
  );
}
