export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none text-[var(--text-muted)]">
        <p className="text-lg">Last updated: September 2026</p>
        
        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using TextFlow ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>

        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily use the tools and materials on TextFlow for personal, non-commercial, or commercial text processing. However, you may not:</p>
        <ul>
          <li>Use our tools via automated scripts or scrapers without explicit permission.</li>
          <li>Attempt to reverse engineer any software contained on the Website.</li>
          <li>Use the tools for any illegal or unauthorized purpose.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">3. Disclaimer of Warranties</h2>
        <p>The tools and materials on TextFlow are provided on an 'as is' basis. TextFlow makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.</p>

        <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">4. Limitations of Liability</h2>
        <p>In no event shall TextFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the tools on TextFlow.</p>
      </div>
    </div>
  );
}
