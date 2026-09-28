import React from "react";
import Link from "next/link";
import { getAllTools, ToolFrontmatter } from "@/lib/content";

export function RelatedTools({ currentSlug, categoryId }: { currentSlug: string, categoryId: string }) {
  // Simple relation logic: find tools in the same category, excluding the current one.
  const tools = getAllTools()
    .filter((t) => t.categoryId === categoryId && t.slug !== currentSlug)
    .slice(0, 6);

  if (tools.length === 0) return null;

  return (
    <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-lg">
                {tool.icon}
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.name}</h4>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{tool.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
