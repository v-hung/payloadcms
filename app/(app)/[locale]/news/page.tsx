import { getTranslations } from "next-intl/server";
import { getPosts } from "@/services";
import { PostCard } from "@/components/content/post-card";
import type { Metadata } from "next";

type LocaleType = "en" | "vi";

type Params = Promise<{
  locale: string;
}>;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.News");

  return {
    title: t("title"),
    description: t("latestNews"),
  };
}

export default async function NewsPage({ params }: { params: Params }) {
  const { locale } = await params;

  const postsData = await getPosts({
    locale: locale as LocaleType,
    limit: 12,
  });

  const t = await getTranslations("Pages.News");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>

      {postsData.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsData.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          {t("noArticles")}
        </p>
      )}
    </div>
  );
}
