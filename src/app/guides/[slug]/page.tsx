import { notFound } from "next/navigation";
import { getGuideData, getAllGuideSlugs } from "@/lib/content";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const guideData = getGuideData(params.slug);
  if (!guideData) {
    return { title: "Guide Not Found" };
  }
  
  return {
    title: guideData.frontmatter.seoTitle,
    description: guideData.frontmatter.metaDesc,
    alternates: {
      canonical: `/guides/${params.slug}`,
    },
    openGraph: {
      title: guideData.frontmatter.seoTitle,
      description: guideData.frontmatter.metaDesc,
      url: `/guides/${params.slug}`,
      type: "article",
      publishedTime: guideData.frontmatter.publishedAt,
    },
  };
}

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const guideData = getGuideData(params.slug);

  if (!guideData) {
    notFound();
  }

  const { frontmatter: guide, content } = guideData;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-indigo-600">Home</a> 
        <span className="mx-2">›</span>
        <a href="/guides" className="hover:text-indigo-600">Guides</a>
        <span className="mx-2">›</span>
        <span className="capitalize">{guide.categoryId}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">{guide.title}</span>
      </nav>

      {/* Header */}
      <header className="text-center mb-12 border-b border-gray-200 pb-8">
        <span className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-3 block">
          {guide.categoryId}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {guide.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {guide.shortDescription}
        </p>
      </header>

      {/* Educational Content Area from MDX */}
      <article className="prose prose-lg prose-indigo max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
