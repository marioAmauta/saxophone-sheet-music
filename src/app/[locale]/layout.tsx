import "./styles.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/api/uploadthing/core";

import { routing } from "@/i18n/routing";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`
    },
    description: t("description")
  };
}

type LocaleLayoutProps = PropsWithChildren<{ params: Params<{ locale: Locale }> }>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Header />
            <main className="flex-1">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer />
            <Toaster richColors position="top-center" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
