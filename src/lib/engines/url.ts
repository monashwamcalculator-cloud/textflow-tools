export function encodeUrl(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return "";
  }
}

export function decodeUrl(urlStr: string): string {
  try {
    return decodeURIComponent(urlStr.replace(/\+/g, ' '));
  } catch (e) {
    return "";
  }
}

export function isLikelyUrlEncoded(input: string): boolean {
  if (!input.trim()) return false;
  // If it contains % followed by two hex digits, it's likely encoded
  return /%[0-9A-Fa-f]{2}/.test(input);
}
