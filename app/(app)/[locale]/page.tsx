import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getCompanyInfo, getProducts, getPosts } from "@/services";
import { ProductCard } from "@/components/product/product-card";
import { PostCard } from "@/components/content/post-card";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const companyInfo = await getCompanyInfo();
  const t = await getTranslations("Pages.Home");

  return {
    title: companyInfo.companyName || t("title"),
    description: companyInfo.tagline || t("subtitle"),
  };
}

export default async function Home() {
  const [companyInfo, productsData, postsData] = await Promise.all([
    getCompanyInfo(),
    getProducts({ featured: true, limit: 6 }),
    getPosts({
      featured: true,
      limit: 3,
    }),
  ]);
  const t = await getTranslations();

  const featuredProducts = productsData.products;
  const featuredPosts = postsData.posts;

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
          {companyInfo.companyName || t("Pages.Home.title")}
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
                  __html: convertLexicalToHTML({ data: companyInfo.overview }),
                }}
              />
            )}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("Pages.Home.featuredProducts")}
        </h2>
        {featuredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t("Pages.Home.viewAllProducts")}
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">
            {t("Pages.Home.noFeaturedProductsAvailable")}
          </p>
        )}
      </section>

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("Pages.Home.featuredArticles")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("Pages.Home.viewAllArticles")}
            </Link>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t("Pages.Home.aboutSection")}
        </h2>
        <Link
          href="/about"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t("Actions.learnMore")}
        </Link>
      </section>
    </div>
  );
}
