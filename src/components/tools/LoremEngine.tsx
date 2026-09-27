"use client";

import { useState, useEffect } from "react";
import { generateLorem } from "@/lib/engines/lorem";

export function LoremEngine() {
  const [paragraphs, setParagraphs] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(generateLorem(paragraphs, startWithLorem));
  }, [paragraphs, startWithLorem]); // Regenerates automatically when settings change

  const regenerate = () => {
    setOutput(generateLorem(paragraphs, startWithLorem));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          <label htmlFor="paragraphs" className="text-sm font-medium text-gray-700">Paragraphs:</label>
          <input
            id="paragraphs"
            type="number"
            min="1"
            max="50"
            value={paragraphs}
            onChange={(e) => setParagraphs(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
            className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer border-l border-gray-300 pl-6">
          <input 
            type="checkbox" 
            checked={startWithLorem} 
            onChange={() => setStartWithLorem(!startWithLorem)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">Start with "Lorem ipsum..."</span>
        </label>
        
        <button 
          onClick={regenerate}
          className="ml-auto px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
        >
          Regenerate Text
        </button>
      </div>

      <div className="relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              copied ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          className="w-full h-96 p-6 pr-24 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y font-sans text-gray-700 leading-relaxed"
        />
      </div>
    </div>
  );
}
