import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Product } from "@/payload-types";

interface ProductCardProps {
  product: Product;
  translations: {
    viewDetails: string;
    featured: string;
    bestSeller: string;
  };
}

export function ProductCard({ product, translations }: ProductCardProps) {
  // Get first image
  const firstImage =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : null;

  const imageUrl =
    firstImage && typeof firstImage === "object" && "url" in firstImage
      ? firstImage.url
      : null;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative w-full aspect-4/3 bg-muted overflow-hidden rounded-t-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name || "Product"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        {/* Badges */}
        <div className="flex gap-2 mb-2">
          {product.featured && (
            <Badge variant="default">{translations.featured}</Badge>
          )}
          {product.bestSeller && (
            <Badge variant="secondary">{translations.bestSeller}</Badge>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Excerpt */}
        {product.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.excerpt}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm text-primary hover:underline font-medium"
        >
          {translations.viewDetails} →
        </Link>
      </CardFooter>
    </Card>
  );
}
