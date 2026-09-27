"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { shiftCaesar } from "@/lib/engines/caesar";

export function CaesarEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const actualShift = mode === "encode" ? shift : -shift;
    setOutput(shiftCaesar(input, actualShift));
  }, [input, shift, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex gap-2">
          <button 
            onClick={() => setMode("encode")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "encode" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`}
          >
            Encode
          </button>
          <button 
            onClick={() => setMode("decode")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}`}
          >
            Decode
          </button>
        </div>

        <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
          <label htmlFor="shift" className="text-sm font-medium text-gray-700">Shift:</label>
          <input
            id="shift"
            type="number"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value) || 0)}
            className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <InputOutputBox
        input={input}
        output={output}
        onInputChange={setInput}
        inputPlaceholder="Type the secret message here..."
        outputPlaceholder="The cipher text will appear here..."
      />
    </div>
  );
}
