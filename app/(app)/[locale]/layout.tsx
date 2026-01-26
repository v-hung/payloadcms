import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin-ext"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
