export function shiftCaesar(text: string, shift: number): string {
  // Normalize shift to 0-25
  shift = ((shift % 26) + 26) % 26;
  
  return Array.from(text)
    .map(char => {
      const code = char.charCodeAt(0);
      
      // Uppercase letters A-Z (65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters a-z (97-122)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      
      // Leave non-alphabetic characters untouched
      return char;
    })
    .join('');
}
