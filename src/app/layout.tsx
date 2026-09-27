import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TextFlow | Free Online Text Utilities & Translators",
  description: "A comprehensive suite of free text tools, slang translators, writing utilities, and code converters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-indigo-700">TextFlow</a>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/tools" className="hover:text-indigo-600 transition-colors">Tools</a>
              <a href="/guides" className="hover:text-indigo-600 transition-colors">Guides</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} TextFlow. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/about" className="hover:text-gray-900">About</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
              <a href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-gray-900">Terms of Service</a>
              <a href="/disclaimer" className="hover:text-gray-900">Disclaimer</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
