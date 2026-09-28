export default function AccuracyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">Accuracy Guidelines</h1>
      <div className="prose dark:prose-invert max-w-none text-[var(--text-muted)]">
        <p className="text-lg">At TextFlow, we strive to provide the most accurate translations and text transformations possible. However, language is complex, and automated tools have limitations.</p>
        
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">1. Real-World Languages</h2>
        <p>Our real-world language translators aim for high accuracy but should not be used for critical legal, medical, or official documentation where human certified translation is required.</p>
        
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">2. Historical & Fictional Languages</h2>
        <p>Translations into languages like Latin, Elvish, or Klingon are based on available dictionaries and linguistic rules, but may lack context or cultural nuances. They are provided for educational and entertainment purposes.</p>

        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">3. AI-Powered Tools</h2>
        <p>Some of our tools utilize artificial intelligence. While powerful, AI can occasionally generate unexpected or inaccurate results. We recommend reviewing output before use.</p>
      </div>
    </div>
  );
}
