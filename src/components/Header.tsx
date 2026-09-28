"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, X, Code2, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  tools: { name: string; slug: string; category: string; description: string; url: string }[];
}

export function Header({ tools }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

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
          <div className="relative group" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearchOpen(e.target.value.length > 0);
              }}
              onFocus={() => {
                if (query.length > 0) setIsSearchOpen(true);
              }}
              placeholder="Search tools..." 
              className="bg-[var(--input-bg)] border border-transparent focus:border-[var(--border-color)] rounded-full pl-9 pr-4 py-1.5 text-sm outline-none transition-all w-48 focus:w-64 text-[var(--foreground)]"
            />
            
            {/* Search Dropdown */}
            {isSearchOpen && results.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl z-50 overflow-hidden">
                <ul className="py-2">
                  {results.map((tool) => (
                    <li key={tool.url}>
                      <a 
                        href={tool.url}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[var(--background)] transition-colors border-b border-[var(--border-color)] last:border-0"
                      >
                        <div>
                          <h4 className="text-[var(--foreground)] font-semibold text-sm">{tool.name}</h4>
                          <p className="text-[var(--text-muted)] text-xs line-clamp-1">{tool.description}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isSearchOpen && query && results.length === 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl z-50 p-4 text-center text-[var(--text-muted)] text-sm">
                No tools found
              </div>
            )}
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none text-[var(--foreground)]"
            />
            
            {/* Mobile Search Results inline */}
            {query && results.length > 0 && (
              <div className="mt-2 bg-[var(--background)] rounded-lg border border-[var(--border-color)] overflow-hidden">
                <ul className="py-1">
                  {results.map((tool) => (
                    <li key={tool.url}>
                      <a href={tool.url} className="block px-4 py-3 hover:bg-[var(--card-bg)] border-b border-[var(--border-color)] last:border-0">
                        <h4 className="text-[var(--foreground)] font-semibold text-sm">{tool.name}</h4>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
