import { CategoryPage } from "@/components/CategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Formatting Tools | TextFlow",
  description: "Format, clean, and organize your text instantly with our free online text formatting tools.",
  alternates: {
    canonical: "/tools/text-formatting",
  }
};

export default function Page() {
  return <CategoryPage categoryId="text-formatting" title="Text Formatting" description="Format, clean, and organize your text instantly with our free online text formatting tools." />;
}
