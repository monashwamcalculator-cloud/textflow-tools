"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";

export function DeduplicatorEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    const lines = input.split('\n');
    if (caseSensitive) {
      const unique = Array.from(new Set(lines));
      setOutput(unique.join('\n'));
    } else {
      const seen = new Set<string>();
      const unique: string[] = [];
      for (const line of lines) {
        const lower = line.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          unique.push(line);
        }
      }
      setOutput(unique.join('\n'));
    }
  }, [input, caseSensitive]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <input 
            type="checkbox" 
            checked={caseSensitive} 
            onChange={() => setCaseSensitive(!caseSensitive)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Case Sensitive</span>
        </label>
      </div>

      <InputOutputBox
        input={input}
        output={output}
        onInputChange={setInput}
        inputPlaceholder="Paste a list with duplicate lines here..."
        outputPlaceholder="List with duplicates removed will appear here..."
      />
    </div>
  );
}
