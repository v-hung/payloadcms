import { getTranslations } from "next-intl/server";
import { getCompanyInfo } from "@/services";
import { ContactForm } from "@/components/forms/contact-form";
import type { Metadata } from "next";

type LocaleType = "en" | "vi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const companyInfo = await getCompanyInfo(locale as LocaleType);

  return {
    title: `${t("title")} - ${companyInfo.companyName || "Company"}`,
    description: t("getInTouch"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const companyInfo = await getCompanyInfo(locale as LocaleType);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("getInTouch")}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Company Information */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">
              {companyInfo.companyName}
            </h2>

            {/* Address */}
            {companyInfo.address && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {companyInfo.address}
                </p>
              </div>
            )}

            {/* Phone */}
            {companyInfo.phone && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Phone</h3>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-primary hover:underline"
                >
                  {companyInfo.phone}
                </a>
              </div>
            )}

            {/* Email */}
            {companyInfo.email && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {companyInfo.email}
                </a>
              </div>
            )}

            {/* Social Media */}
            {companyInfo.socialMedia &&
              Array.isArray(companyInfo.socialMedia) &&
              companyInfo.socialMedia.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    {companyInfo.socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline capitalize"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </section>
        </div>

        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
