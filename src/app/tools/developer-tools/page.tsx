import { CategoryPage } from "@/components/CategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Tools Tools | TextFlow",
  description: "Essential utilities for developers including formatting, parsing, and encoding tools.",
  alternates: {
    canonical: "/tools/developer-tools",
  }
};

export default function Page() {
  return <CategoryPage categoryId="developer-tools" title="Developer Tools" description="Essential utilities for developers including formatting, parsing, and encoding tools." />;
}
