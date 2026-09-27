"use client";

import { useState } from "react";
import { toUpperCase, toLowerCase, toTitleCase, toSentenceCase } from "@/lib/engines/case";

export function CaseEngine() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClear = () => setInput("");

  const handleCopy = async () => {
    if (input) {
      try {
        await navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {}
    }
  };

  const applyTransformation = (transformFn: (t: string) => string) => {
    setInput(transformFn(input));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => applyTransformation(toSentenceCase)}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
        >
          Sentence case
        </button>
        <button 
          onClick={() => applyTransformation(toLowerCase)}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
        >
          lower case
        </button>
        <button 
          onClick={() => applyTransformation(toUpperCase)}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
        >
          UPPER CASE
        </button>
        <button 
          onClick={() => applyTransformation(toTitleCase)}
          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
        >
          Title Case
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
        <div className="flex items-center justify-end gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
          <button 
            onClick={handleClear}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={handleCopy}
            className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${
              copied 
                ? "bg-green-100 text-green-700 hover:text-green-800" 
                : "bg-indigo-100 text-indigo-600 hover:text-indigo-900"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-80 p-4 bg-transparent resize-none outline-none text-gray-900 text-lg leading-relaxed"
        />
      </div>
    </div>
  );
}
