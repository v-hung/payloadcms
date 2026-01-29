"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Post } from "@/types/payload";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations("Common");

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
    <Card className="overflow-hidden h-full flex flex-col">
      {featuredImage && (
        <div className="relative aspect-video bg-muted">
          <Image
            src={featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link
            href={`/news/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </CardTitle>
        {publishDate && (
          <p className="text-sm text-muted-foreground">
            {t("publishedOn")} {publishDate}
          </p>
        )}
      </CardHeader>
      <CardContent className="grow flex flex-col justify-between">
        {post.excerpt && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/news/${post.slug}`}
          className="text-primary hover:underline font-medium"
        >
          {t("readMore")} →
        </Link>
      </CardContent>
    </Card>
  );
}
