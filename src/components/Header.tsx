"use client";
import { useState } from "react";
import { Search, Menu, X, Code2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
            <div className="bg-[var(--primary)] text-white p-1.5 rounded-lg">
              <Code2 size={20} />
            </div>
            <span>TextFlow</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-muted)]">
          <a href="/tools" className="hover:text-[var(--foreground)] transition-colors">Tools</a>
          <a href="/categories" className="hover:text-[var(--foreground)] transition-colors">Categories</a>
          <a href="/guides" className="hover:text-[var(--foreground)] transition-colors">Guides</a>
          <a href="/about" className="hover:text-[var(--foreground)] transition-colors">About</a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="bg-[var(--input-bg)] border border-transparent focus:border-[var(--border-color)] rounded-full pl-9 pr-4 py-1.5 text-sm outline-none transition-all w-48 focus:w-64 text-[var(--foreground)]"
            />
          </div>
          <ThemeToggle />
          <a href="/tools" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
            Try Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--foreground)] p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search for a translator or tool" 
              className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none text-[var(--foreground)]"
            />
          </div>
          <nav className="flex flex-col gap-3 text-base font-medium text-[var(--foreground)]">
            <a href="/tools" className="block py-2 border-b border-[var(--border-color)]">Tools</a>
            <a href="/categories" className="block py-2 border-b border-[var(--border-color)]">Categories</a>
            <a href="/guides" className="block py-2 border-b border-[var(--border-color)]">Guides</a>
            <a href="/about" className="block py-2">About</a>
          </nav>
        </div>
      )}
    </header>
  );
}
