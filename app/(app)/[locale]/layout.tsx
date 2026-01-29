import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import "./globals.css";
import { getCompanyInfo } from "@/services";
import { LocaleType } from "@/lib/utils/locale";

const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-inter",
});

// const notoSansJp = Noto_Sans_JP({
//   weight: ["400", "700"],
//   display: "swap",
//   variable: "--font-noto-sans-jp",
// });

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: LocaleType;
  }>;
}>) {
  const { locale } = await params;

  const companyInfo = await getCompanyInfo();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen`}
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        <NextIntlClientProvider>
          <Header companyInfo={companyInfo} />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
