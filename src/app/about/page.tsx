export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose dark:prose-invert max-w-none text-[var(--text-muted)]">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">About TextFlow</h1>
      <p>Welcome to TextFlow, a modern platform dedicated to providing fast, reliable, and entirely client-side text utilities and translators.</p>
      
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Our Mission</h2>
      <p>Our mission is to help writers, developers, and internet culture enthusiasts format and decode text with zero friction. We believe that text tools should be instantly accessible, respect user privacy, and be free of cluttered, intrusive interfaces.</p>
      
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Why TextFlow?</h2>
      <ul>
        <li><strong>Privacy First:</strong> The vast majority of our tools run entirely in your browser. This means your text never leaves your device and is never stored on our servers.</li>
        <li><strong>Instant Results:</strong> Because we process text client-side, you don't have to wait for page reloads or server responses.</li>
        <li><strong>Educational Value:</strong> We don't just provide a tool; we provide context. We aim to explain the history and mechanics behind codes like Morse and Binary, or the grammar rules behind text formatting.</li>
      </ul>
    </div>
  );
}

