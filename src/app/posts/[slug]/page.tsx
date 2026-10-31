import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TagCloud from "@/components/TagCloud";
import TOC from "@/components/TOC";
import CodePre from "@/components/CodePre";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://mydxx.github.io";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/posts/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/posts/${post.slug}/`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { newer, older } = getAdjacentPosts(slug);
  const toc = extractToc(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "zh-CN",
    keywords: post.tags.join(", "),
    url: `${SITE_URL}/posts/${post.slug}/`,
    author: {
      "@type": "Person",
      name: "Mydxx",
      url: "https://github.com/Mydxx",
    },
  };

  return (
    <article>
      {/* 桌面端固定定位目录（xl 及以上屏幕） */}
      <TOC items={toc} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-term mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        cd ..
      </Link>

      <header className="pb-8 mb-10 border-b border-line">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <time>{post.date}</time>
          <span className="text-term/50">·</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-5">
            <TagCloud tags={post.tags} />
          </div>
        )}
      </header>

      <div className="prose max-w-none">
        <MDXRemote
          source={post.content}
          components={{ pre: CodePre }}
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "append",
                    properties: { className: ["anchor"], ariaHidden: true },
                    content: {
                      type: "element",
                      tagName: "span",
                      properties: {},
                      children: [{ type: "text", value: "#" }],
                    },
                  },
                ],
                rehypeHighlight,
              ],
            },
          }}
        />
      </div>

      {/* 上下篇导航 */}
      <nav className="mt-16 pt-8 border-t border-line grid sm:grid-cols-2 gap-4">
        {older ? (
          <Link
            href={`/posts/${older.slug}`}
            className="group border border-line rounded p-4 hover:border-term transition-colors"
          >
            <span className="font-mono text-xs text-muted inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> older
            </span>
            <p className="mt-2 text-sm font-medium leading-snug group-hover:text-term transition-colors">
              {older.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link
            href={`/posts/${newer.slug}`}
            className="group border border-line rounded p-4 hover:border-term transition-colors sm:text-right"
          >
            <span className="font-mono text-xs text-muted inline-flex items-center gap-1 sm:flex-row-reverse">
              newer <ArrowRight className="w-3 h-3" />
            </span>
            <p className="mt-2 text-sm font-medium leading-snug group-hover:text-term transition-colors">
              {newer.title}
            </p>
          </Link>
        )}
      </nav>
    </article>
  );
}
