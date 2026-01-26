import { getTranslations } from "next-intl/server";
import { getProductBySlug } from "@/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

type LocaleType = "en" | "vi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale as LocaleType);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seoTitle || product.name || "Product",
    description: product.seoDescription || product.excerpt || "",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale as LocaleType);
  const t = await getTranslations({ locale, namespace: "ProductDetail" });

  if (!product) {
    notFound();
  }

  // Get product images
  const images = Array.isArray(product.images) ? product.images : [];
  const productImages = images
    .map((img) => {
      if (typeof img === "object" && img !== null && "url" in img) {
        return img;
      }
      return null;
    })
    .filter((img) => img !== null);

  // Get categories
  const categories = Array.isArray(product.categories)
    ? product.categories
    : [];
  const productCategories = categories
    .map((cat) => {
      if (
        typeof cat === "object" &&
        cat !== null &&
        "name" in cat &&
        "slug" in cat
      ) {
        return cat;
      }
      return null;
    })
    .filter((cat) => cat !== null);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        {" > "}
        <Link href="/products" className="hover:text-foreground">
          {t("backToProducts")}
        </Link>
        {productCategories.length > 0 && (
          <>
            {" > "}
            <Link
              href={`/products?category=${productCategories[0].slug}`}
              className="hover:text-foreground"
            >
              {productCategories[0].name}
            </Link>
          </>
        )}
        {" > "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images Section */}
        <div className="space-y-4">
          {productImages.length > 0 ? (
            <>
              {/* Main Image */}
              <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={productImages[0].url || ""}
                  alt={product.name || "Product"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.slice(1, 5).map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img.url || ""}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12.5vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="relative w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">No images available</p>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Title and Badges */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex gap-2 mb-4">
              {product.featured && <Badge variant="default">Featured</Badge>}
              {product.bestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
            </div>

            {/* Categories */}
            {productCategories.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    #{cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Excerpt */}
          {product.excerpt && (
            <p className="text-lg text-muted-foreground">{product.excerpt}</p>
          )}

          {/* Description */}
          {product.description && (
            <section>
              <h2 className="text-2xl font-bold mb-4">{t("description")}</h2>
              <div className="prose max-w-none">
                {typeof product.description === "string" ? (
                  <p>{product.description}</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertLexicalToHTML({
                        data: product.description,
                      }),
                    }}
                  />
                )}
              </div>
            </section>
          )}

          {/* Specifications */}
          {product.specifications && (
            <section>
              <h2 className="text-2xl font-bold mb-4">{t("specifications")}</h2>
              <div className="prose max-w-none">
                {typeof product.specifications === "string" ? (
                  <p>{product.specifications}</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertLexicalToHTML({
                        data: product.specifications,
                      }),
                    }}
                  />
                )}
              </div>
            </section>
          )}

          {/* Benefits */}
          {product.benefits && (
            <section>
              <h2 className="text-2xl font-bold mb-4">{t("benefits")}</h2>
              <div className="prose max-w-none">
                {typeof product.benefits === "string" ? (
                  <p>{product.benefits}</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertLexicalToHTML({ data: product.benefits }),
                    }}
                  />
                )}
              </div>
            </section>
          )}

          {/* Usage Instructions */}
          {product.usageInstructions && (
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {t("usageInstructions")}
              </h2>
              <div className="prose max-w-none">
                {typeof product.usageInstructions === "string" ? (
                  <p>{product.usageInstructions}</p>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertLexicalToHTML({
                        data: product.usageInstructions,
                      }),
                    }}
                  />
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t("relatedProducts")}
        </h2>
        <p className="text-center text-muted-foreground">
          Related products will be displayed here
        </p>
      </section>
    </div>
  );
}
