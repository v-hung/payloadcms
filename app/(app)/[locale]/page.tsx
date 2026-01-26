import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import {
  getCompanyInfo,
  getProducts,
  getManufacturingInfo,
  getPosts,
} from "@/services";
import { ProductCard } from "@/components/product/product-card";
import { PostCard } from "@/components/content/post-card";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { Metadata } from "next";

type LocaleType = "en" | "vi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const companyInfo = await getCompanyInfo(locale as LocaleType);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: companyInfo.companyName || t("title"),
    description: companyInfo.tagline || t("subtitle"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [companyInfo, productsData, manufacturing, postsData] =
    await Promise.all([
      getCompanyInfo(locale as LocaleType),
      getProducts({ locale: locale as LocaleType, featured: true, limit: 6 }),
      getManufacturingInfo(locale as LocaleType),
      getPosts({
        locale: locale as LocaleType,
        featured: true,
        limit: 3,
      }),
    ]);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const featuredProducts = productsData.products;
  const featuredPosts = postsData.posts;

  const productTranslations = {
    viewDetails: t("viewAllProducts"),
    featured: "Featured",
    bestSeller: "Best Seller",
  };

  const postTranslations = {
    readMore: t("readMore"),
    publishedOn: t("publishedOn"),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        {/* Company Logo */}
        {companyInfo.logo &&
          typeof companyInfo.logo === "object" &&
          "url" in companyInfo.logo &&
          companyInfo.logo.url && (
            <div className="flex justify-center mb-8">
              <Image
                src={companyInfo.logo.url}
                alt={companyInfo.companyName || "Company Logo"}
                width={200}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          )}

        {/* Company Name */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {companyInfo.companyName || t("title")}
        </h1>

        {/* Tagline */}
        {companyInfo.tagline && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {companyInfo.tagline}
          </p>
        )}

        {/* Overview */}
        {companyInfo.overview && (
          <div className="max-w-3xl mx-auto text-lg leading-relaxed">
            {typeof companyInfo.overview === "string" ? (
              <p>{companyInfo.overview}</p>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(companyInfo.overview),
                }}
              />
            )}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("featuredProducts")}
        </h2>
        {featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  translations={productTranslations}
                />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t("viewAllProducts")}
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            No featured products available
          </p>
        )}
      </section>

      {/* Manufacturing Capability Highlight */}
      {manufacturing && (
        <section className="mb-16 bg-muted/50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {manufacturing.headline}
          </h2>
          {manufacturing.description && (
            <div className="max-w-3xl mx-auto text-center mb-6">
              <p className="text-lg text-muted-foreground line-clamp-3">
                {convertLexicalToPlaintext({ data: manufacturing.description })}
              </p>
            </div>
          )}
          {(manufacturing.factorySize ||
            manufacturing.productionCapacity ||
            manufacturing.leadTimes) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              {manufacturing.factorySize && (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("manufacturingFactorySize")}
                  </div>
                  <div className="text-2xl font-bold">
                    {manufacturing.factorySize}
                  </div>
                </div>
              )}
              {manufacturing.productionCapacity && (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("manufacturingCapacity")}
                  </div>
                  <div className="text-2xl font-bold">
                    {manufacturing.productionCapacity}
                  </div>
                </div>
              )}
              {manufacturing.leadTimes && (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {t("manufacturingLeadTimes")}
                  </div>
                  <div className="text-2xl font-bold">
                    {manufacturing.leadTimes}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="text-center">
            <Link
              href="/manufacturing"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("manufacturingLearnMore")}
            </Link>
          </div>
        </section>
      )}

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("featuredArticles")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                translations={postTranslations}
              />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("viewAllArticles")}
            </Link>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">{t("aboutSection")}</h2>
        <a
          href="/about"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t("learnMore")}
        </a>
      </section>
    </div>
  );
}
