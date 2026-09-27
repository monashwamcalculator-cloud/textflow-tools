import { Metadata } from "next";
import { getAllGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Educational Guides & Articles | TextFlow",
  description: "Learn about the history of Morse code, internet slang origins, and text formatting tips.",
};

export default function GuidesPage() {
  const GUIDES = getAllGuides();
  
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Educational Guides</h1>
        <p className="text-gray-600 max-w-2xl">
          Deep dives into the history, structure, and meaning behind the codes and formats featured on our platform.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <a key={guide.id} href={`/guides/${guide.slug}`} className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 transition-colors">
            <span className="text-sm font-semibold text-indigo-600 mb-2 block capitalize">{guide.categoryId}</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h2>
            <p className="text-gray-600">{guide.shortDescription}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
