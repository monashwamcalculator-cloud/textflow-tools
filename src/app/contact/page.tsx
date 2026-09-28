export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose dark:prose-invert max-w-none text-[var(--text-muted)]">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-8">Contact Us</h1>
      <p>Have a question, feedback, or a suggestion for a new text tool? We'd love to hear from you!</p>
      
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Get in Touch</h2>
      <p>For general inquiries, bug reports, or feature requests, please reach out to us via email:</p>
      <p><strong>Email:</strong> hello@yourdomain.com</p>

      <h2 className="text-2xl font-semibold text-[var(--foreground)] mt-8 mb-4">Bug Reports</h2>
      <p>If you found an issue with one of our converters (for example, if a specific character isn't converting properly in the Morse Code tool), please include:</p>
      <ul>
        <li>The name of the tool you were using</li>
        <li>The exact text you entered</li>
        <li>The incorrect output you received</li>
        <li>What you expected to see</li>
      </ul>
      <p>This helps us fix the issue much faster!</p>
    </div>
  );
}

