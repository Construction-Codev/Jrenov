import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import posts from "@/data/post.json";
import ArticleContent from "@/components/ArticleContent";
import ArticleServiceLinks from "@/components/ArticleServiceLinks";
import JsonLd from "@/components/JsonLd";
import { blogPostingJsonLd } from "@/lib/structured-data";
import { frenchDateToIso } from "@/lib/content";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd data={blogPostingJsonLd({ ...post, datePublished: frenchDateToIso(post.date) })} />
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Retour aux articles
        </Link>

        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">{post.title}</h1>
          <div className="flex gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
            <span className="flex items-center gap-1"><User className="w-4 h-4 text-amber-500" />{post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-amber-500" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-amber-500" />Temps de lecture : {post.readTime}</span>
          </div>
        </div>

        <ArticleContent blocks={post.content} />

        <ArticleServiceLinks slug={post.slug} />
      </div>
    </article>
  );
}