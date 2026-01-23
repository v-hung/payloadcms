import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getManufacturingInfo } from "@/lib/payload-utils";
import { lexicalToHTML } from "@/lib/lexical-utils";
import type { Metadata } from "next";

type LocaleType = "en" | "vi";

type Params = Promise<{
  locale: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const manufacturing = await getManufacturingInfo(locale as LocaleType);

  if (!manufacturing) {
    return {
      title: "Manufacturing",
    };
  }

  return {
    title: manufacturing.seoTitle || "Manufacturing Capability",
    description: manufacturing.seoDescription || "",
  };
}

export default async function ManufacturingPage({
  params,
}: {
  params: Params;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const manufacturing = await getManufacturingInfo(locale as LocaleType);

  if (!manufacturing) {
    notFound();
  }

  const t = await getTranslations("ManufacturingPage");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Headline Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6">{manufacturing.headline}</h1>
        {manufacturing.description && (
          <div
            className="prose max-w-none text-lg"
            dangerouslySetInnerHTML={{
              __html: lexicalToHTML(manufacturing.description),
            }}
          />
        )}
      </div>

      {/* Factory Metrics Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">{t("metricsTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {manufacturing.factorySize && (
            <div className="bg-card p-6 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-2">
                {t("factorySizeLabel")}
              </div>
              <div className="text-3xl font-bold">
                {manufacturing.factorySize}
              </div>
            </div>
          )}

          {manufacturing.productionCapacity && (
            <div className="bg-card p-6 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-2">
                {t("capacityLabel")}
              </div>
              <div className="text-3xl font-bold">
                {manufacturing.productionCapacity}
              </div>
            </div>
          )}

          {manufacturing.leadTimes && (
            <div className="bg-card p-6 rounded-lg border">
              <div className="text-sm text-muted-foreground mb-2">
                {t("leadTimesLabel")}
              </div>
              <div className="text-3xl font-bold">
                {manufacturing.leadTimes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certifications Section */}
      {manufacturing.certifications && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            {t("certificationsTitle")}
          </h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: lexicalToHTML(manufacturing.certifications),
            }}
          />
        </div>
      )}

      {/* Manufacturing Processes Section */}
      {manufacturing.processes && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">{t("processesTitle")}</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: lexicalToHTML(manufacturing.processes),
            }}
          />
        </div>
      )}

      {/* Factory Images Gallery */}
      {manufacturing.images && manufacturing.images.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("galleryTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturing.images.map((image, index) => {
              // Skip if image is just an ID number
              if (typeof image === "number") return null;

              const imageUrl = image.url || "";
              const altText = image.alt || `Factory image ${index + 1}`;

              if (!imageUrl) return null;

              return (
                <div
                  key={index}
                  className="relative aspect-4/3 bg-muted rounded-lg overflow-hidden"
                >
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
