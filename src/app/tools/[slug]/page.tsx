import { notFound } from "next/navigation";
import { getToolData, getAllToolSlugs, getAllGuides } from "@/lib/content";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

import { MorseEngine } from "@/components/tools/MorseEngine";
import { CaseEngine } from "@/components/tools/CaseEngine";
import { BinaryEngine } from "@/components/tools/BinaryEngine";
import { Base64Engine } from "@/components/tools/Base64Engine";
import { UrlEngine } from "@/components/tools/UrlEngine";
import { HexEngine } from "@/components/tools/HexEngine";
import { CaesarEngine } from "@/components/tools/CaesarEngine";
import { MetricsEngine } from "@/components/tools/MetricsEngine";
import { CleanerEngine } from "@/components/tools/CleanerEngine";
import { DeduplicatorEngine } from "@/components/tools/DeduplicatorEngine";
import { AlphabetizerEngine } from "@/components/tools/AlphabetizerEngine";
import { LoremEngine } from "@/components/tools/LoremEngine";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQAccordion } from "@/components/FAQAccordion";
import { RelatedTools } from "@/components/RelatedTools";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const toolData = getToolData(params.slug);
  if (!toolData) {
    return { title: "Tool Not Found" };
  }
  
  return {
    title: toolData.frontmatter.seoTitle,
    description: toolData.frontmatter.metaDesc,
    alternates: {
      canonical: `/tools/${params.slug}`,
    },
    openGraph: {
      title: toolData.frontmatter.seoTitle,
      description: toolData.frontmatter.metaDesc,
      url: `/tools/${params.slug}`,
      type: "website",
    },
  };
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const toolData = getToolData(params.slug);

  if (!toolData) {
    notFound();
  }

  const { frontmatter: tool, content } = toolData;
  const allGuides = getAllGuides();
  const relatedGuides = allGuides.filter(g => g.categoryId === tool.categoryId);

  // Map category slugs to readable titles
  const categoryNames: Record<string, string> = {
    'text-formatting': 'Text Formatting',
    'text-analysis': 'Text Analysis',
    'encoding-decoding': 'Encoding & Decoding',
    'developer-tools': 'Developer Tools',
    'text-generators': 'Text Generators'
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.shortDescription,
    "applicationCategory": "BrowserApplication",
    "operatingSystem": "All",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/tools/${tool.slug}`
  };

  return (
    <div className="max-w-6xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs 
        items={[
          { name: "Tools", href: "/tools" },
          { name: categoryNames[tool.categoryId] || tool.categoryId, href: `/tools/${tool.categoryId}` },
          { name: tool.name, href: `/tools/${tool.slug}` },
        ]}
      />

      <header className="mb-10 mt-6 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-4">
          <span className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
            {tool.icon}
          </span>
          {tool.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{tool.shortDescription}</p>
      </header>

      {/* Two-Column Layout for Desktop where appropriate, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Tool Engine */}
        <div className="lg:col-span-12 w-full max-w-4xl mx-auto">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 min-h-[400px]">
            {tool.componentName === 'MorseEngine' && <MorseEngine />}
            {tool.componentName === 'CaseEngine' && <CaseEngine />}
            {tool.componentName === 'BinaryEngine' && <BinaryEngine />}
            {tool.componentName === 'Base64Engine' && <Base64Engine />}
            {tool.componentName === 'UrlEngine' && <UrlEngine />}
            {tool.componentName === 'HexEngine' && <HexEngine />}
            {tool.componentName === 'CaesarEngine' && <CaesarEngine />}
            {tool.componentName === 'MetricsEngine' && <MetricsEngine />}
            {tool.componentName === 'CleanerEngine' && <CleanerEngine />}
            {tool.componentName === 'DeduplicatorEngine' && <DeduplicatorEngine />}
            {tool.componentName === 'AlphabetizerEngine' && <AlphabetizerEngine />}
            {tool.componentName === 'LoremEngine' && <LoremEngine />}
          </section>
        </div>

        {/* Content Column: Explanations, FAQs, etc. */}
        <div className="lg:col-span-12 w-full max-w-4xl mx-auto">
          <article className="prose prose-lg prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-10">
            <MDXRemote 
              source={content} 
              components={{ FAQAccordion }}
            />
          </article>
          
          <RelatedTools currentSlug={tool.slug} categoryId={tool.categoryId} />

          {relatedGuides.length > 0 && (
            <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedGuides.map((guide) => (
                  <Link key={guide.id} href={`/guides/${guide.slug}`} className="block p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{guide.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{guide.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
