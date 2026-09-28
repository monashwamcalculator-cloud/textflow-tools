import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { Globe2 } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Tool Categories</h1>
        <p className="text-[var(--text-muted)] text-lg">Browse our complete collection of translation and text transformation tools by category.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CATEGORIES.map((category) => (
          <a key={category.id} href={`/categories/${category.slug}`} className="flex items-start gap-4 p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)] hover:shadow-sm transition-all group">
            <div className="p-3 bg-[var(--background)] rounded-xl text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
              <Globe2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{category.name}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">{category.description}</p>
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)]">{category.toolCount} Tools</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
