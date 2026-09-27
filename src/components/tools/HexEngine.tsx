"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { textToHex, hexToText, isLikelyHex } from "@/lib/engines/hex";

export function HexEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"auto" | "encode" | "decode">("auto");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let isDecoding = false;
    if (mode === "decode") isDecoding = true;
    else if (mode === "encode") isDecoding = false;
    else isDecoding = isLikelyHex(input);

    if (isDecoding) {
      setOutput(hexToText(input));
    } else {
      setOutput(textToHex(input));
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
          Text to Hex
        </button>
        <button 
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Hex to Text
        </button>
      </div>

      <InputOutputBox
        input={input}
        output={output}
        onInputChange={setInput}
        inputPlaceholder="Type text or paste Hex code (e.g. 48 65 6c 6c 6f)..."
        outputPlaceholder="Output will appear here..."
      />
    </div>
  );
}
