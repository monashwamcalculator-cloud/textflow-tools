"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { ToolConfig } from "@/lib/tools/types";

interface Props {
  tools: { name: string; slug: string; category: string; description: string; url: string }[];
}

export function SearchAutocomplete({ tools }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
      ).slice(0, 6)
    : [];

  return (
    <div className="w-full max-w-2xl relative group" ref={containerRef}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-6 w-6 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors" />
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(e.target.value.length > 0);
        }}
        onFocus={() => {
          if (query.length > 0) setIsOpen(true);
        }}
        className="block w-full pl-12 pr-4 py-4 md:py-5 bg-white dark:bg-[#18181b] border border-[var(--border-color)] rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition-all text-[var(--foreground)] relative z-10" 
        placeholder="Search for a translator or tool..." 
      />
      <div className="absolute inset-y-0 right-2 flex items-center z-10">
        <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-2 md:py-3 rounded-xl font-medium transition-colors">
          Search
        </button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl z-50 overflow-hidden">
          <ul className="py-2">
            {results.map((tool) => (
              <li key={tool.url}>
                <a 
                  href={tool.url}
                  className="flex items-center justify-between px-6 py-4 hover:bg-[var(--background)] transition-colors border-b border-[var(--border-color)] last:border-0"
                >
                  <div>
                    <h4 className="text-[var(--foreground)] font-bold text-lg">{tool.name}</h4>
                    <p className="text-[var(--text-muted)] text-sm line-clamp-1">{tool.description}</p>
                  </div>
                  <ArrowRight size={20} className="text-[var(--text-muted)]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl z-50 p-6 text-center text-[var(--text-muted)]">
          No tools found matching "{query}"
        </div>
      )}
    </div>
  );
}
