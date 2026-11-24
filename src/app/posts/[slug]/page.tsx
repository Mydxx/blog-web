import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import {
  getPostBySlug,
  getPostSlugs,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import TagCloud from "@/components/TagCloud";
import TOC, { MobileTOC } from "@/components/TOC";
import CodePre from "@/components/CodePre";
import ReadingProgress from "@/components/ReadingProgress";

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
  const related = getRelatedPosts(slug, 3);
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
      <ReadingProgress />
      <TOC items={toc} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-term mb-7 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        cd ..
      </Link>

      <header className="pb-8 mb-8 border-b border-line">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <time className="tabular-nums">{post.date}</time>
          <span className="text-term/50">·</span>
          <span>{post.readingTime}</span>
          <span className="text-term/50">·</span>
          <span>约 {post.wordCount} 字</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-5">
            <TagCloud tags={post.tags} />
          </div>
        )}
      </header>

      <MobileTOC items={toc} />

      <div className="prose max-w-none">
        <MDXRemote
          source={post.content}
          components={{ pre: CodePre }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
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

      {/* 相关阅读 */}
      {related.length > 0 && (
        <section className="mt-14 pt-8 border-t border-line">
          <p className="font-mono text-xs text-muted mb-3.5 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-term" />
            <span>相关阅读</span>
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/posts/${item.slug}`}
                className="group rounded-lg border border-line bg-surface/75 p-3.5 hover:border-term/50 hover:bg-surface transition-all"
              >
                <time className="font-mono text-[11px] text-muted tabular-nums">
                  {item.date}
                </time>
                <p className="mt-1.5 text-xs sm:text-sm font-medium leading-snug line-clamp-2 group-hover:text-term transition-colors">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 上下篇导航 */}
      <nav className="mt-10 pt-8 border-t border-line grid sm:grid-cols-2 gap-4">
        {older ? (
          <Link
            href={`/posts/${older.slug}`}
            className="group rounded-lg border border-line bg-surface/60 p-4 hover:border-term transition-colors"
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
            className="group rounded-lg border border-line bg-surface/60 p-4 hover:border-term transition-colors sm:text-right"
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
