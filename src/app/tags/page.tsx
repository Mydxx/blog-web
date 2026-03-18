import { getAllTags } from "@/lib/posts";
import TagCloud from "@/components/TagCloud";

export const metadata = {
  title: "标签 - 我的博客",
  description: "浏览所有文章标签",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">所有标签</h1>

      {tags.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">暂无标签</p>
      ) : (
        <TagCloud tags={tags} />
      )}
    </div>
  );
}
