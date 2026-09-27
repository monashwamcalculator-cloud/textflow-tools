"use client";

import { useState } from "react";

interface InputOutputBoxProps {
  input?: string;
  output?: string;
  onInputChange?: (val: string) => void;
  placeholderInput?: string;
  placeholderOutput?: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
  onTranslate?: (input: string) => string;
}

export function InputOutputBox({ 
  input: controlledInput,
  output: controlledOutput,
  onInputChange,
  placeholderInput,
  placeholderOutput,
  inputPlaceholder,
  outputPlaceholder,
  onTranslate 
}: InputOutputBoxProps) {
  const finalPlaceholderInput = placeholderInput || inputPlaceholder || "Type or paste your text here...";
  const finalPlaceholderOutput = placeholderOutput || outputPlaceholder || "Translation will appear here...";
  const [internalInput, setInternalInput] = useState("");
  const [internalOutput, setInternalOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const isControlled = controlledInput !== undefined && onInputChange !== undefined;
  
  const input = isControlled ? controlledInput : internalInput;
  const output = isControlled ? (controlledOutput || "") : internalOutput;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    if (isControlled) {
      onInputChange(newVal);
    } else {
      setInternalInput(newVal);
      if (onTranslate) setInternalOutput(onTranslate(newVal));
    }
  };

  const handleClear = () => {
    if (isControlled) {
      onInputChange("");
    } else {
      setInternalInput("");
      setInternalOutput("");
    }
  };

  const handleCopy = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Input Section */}
      <div className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Input</span>
          <button 
            onClick={handleClear}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder={finalPlaceholderInput}
          className="w-full h-64 p-4 bg-transparent resize-none outline-none text-gray-900 text-lg"
        />
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-indigo-50/30 rounded-xl border border-indigo-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-indigo-100 bg-white">
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Output</span>
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
          readOnly
          value={output}
          placeholder={finalPlaceholderOutput}
          aria-live="polite"
          className="w-full h-64 p-4 bg-transparent resize-none outline-none text-gray-900 text-lg"
        />
      </div>
    </div>
  );
}
