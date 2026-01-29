import { getTranslations } from "next-intl/server";
import { getCompanyInfo } from "@/services";
import type { Metadata } from "next";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

type LocaleType = "en" | "vi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const companyInfo = await getCompanyInfo(locale as LocaleType);
  const t = await getTranslations("Pages.About");

  return {
    title: `${t("title")} - ${companyInfo.companyName || "Company"}`,
    description: companyInfo.tagline || "About our company",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const companyInfo = await getCompanyInfo(locale as LocaleType);
  const t = await getTranslations("Pages.About");

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        {companyInfo.tagline && (
          <p className="text-xl text-muted-foreground">{companyInfo.tagline}</p>
        )}
      </header>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Vision Section */}
        {companyInfo.vision && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-center mb-6">
              {t("ourVision")}
            </h2>
            <div className="prose prose-lg max-w-none">
              {typeof companyInfo.vision === "string" ? (
                <p>{companyInfo.vision}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertLexicalToHTML({ data: companyInfo.vision }),
                  }}
                />
              )}
            </div>
          </section>
        )}

        {/* Mission Section */}
        {companyInfo.mission && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-center mb-6">
              {t("ourMission")}
            </h2>
            <div className="prose prose-lg max-w-none">
              {typeof companyInfo.mission === "string" ? (
                <p>{companyInfo.mission}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertLexicalToHTML({ data: companyInfo.mission }),
                  }}
                />
              )}
            </div>
          </section>
        )}

        {/* Core Values Section */}
        {companyInfo.coreValues && (
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-center mb-6">
              {t("coreValues")}
            </h2>
            <div className="prose prose-lg max-w-none">
              {typeof companyInfo.coreValues === "string" ? (
                <p>{companyInfo.coreValues}</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertLexicalToHTML({
                      data: companyInfo.coreValues,
                    }),
                  }}
                />
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
