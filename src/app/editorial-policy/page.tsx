import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy | TextFlow",
  description: "Learn about TextFlow's commitment to accuracy, privacy, and editorial standards.",
};

export default function EditorialPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 prose dark:prose-invert">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">Editorial Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">1. Our Mission</h2>
      <p>At TextFlow, our mission is to provide fast, reliable, and privacy-respecting text formatting tools and educational guides. We believe in building utilities that just work, without unnecessary tracking or bloated code.</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">2. Accuracy & Fact-Checking</h2>
      <p>All educational guides published on TextFlow undergo rigorous technical review. We cite primary sources (such as Unicode consortium standards and RFCs) to ensure the historical and technical accuracy of our content.</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">3. Privacy First</h2>
      <p>We believe your data belongs to you. Our tools process information locally in your browser using JavaScript. We do not transmit, log, or store your input data on our servers.</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">4. Updates and Corrections</h2>
      <p>Technology moves fast. We periodically review our tools and guides to ensure they reflect current standards. If you spot an error, please reach out via our Contact page, and our editorial team will investigate and correct it promptly.</p>
    </div>
  );
}

