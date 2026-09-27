export function textToBinary(text: string): string {
  return Array.from(text)
    .map(char => {
      const binary = char.charCodeAt(0).toString(2);
      return binary.padStart(8, '0');
    })
    .join(' ');
}

export function binaryToText(binaryStr: string): string {
  // Clean the input to only allow 0, 1, and spaces
  const cleanBinary = binaryStr.replace(/[^01 ]/g, '').trim();
  if (!cleanBinary) return '';

  return cleanBinary
    .split(/\s+/) // Split by any amount of whitespace
    .map(bin => {
      if (bin.length % 8 !== 0) {
        // Pad with leading zeros if not a full byte (helps with manual entry)
        bin = bin.padStart(Math.ceil(bin.length / 8) * 8, '0');
      }
      
      // Convert 8-bit chunks back to characters
      let text = '';
      for (let i = 0; i < bin.length; i += 8) {
        const byte = bin.slice(i, i + 8);
        text += String.fromCharCode(parseInt(byte, 2));
      }
      return text;
    })
    .join('');
}

// Simple heuristic to detect if input is mostly binary
export function isLikelyBinary(input: string): boolean {
  if (!input.trim()) return false;
  // If more than 80% of the characters are 0, 1, or space, it's likely binary
  const binaryChars = input.match(/[01\s]/g)?.length || 0;
  return (binaryChars / input.length) > 0.8;
}
