"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { encodeBase64, decodeBase64, isLikelyBase64 } from "@/lib/engines/base64";

export function Base64Engine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"auto" | "encode" | "decode">("auto");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(false);
      return;
    }

    let isDecoding = false;
    if (mode === "decode") isDecoding = true;
    else if (mode === "encode") isDecoding = false;
    else isDecoding = isLikelyBase64(input);

    if (isDecoding) {
      const decoded = decodeBase64(input);
      if (decoded === "") {
        // If decode failed but we forced decode mode, show error state visually or empty
        setOutput("Invalid Base64 string");
        setError(true);
      } else {
        setOutput(decoded);
        setError(false);
      }
    } else {
      setOutput(encodeBase64(input));
      setError(false);
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={() => setMode("auto")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "auto" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Auto-Detect
        </button>
        <button 
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "encode" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Force Encode
        </button>
        <button 
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Force Decode
        </button>
      </div>

      <InputOutputBox
        input={input}
        output={error ? "Error: Invalid Base64 string" : output}
        onInputChange={setInput}
        inputPlaceholder="Type text to encode, or paste Base64 to decode..."
        outputPlaceholder="Output will appear here..."
      />
    </div>
  );
}
