import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getPostBySlug } from "@/services";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { format } from "date-fns";
import type { Metadata } from "next";

type Params = Promise<{
  slug: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

export default async function NewsDetailPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations();

  const featuredImage =
    post.featuredImage &&
    typeof post.featuredImage === "object" &&
    "url" in post.featuredImage &&
    post.featuredImage.url
      ? post.featuredImage.url
      : null;

  const publishDate = post.publishedAt
    ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
    : "";

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {" > "}
        <Link href="/news" className="hover:text-foreground">
          {t("Pages.News.title")}
        </Link>
        {" > "}
        <span className="text-foreground">{post.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <Image
              src={featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {publishDate && (
            <p className="text-muted-foreground">
              {t("Common.publishedOn")} {publishDate}
            </p>
          )}
        </header>

        {/* Article Content */}
        {post.content && (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: convertLexicalToHTML({ data: post.content }),
            }}
          />
        )}
      </article>

      {/* Back to News Link */}
      <div className="max-w-4xl mx-auto mt-12">
        <Link
          href="/news"
          className="inline-flex items-center text-primary hover:underline"
        >
          ← Back to {t("Pages.News.title")}
        </Link>
      </div>
    </div>
  );
}
