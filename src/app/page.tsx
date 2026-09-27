import { getAllTools } from "@/lib/content";

export default function HomePage() {
  const TOOLS = getAllTools();
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Everything You Need to <span className="text-indigo-600">Transform Text</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Free, instantly-loading tools to convert, format, and translate your text. 
          From professional writing utilities to developer tools and codes.
        </p>
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search for a tool (e.g., 'Morse Code', 'Word Counter')..." 
            className="w-full px-6 py-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-lg transition-shadow"
          />
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <a href={href} className="group block bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl text-2xl group-hover:bg-indigo-100 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </a>
  );
}
