import { notFound } from "next/navigation";
import { getToolData, getAllToolSlugs, getAllGuides } from "@/lib/content";
import { Metadata } from "next";
import { MorseEngine } from "@/components/tools/MorseEngine";
import { CaseEngine } from "@/components/tools/CaseEngine";
import { BinaryEngine } from "@/components/tools/BinaryEngine";
import { Base64Engine } from "@/components/tools/Base64Engine";
import { UrlEngine } from "@/components/tools/UrlEngine";
import { HexEngine } from "@/components/tools/HexEngine";
import { CaesarEngine } from "@/components/tools/CaesarEngine";
import { MetricsEngine } from "@/components/tools/MetricsEngine";
import { CleanerEngine } from "@/components/tools/CleanerEngine";
import { AlphabetizerEngine } from "@/components/tools/AlphabetizerEngine";
import { LoremEngine } from "@/components/tools/LoremEngine";
import { MDXRemote } from "next-mdx-remote/rsc";

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

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-indigo-600">Home</a> 
        <span className="mx-2">›</span>
        <a href="/tools" className="hover:text-indigo-600">Tools</a>
        <span className="mx-2">›</span>
        <span className="capitalize">{tool.categoryId}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">{tool.name}</span>
      </nav>

      {/* Header */}
      <header className="text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
          {tool.icon}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{tool.name}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{tool.shortDescription}</p>
      </header>

      {/* Interactive Tool Area */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[400px]">
        {tool.componentName === 'MorseEngine' && (
          <MorseEngine />
        )}
        {tool.componentName === 'CaseEngine' && (
          <CaseEngine />
        )}
        {tool.componentName === 'BinaryEngine' && (
          <BinaryEngine />
        )}
        {tool.componentName === 'Base64Engine' && (
          <Base64Engine />
        )}
        {tool.componentName === 'UrlEngine' && (
          <UrlEngine />
        )}
        {tool.componentName === 'HexEngine' && (
          <HexEngine />
        )}
        {tool.componentName === 'CaesarEngine' && (
          <CaesarEngine />
        )}
        {tool.componentName === 'MetricsEngine' && (
          <MetricsEngine />
        )}
        {tool.componentName === 'CleanerEngine' && (
          <CleanerEngine />
        )}
        {tool.componentName === 'AlphabetizerEngine' && (
          <AlphabetizerEngine />
        )}
        {tool.componentName === 'LoremEngine' && (
          <LoremEngine />
        )}
      </section>

      {/* Educational Content Area from MDX */}
      <article className="prose prose-indigo max-w-none bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        <MDXRemote source={content} />
      </article>

      {/* Related Guides Section */}
      {relatedGuides.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mt-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Guides & Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedGuides.map((guide) => (
              <a key={guide.id} href={`/guides/${guide.slug}`} className="block p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-white transition-colors">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{guide.title}</h4>
                <p className="text-sm text-gray-600">{guide.shortDescription}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
