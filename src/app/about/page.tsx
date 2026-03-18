export const metadata = {
  title: "关于 - 我的博客",
  description: "关于我和这个博客",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">关于</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p>
          你好！欢迎来到我的个人博客。
        </p>

        <h2>关于我</h2>
        <p>
          我是一名热爱技术的开发者，喜欢分享知识和经验。这个博客是我记录学习心得、技术见解和生活感悟的地方。
        </p>

        <h2>技术栈</h2>
        <ul>
          <li>前端: Next.js, React, Vue</li>
          <li>样式: Tailwind CSS</li>
          <li>后端: Node.js, Python</li>
          <li>数据库: PostgreSQL, MongoDB</li>
        </ul>

        <h2>联系方式</h2>
        <p>
          如果你有任何问题或建议，欢迎通过以下方式联系我：
        </p>
        <ul>
          <li>GitHub: github.com/yourusername</li>
          <li>Email: your.email@example.com</li>
        </ul>
      </div>
    </div>
  );
}
