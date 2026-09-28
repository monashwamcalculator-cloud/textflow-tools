import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getToolConfig, getAllToolConfigs } from "@/lib/tools/registry";
import { TranslatorTool } from "@/components/tools/TranslatorTool";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateStaticParams() {
  const tools = getAllToolConfigs();
  return tools.map((tool) => ({ "tool-slug": tool.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ "tool-slug": string }> }
): Promise<Metadata> {
  const params = await props.params;
  const tool = getToolConfig(params["tool-slug"]);
  
  if (!tool) {
    return { title: "Tool Not Found" };
  }
  
  return {
    title: tool.seo.title,
    description: tool.seo.description,
    alternates: {
      canonical: tool.seo.canonical || `/${tool.slug}`,
    },
    openGraph: {
      title: tool.seo.title,
      description: tool.seo.description,
      url: `/${tool.slug}`,
      type: "website",
    },
  };
}

export default async function DynamicToolPage(props: { params: Promise<{ "tool-slug": string }> }) {
  const params = await props.params;
  const tool = getToolConfig(params["tool-slug"]);

  if (!tool) {
    notFound();
  }

  // Schema for the Tool Application
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.seo.description,
    "applicationCategory": "BrowserApplication",
    "operatingSystem": "All",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${tool.slug}`
  };

  // Optional FAQ Schema
  const faqSchema = tool.content.faqs && tool.content.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.content.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-6xl mx-auto pb-16 pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      
      <Breadcrumbs 
        items={[
          { name: "Categories", href: "/categories" },
          { name: tool.category, href: `/categories/${tool.category}` },
          { name: tool.name, href: `/${tool.slug}` },
        ]}
      />

      {/* Header */}
      <header className="mb-10 mt-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] mb-6 tracking-tight">
          {tool.name}
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          {tool.content.introduction}
        </p>
      </header>

      {/* Interactive Tool Area */}
      <div className="w-full max-w-5xl mx-auto mb-16">
        <TranslatorTool tool={tool} />
        {tool.content.accuracyNote && (
          <p className="mt-4 text-sm text-[var(--text-muted)] text-center max-w-3xl mx-auto">
            <span className="font-semibold text-[var(--foreground)]">Note:</span> {tool.content.accuracyNote}
          </p>
        )}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full max-w-5xl mx-auto items-start">
        <div className="lg:col-span-2 space-y-12">
          {/* About Section */}
          {tool.content.about && (
            <section className="prose dark:prose-invert max-w-none text-[var(--text-muted)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">About the Tool</h2>
              <p>{tool.content.about}</p>
            </section>
          )}

          {/* How To Use */}
          {tool.content.howToUse && (
            <section className="prose dark:prose-invert max-w-none text-[var(--text-muted)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">How to Use</h2>
              <p>{tool.content.howToUse}</p>
            </section>
          )}

          {/* Examples */}
          {tool.content.examples && tool.content.examples.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Examples</h2>
              <div className="space-y-4">
                {tool.content.examples.map((ex, idx) => (
                  <div key={idx} className="p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Input</span>
                        <p className="text-[var(--foreground)] font-medium">"{ex.input}"</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1 block">Output</span>
                        <p className="text-[var(--primary)] font-medium">"{ex.output}"</p>
                      </div>
                    </div>
                    {ex.explanation && (
                      <p className="text-sm text-[var(--text-muted)] mt-4 pt-4 border-t border-[var(--border-color)]">
                        {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs */}
          {tool.content.faqs && tool.content.faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {tool.content.faqs.map((faq, idx) => (
                  <details key={idx} className="group p-5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                    <summary className="flex items-center justify-between font-semibold text-[var(--foreground)]">
                      {faq.question}
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-[var(--text-muted)] mt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Related Tools */}
        <div className="lg:col-span-1">
          {tool.relatedTools && tool.relatedTools.length > 0 && (
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Related Tools</h3>
              <ul className="space-y-3">
                {tool.relatedTools.map(slug => {
                  const relatedTool = getToolConfig(slug);
                  if (!relatedTool) return null;
                  return (
                    <li key={slug}>
                      <a href={`/${slug}`} className="block p-3 rounded-xl hover:bg-[var(--background)] transition-colors border border-transparent hover:border-[var(--border-color)]">
                        <span className="font-semibold text-[var(--foreground)] block mb-1 hover:text-[var(--primary)] transition-colors">{relatedTool.name}</span>
                        <span className="text-sm text-[var(--text-muted)] line-clamp-1">{relatedTool.shortDescription}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
