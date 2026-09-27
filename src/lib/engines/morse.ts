// Standard International Morse Code dictionary
const MORSE_DICT: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
  i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.",
  q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-",
  y: "-.--", z: "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  "\"": ".-..-.", "$": "...-..-", "@": ".--.-.",
};

const REVERSE_DICT: Record<string, string> = Object.entries(MORSE_DICT).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

export function encodeMorse(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      if (MORSE_DICT[char]) return MORSE_DICT[char] + " ";
      return "";
    })
    .join("")
    .replace(/ \s/g, " / ")
    .trim();
}

export function decodeMorse(morse: string): string {
  return morse
    .split("/")
    .map((word) => 
      word.trim().split(" ").map(char => REVERSE_DICT[char] || "").join("")
    )
    .join(" ")
    .trim();
}

export function autoDetectAndTranslateMorse(input: string): string {
  // If it mostly contains dots, dashes, and slashes, assume it's morse code
  const morseChars = (input.match(/[\.\-\/]/g) || []).length;
  const totalChars = input.replace(/\s/g, "").length;
  
  if (totalChars > 0 && morseChars / totalChars > 0.6) {
    return decodeMorse(input).toUpperCase();
  }
  return encodeMorse(input);
}
