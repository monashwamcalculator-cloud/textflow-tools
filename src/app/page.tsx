import { getAllTools } from "@/lib/content";
import Script from "next/script";

export default function HomePage() {
  const TOOLS = getAllTools();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TextFlow",
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="space-y-16">
      <Script id="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          Everything You Need to <span className="text-indigo-600 dark:text-indigo-400">Transform Text</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Free, instantly-loading tools to convert, format, and translate your text. 
          From professional writing utilities to developer tools and codes.
        </p>
      </section>

      {/* Featured Tools Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard 
              key={tool.id}
              title={tool.name}
              description={tool.shortDescription}
              icon={tool.icon}
              href={`/tools/${tool.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolCard({ title, description, icon, href }: { title: string, description: string, icon: string, href: string }) {
  return (
    <a href={href} className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
        {description}
      </p>
    </a>
  );
}
