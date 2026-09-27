export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 prose prose-indigo">
      <h1>Contact Us</h1>
      <p>Have a question, feedback, or a suggestion for a new text tool? We'd love to hear from you!</p>
      
      <h2>Get in Touch</h2>
      <p>For general inquiries, bug reports, or feature requests, please reach out to us via email:</p>
      <p><strong>Email:</strong> hello@textflow.example.com</p>

      <h2>Bug Reports</h2>
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
