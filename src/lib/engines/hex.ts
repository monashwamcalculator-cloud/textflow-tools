export function textToHex(text: string): string {
  return Array.from(text)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
}

export function hexToText(hexStr: string): string {
  const cleanHex = hexStr.replace(/[^0-9A-Fa-f]/g, '');
  if (!cleanHex) return '';

  // If odd length, ignore the very last character temporarily so it doesn't break parsing while typing
  const parseableHex = cleanHex.length % 2 !== 0 ? cleanHex.slice(0, -1) : cleanHex;

  let text = '';
  for (let i = 0; i < parseableHex.length; i += 2) {
    const byte = parseableHex.slice(i, i + 2);
    text += String.fromCharCode(parseInt(byte, 16));
  }
  return text;
}

export function isLikelyHex(input: string): boolean {
  if (!input.trim()) return false;
  // If it's mostly hex characters and spaces
  const cleanInput = input.trim();
  const hexChars = cleanInput.match(/[0-9A-Fa-f\s]/g)?.length || 0;
  
  // Need to be careful not to trigger on normal text that happens to have letters a-f.
  // Hex strings usually don't have standard punctuation and lots of g-z letters.
  const nonHexChars = cleanInput.match(/[^0-9A-Fa-f\s]/g)?.length || 0;
  
  return nonHexChars === 0 && cleanInput.length > 0;
}
