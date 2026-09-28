export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose dark:prose-invert max-w-none text-[var(--text-muted)]">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">Disclaimer</h1>
      <p>Last updated: September 2026</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Accuracy of Tools</h2>
      <p>The translations, formatting, and data provided by TextFlow are generated via algorithms, rule-sets, and dictionaries. While we strive to make our tools as accurate as possible, they are provided for educational, productivity, and entertainment purposes only.</p>
      
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Cultural and Fictional Languages</h2>
      <p>Tools interpreting internet slang, regional dialects, or fictional languages (e.g., Gen Z Slang Decoder, Leet Speak) rely on crowdsourced dictionaries and pattern matching. They may not reflect the full nuance of human conversation and should not be used as authoritative references.</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Professional Use</h2>
      <p>If you are using our tools (such as the Case Converter or Word Counter) for critical academic, legal, or professional documents, we strongly recommend manually reviewing the output. TextFlow assumes no responsibility for formatting errors or data loss resulting from the use of our website.</p>
    </div>
  );
}

