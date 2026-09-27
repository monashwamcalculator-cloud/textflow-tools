"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { sortText, SortOrder } from "@/lib/engines/alphabetizer";

export function AlphabetizerEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [order, setOrder] = useState<SortOrder>("A-Z");
  const [ignoreCase, setIgnoreCase] = useState(true);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    setOutput(sortText(input, order, ignoreCase));
  }, [input, order, ignoreCase]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">Sort By:</label>
          <select 
            id="sortOrder"
            value={order} 
            onChange={(e) => setOrder(e.target.value as SortOrder)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="A-Z">Alphabetical (A-Z)</option>
            <option value="Z-A">Reverse Alphabetical (Z-A)</option>
            <option value="Length (Short-Long)">Length (Shortest First)</option>
            <option value="Length (Long-Short)">Length (Longest First)</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={ignoreCase} 
            onChange={() => setIgnoreCase(!ignoreCase)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">Ignore Capitalization</span>
        </label>
      </div>

      <InputOutputBox
        input={input}
        output={output}
        onInputChange={setInput}
        inputPlaceholder="Paste your list here (one item per line)..."
        outputPlaceholder="Sorted list will appear here..."
      />
    </div>
  );
}
