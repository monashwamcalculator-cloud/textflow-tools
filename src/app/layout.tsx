import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "TextFlow | Premium Translation & Text Tools",
  description: "A comprehensive suite of translation tools, slang translators, writing utilities, and creative text transformations.",
};

import { getAllToolConfigs } from "@/lib/tools/registry";
import { getAllTools as getOldTools } from "@/lib/content";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const newTools = getAllToolConfigs().map(t => ({
    name: t.name,
    slug: t.slug,
    category: t.category,
    description: t.shortDescription,
    url: `/${t.slug}`
  }));

  const oldTools = getOldTools().map(t => ({
    name: t.name,
    slug: t.slug,
    category: t.categoryId,
    description: t.shortDescription,
    url: `/tools/${t.slug}`
  }));

  const allSearchTools = [...newTools, ...oldTools];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <ThemeProvider>
          <Header tools={allSearchTools} />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
