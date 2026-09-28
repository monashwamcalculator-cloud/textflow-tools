import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#09090b] border-t border-[var(--border-color)] pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] mb-4">
              <div className="bg-[var(--primary)] text-white p-1.5 rounded-lg">
                <Code2 size={20} />
              </div>
              <span>TextFlow</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm mb-6">
              A premium suite of translation and text transformation tools designed for speed, accuracy, and ease of use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><a href="/tools" className="hover:text-[var(--primary)] transition-colors">All Tools</a></li>
              <li><a href="/categories" className="hover:text-[var(--primary)] transition-colors">Categories</a></li>
              <li><a href="/tools/latin-translator" className="hover:text-[var(--primary)] transition-colors">Latin Translator</a></li>
              <li><a href="/tools/emoji-translator" className="hover:text-[var(--primary)] transition-colors">Emoji Translator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><a href="/guides" className="hover:text-[var(--primary)] transition-colors">All Guides</a></li>
              <li><a href="/guides/language" className="hover:text-[var(--primary)] transition-colors">Language Guides</a></li>
              <li><a href="/guides/translation" className="hover:text-[var(--primary)] transition-colors">Translation Tips</a></li>
              <li><a href="/contact" className="hover:text-[var(--primary)] transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Company & Trust</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><a href="/about" className="hover:text-[var(--primary)] transition-colors">About Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-[var(--primary)] transition-colors">Terms of Service</a></li>
              <li><a href="/editorial-policy" className="hover:text-[var(--primary)] transition-colors">Editorial Policy</a></li>
              <li><a href="/disclaimer" className="hover:text-[var(--primary)] transition-colors">Disclaimer</a></li>
              <li><a href="/accuracy" className="hover:text-[var(--primary)] transition-colors">Accuracy</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>&copy; {new Date().getFullYear()} TextFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">Built with privacy in mind.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
