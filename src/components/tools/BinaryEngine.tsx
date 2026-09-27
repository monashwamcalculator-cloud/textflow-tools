"use client";

import { useState, useEffect } from "react";
import { InputOutputBox } from "./InputOutputBox";
import { textToBinary, binaryToText, isLikelyBinary } from "@/lib/engines/binary";

export function BinaryEngine() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (isLikelyBinary(input)) {
      setOutput(binaryToText(input));
    } else {
      setOutput(textToBinary(input));
    }
  }, [input]);

  return (
    <InputOutputBox
      input={input}
      output={output}
      onInputChange={setInput}
      inputPlaceholder="Type text or paste binary code here..."
      outputPlaceholder="Translation will appear here..."
    />
  );
}
