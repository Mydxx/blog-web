export const metadata = {
  title: "关于",
  description: "关于 Mydxx 与这个博客",
};

export default function AboutPage() {
  return (
    <div>
      <p className="font-mono text-sm text-muted mb-2">
        <span className="text-term">$</span> cat about.txt
      </p>

      <div className="prose max-w-none mt-6">
        <h2>我是谁</h2>
        <p>
          Mydxx，安全研究方向，关注 AI 与网络安全的交叉地带。
          日常在渗透测试、代码审计、安全工具开发之间切换，也写一些桌面应用和 Web 工程。
        </p>

        <h2>我在做什么</h2>
        <ul>
          <li>
            <strong>安全工具</strong>
            ：维护目录扫描器{" "}
            <a
              href="https://github.com/Mydxx/Lyscan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lyscan
            </a>
            ，折腾过基于 Fofa API 的 GUI 信息搜集工具。
          </li>
          <li>
            <strong>代码审计</strong>
            ：整理 Java 代码审计相关的 Skills 与方法论（
            <a
              href="https://github.com/Mydxx/java-audit-skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              java-audit-skills
            </a>
            ），研究反序列化利用链。
          </li>
          <li>
            <strong>AI × Security</strong>
            ：拆解 AI 驱动的渗透测试 Agent，探索 AI Agent
            工作流在安全研究中的落地。
          </li>
          <li>
            <strong>桌面开发</strong>
            ：用 Electron 写过笔记工具，踩过不少安全加固的坑。
          </li>
        </ul>

        <h2>关于本站</h2>
        <p>
          使用 Next.js + MDX 构建，静态导出部署在 GitHub Pages，
          终端极简风设计——毕竟命令行才是安全研究者的家。
          所有文章源码与构建流程都是公开的。
        </p>

        <h2>联系</h2>
        <ul>
          <li>
            GitHub：{" "}
            <a
              href="https://github.com/Mydxx"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Mydxx
            </a>
          </li>
          <li>
            RSS 订阅：{" "}
            <a href="/rss.xml">/rss.xml</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
