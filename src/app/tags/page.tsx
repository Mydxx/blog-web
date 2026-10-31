import { getAllTags, getAllPosts } from "@/lib/posts";
import TagCloud from "@/components/TagCloud";

export const metadata = {
  title: "标签",
  description: "按标签浏览全部文章",
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });
  });

  return (
    <div>
      <p className="font-mono text-sm text-muted mb-2">
        <span className="text-term">$</span> ls ./tags
      </p>
      <div className="mt-4">
        {tags.length === 0 ? (
          <p className="text-muted font-mono text-sm">total 0 — 暂无标签</p>
        ) : (
          <TagCloud tags={tags} counts={counts} />
        )}
      </div>
    </div>
  );
}
