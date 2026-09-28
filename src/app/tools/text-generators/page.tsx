import { CategoryPage } from "@/components/CategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Generators Tools | TextFlow",
  description: "Generate placeholder text, passwords, random strings, and more.",
  alternates: {
    canonical: "/tools/text-generators",
  }
};

export default function Page() {
  return <CategoryPage categoryId="text-generators" title="Text Generators" description="Generate placeholder text, passwords, random strings, and more." />;
}
