import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">欢迎来到我的博客</h1>
        <p className="text-gray-600 dark:text-gray-400">
          这里分享我的技术见解、生活感悟和项目经验。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">最新文章</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">暂无文章，敬请期待！</p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
