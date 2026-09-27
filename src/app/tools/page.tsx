import { getAllTools } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools | TextFlow",
  description: "Browse our complete directory of free online text tools, translators, and utilities.",
};

export default function AllToolsPage() {
  const TOOLS = getAllTools();
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Tools</h1>
        <p className="text-gray-600 max-w-2xl">
          Browse our complete collection of text utilities, slang translators, and code formatters.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <a key={tool.id} href={`/tools/${tool.slug}`} className="group block bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl text-2xl group-hover:bg-indigo-100 transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tool.shortDescription}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
