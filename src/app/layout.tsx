import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalSearchClient } from "@/components/GlobalSearchClient";
import { getAllTools } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "TextFlow | Free Online Text Utilities & Translators",
  description: "A comprehensive suite of free text tools, slang translators, writing utilities, and code converters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tools = getAllTools();
  
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-[#0f111a] text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider>
          <header className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <a href="/" className="text-xl font-bold text-indigo-700 dark:text-indigo-400">TextFlow</a>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <a href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tools</a>
                  <a href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Guides</a>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <GlobalSearchClient tools={tools} />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
            {children}
          </main>
          <footer className="bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} TextFlow. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/about" className="hover:text-gray-900 dark:hover:text-gray-200">About</a>
                <a href="/contact" className="hover:text-gray-900 dark:hover:text-gray-200">Contact</a>
                <a href="/privacy-policy" className="hover:text-gray-900 dark:hover:text-gray-200">Privacy Policy</a>
                <a href="/editorial-policy" className="hover:text-gray-900 dark:hover:text-gray-200">Editorial Policy</a>
                <a href="/terms-of-service" className="hover:text-gray-900 dark:hover:text-gray-200">Terms of Service</a>
                <a href="/disclaimer" className="hover:text-gray-900 dark:hover:text-gray-200">Disclaimer</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
