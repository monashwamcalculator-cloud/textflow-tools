import React from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function CategoryPage({ categoryId, title, description }: { categoryId: string, title: string, description: string }) {
  const tools = getAllTools().filter((t) => t.categoryId === categoryId);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools" },
          { name: title, href: `/tools/${categoryId}` },
        ]}
      />

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{description}</p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
