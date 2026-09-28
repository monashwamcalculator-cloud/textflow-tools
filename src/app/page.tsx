import Script from "next/script";
import { Search, ArrowRight, ArrowLeftRight, CheckCircle2, ShieldCheck, Zap, Globe2, BookOpen, Smartphone } from "lucide-react";
import { MOCK_CATEGORIES, MOCK_POPULAR_TOOLS } from "@/lib/mock-data";

export default function HomePage() {
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
    <div className="flex flex-col w-full">
      <Script id="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--primary)]/10 via-[var(--background)] to-[var(--background)]"></div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] mb-6 tracking-tight max-w-4xl">
          Translate <span className="text-[var(--primary)]">More Than Words</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl leading-relaxed">
          The premium platform for real-world languages, historical texts, internet slang, and creative text transformations.
        </p>
        
        {/* Homepage Search */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-12 pr-4 py-4 md:py-5 bg-white dark:bg-[#18181b] border border-[var(--border-color)] rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all text-[var(--foreground)]" 
            placeholder="Search for a translator or tool..." 
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 md:py-3 rounded-xl font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Tool UI Mock */}
      <section className="px-4 py-16 bg-white dark:bg-[#09090b] border-y border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Try It Now</h2>
            <p className="text-[var(--text-muted)]">Experience fast, accurate text transformations instantly.</p>
          </div>
          
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--background)]/50">
              <select className="bg-transparent font-medium text-[var(--foreground)] outline-none cursor-pointer">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              
              <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-full transition-colors">
                <ArrowLeftRight size={20} />
              </button>
              
              <select className="bg-transparent font-medium text-[var(--foreground)] outline-none cursor-pointer text-right">
                <option>Latin</option>
                <option>Elvish</option>
                <option>Gen Z Slang</option>
              </select>
            </div>
            
            {/* Input/Output Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)]">
              <div className="p-6">
                <textarea 
                  className="w-full h-48 bg-transparent text-lg text-[var(--foreground)] placeholder-[var(--text-muted)] resize-none outline-none"
                  placeholder="Enter text to translate..."
                ></textarea>
              </div>
              <div className="p-6 bg-[var(--background)]/30">
                <textarea 
                  className="w-full h-48 bg-transparent text-lg text-[var(--foreground)] resize-none outline-none"
                  placeholder="Translation will appear here..."
                  readOnly
                ></textarea>
              </div>
            </div>
            
            {/* Actions */}
            <div className="p-4 border-t border-[var(--border-color)] flex justify-end gap-3 bg-[var(--background)]/50">
              <button className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl font-medium transition-colors">
                Translate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="px-4 py-20 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">Popular Tools</h2>
            <p className="text-[var(--text-muted)]">Our most frequently used translators and text tools.</p>
          </div>
          <a href="/tools" className="hidden md:flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--primary-hover)] transition-colors">
            View All <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_POPULAR_TOOLS.map((tool) => (
            <a key={tool.id} href={`/tools/${tool.slug}`} className="group block p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)] hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] rounded-xl group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{tool.name}</h3>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[var(--background)] text-[var(--text-muted)] border border-[var(--border-color)]">
                    {tool.category.replace("-", " ")}
                  </span>
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {tool.shortDescription}
              </p>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="/tools" className="inline-flex items-center gap-2 text-[var(--primary)] font-medium">
            View All Tools <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-20 bg-[var(--background)] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Explore Categories</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">Discover our growing library of tools organized by language types and creative use cases.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CATEGORIES.map((category) => (
              <a key={category.id} href={`/categories/${category.slug}`} className="flex items-start gap-4 p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)] transition-colors group">
                <div className="p-3 bg-[var(--background)] rounded-xl text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">
                  <Globe2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{category.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">{category.description}</p>
                  <span className="text-xs font-medium text-[var(--primary)]">{category.toolCount} Tools</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use This Platform & Content Preview */}
      <section className="px-4 py-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Benefits */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">Why Choose TextFlow?</h2>
          <div className="space-y-6">
            {[
              { title: "Fast Results", desc: "Instant translations and transformations without waiting.", icon: <Zap className="text-[var(--primary)]" size={24} /> },
              { title: "Simple Interface", desc: "Clean, distraction-free design focused on usability.", icon: <Smartphone className="text-[var(--primary)]" size={24} /> },
              { title: "Multiple Languages", desc: "Support for historical, fictional, and real-world dialects.", icon: <Globe2 className="text-[var(--primary)]" size={24} /> },
              { title: "Mobile Friendly", desc: "Works perfectly on your phone, tablet, or desktop.", icon: <CheckCircle2 className="text-[var(--primary)]" size={24} /> },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-1">{benefit.title}</h3>
                  <p className="text-[var(--text-muted)]">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Content Preview */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[var(--foreground)]">Explore Languages</h2>
            <a href="/guides" className="text-[var(--primary)] font-medium hover:text-[var(--primary-hover)] transition-colors">
              All Guides
            </a>
          </div>
          <div className="space-y-4">
            {[
              { title: "Understanding Historical Languages", category: "Language History", time: "5 min read" },
              { title: "How AI Translation Works", category: "Technology", time: "8 min read" },
              { title: "Top 10 Useful Translation Tips", category: "Guides", time: "4 min read" }
            ].map((guide, i) => (
              <a key={i} href="#" className="block p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--primary)] transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-[var(--background)] text-[var(--primary)] rounded-md">
                    {guide.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{guide.time}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">{guide.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 bg-[var(--background)] border-t border-[var(--border-color)] text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <ShieldCheck size={48} className="text-[var(--primary)] mb-6" />
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Built on Trust & Transparency</h2>
          <p className="text-[var(--text-muted)] mb-8">
            We believe in transparent tool limitations, privacy-conscious architecture, and clear AI disclosure. We don't store your personal translations by default.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[var(--text-muted)]">
            <a href="/privacy-policy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/editorial-policy" className="hover:text-[var(--primary)] transition-colors">Editorial Policy</a>
            <span>•</span>
            <a href="/accuracy" className="hover:text-[var(--primary)] transition-colors">Accuracy Guidelines</a>
          </div>
        </div>
      </section>

    </div>
  );
}
