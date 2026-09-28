import { getAllTools } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools | TextFlow",
  description: "Browse our complete directory of free online text tools, translators, and utilities.",
};

export default function AllToolsPage() {
  const TOOLS = getAllTools();
  return (
    <div className="space-y-12 max-w-7xl mx-auto py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">All Tools</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl">
          Browse our complete collection of text utilities, slang translators, and code formatters.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <a key={tool.id} href={`/tools/${tool.slug}`} className="group block bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)] p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl text-2xl group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{tool.name}</h3>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-2">
              {tool.shortDescription}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
