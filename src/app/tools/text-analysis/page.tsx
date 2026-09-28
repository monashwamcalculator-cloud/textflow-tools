import { CategoryPage } from "@/components/CategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Analysis Tools | TextFlow",
  description: "Analyze text metrics, word counts, and reading time instantly.",
  alternates: {
    canonical: "/tools/text-analysis",
  }
};

export default function Page() {
  return <CategoryPage categoryId="text-analysis" title="Text Analysis" description="Analyze text metrics, word counts, and reading time instantly." />;
}
