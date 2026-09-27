export function encodeBase64(text: string): string {
  try {
    // btoa expects Latin1, so we encode URI components first to support UTF-8
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return "";
  }
}

export function decodeBase64(base64Str: string): string {
  try {
    const cleanStr = base64Str.trim();
    if (!cleanStr) return "";
    return decodeURIComponent(escape(atob(cleanStr)));
  } catch (e) {
    // If it fails to decode, it might not be valid base64
    return "";
  }
}

// Simple heuristic: Base64 usually ends in = or == and contains A-Z, a-z, 0-9, +, /
export function isLikelyBase64(input: string): boolean {
  const cleanStr = input.trim();
  if (!cleanStr) return false;
  
  // Quick check for spaces which aren't in standard Base64
  if (cleanStr.includes(' ')) return false;

  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(cleanStr) && cleanStr.length % 4 === 0;
}
