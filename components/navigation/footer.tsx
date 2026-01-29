"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const navigationLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "manufacturing", href: "/manufacturing" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("Footer.companyInfo")}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Company Name</p>
              <p>Address will load from CMS</p>
              <p>Email: info@company.com</p>
              <p>Phone: +84 xxx xxx xxx</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("Footer.quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navigationLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(`Navigation.${key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("Footer.followUs")}
            </h3>
            <div className="flex gap-4">
              {/* Social media links will be populated from CMS */}
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Company Name. {t("Footer.allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
