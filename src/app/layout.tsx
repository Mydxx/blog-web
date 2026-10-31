import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mydxx.github.io"),
  title: {
    default: "Mydxx // Blog",
    template: "%s - Mydxx // Blog",
  },
  description: "安全研究 × AI × 工程实践 — 渗透测试、代码审计、AI 应用的个人博客",
  openGraph: {
    title: "Mydxx // Blog",
    description: "安全研究 × AI × 工程实践",
    url: "https://mydxx.github.io",
    siteName: "Mydxx // Blog",
    type: "website",
    locale: "zh_CN",
  },
};

// 首帧渲染前同步应用主题，避免暗色模式闪白
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-paper text-ink dark:bg-night dark:text-moon min-h-screen flex flex-col transition-colors duration-200`}
      >
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-5 sm:px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
