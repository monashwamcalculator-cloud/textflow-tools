import { CategoryPage } from "@/components/CategoryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encoding & Decoding Tools | TextFlow",
  description: "Convert data between Base64, Binary, Hex, Morse Code, and text securely in your browser.",
  alternates: {
    canonical: "/tools/encoding-decoding",
  }
};

export default function Page() {
  return <CategoryPage categoryId="encoding-decoding" title="Encoding & Decoding" description="Convert data between Base64, Binary, Hex, Morse Code, and text securely in your browser." />;
}
