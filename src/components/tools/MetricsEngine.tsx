"use client";

import { useState, useEffect } from "react";
import { analyzeText, TextMetrics } from "@/lib/engines/metrics";

export function MetricsEngine() {
  const [input, setInput] = useState("");
  const [metrics, setMetrics] = useState<TextMetrics>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTimeMinutes: 0
  });

  useEffect(() => {
    setMetrics(analyzeText(input));
  }, [input]);

  const MetricCard = ({ label, value }: { label: string, value: number | string }) => (
    <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-100">
      <div className="text-3xl font-bold text-indigo-600 mb-1">{value}</div>
      <div className="text-sm font-medium text-indigo-900/60 uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Words" value={metrics.words} />
        <MetricCard label="Characters" value={metrics.characters} />
        <MetricCard label="No Spaces" value={metrics.charactersNoSpaces} />
        <MetricCard label="Sentences" value={metrics.sentences} />
        <MetricCard label="Paragraphs" value={metrics.paragraphs} />
        <MetricCard label="Read (Min)" value={metrics.readingTimeMinutes === 0 ? '< 1' : metrics.readingTimeMinutes} />
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-96 p-6 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y font-sans text-gray-700"
          spellCheck="false"
        />
        {input && (
          <button
            onClick={() => setInput("")}
            className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Clear Text
          </button>
        )}
      </div>
    </div>
  );
}
