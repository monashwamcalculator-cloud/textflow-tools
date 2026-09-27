"use client";

import { InputOutputBox } from "./InputOutputBox";
import { autoDetectAndTranslateMorse } from "@/lib/engines/morse";

export function MorseEngine() {
  return (
    <InputOutputBox 
      placeholderInput="Type text to convert to Morse, or paste Morse code (using dots/dashes) to decode..."
      placeholderOutput="Translation will appear instantly..."
      onTranslate={autoDetectAndTranslateMorse}
    />
  );
}
