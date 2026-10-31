import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

/**
 * 从 MDX 源码提取 h2/h3 标题生成目录。
 * slug 与 rehype-slug 一致：同用 github-slugger，按文档顺序去重。
 * 注意rehype-slug 是在 Markdown 语法剥离后的文本上取 slug，
 * 因此这里先剥离行内标记再喂给 slugger。
 */
export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    if (!text) continue;

    items.push({ id: slugger.slug(text), text, depth });
  }

  return items;
}
