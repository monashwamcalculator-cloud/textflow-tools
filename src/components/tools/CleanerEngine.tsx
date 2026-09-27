"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { cleanText, CleanOptions } from "@/lib/engines/cleaner";

export function CleanerEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  
  const [options, setOptions] = useState<CleanOptions>({
    removeExtraSpaces: true,
    removeLineBreaks: false,
    removeTabs: true,
    trimLines: true
  });

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    setOutput(cleanText(input, options));
  }, [input, options]);

  const toggleOption = (key: keyof CleanOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <Checkbox 
          label="Remove Extra Spaces" 
          checked={options.removeExtraSpaces} 
          onChange={() => toggleOption('removeExtraSpaces')} 
        />
        <Checkbox 
          label="Remove Line Breaks" 
          checked={options.removeLineBreaks} 
          onChange={() => toggleOption('removeLineBreaks')} 
        />
        <Checkbox 
          label="Remove Tabs" 
          checked={options.removeTabs} 
          onChange={() => toggleOption('removeTabs')} 
        />
        <Checkbox 
          label="Trim Leading/Trailing Spaces" 
          checked={options.trimLines} 
          onChange={() => toggleOption('trimLines')} 
        />
      </div>

      <InputOutputBox
        input={input}
        output={output}
        onInputChange={setInput}
        inputPlaceholder="Paste messy text here..."
        outputPlaceholder="Cleaned text will appear here..."
      />
    </div>
  );
}
