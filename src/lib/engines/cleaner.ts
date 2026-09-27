export interface CleanOptions {
  removeExtraSpaces: boolean;
  removeLineBreaks: boolean;
  removeTabs: boolean;
  trimLines: boolean;
}

export function cleanText(text: string, options: CleanOptions): string {
  let cleaned = text;

  // Trim whitespace from the beginning and end of each line
  if (options.trimLines) {
    cleaned = cleaned.split('\n').map(line => line.trim()).join('\n');
  }

  // Remove multiple consecutive spaces
  if (options.removeExtraSpaces) {
    cleaned = cleaned.replace(/ {2,}/g, ' ');
  }

  // Remove all tab characters
  if (options.removeTabs) {
    cleaned = cleaned.replace(/\t/g, '');
  }

  // Remove all line breaks (newlines and carriage returns)
  if (options.removeLineBreaks) {
    cleaned = cleaned.replace(/[\r\n]+/g, ' ');
    // If we just added spaces by replacing newlines, we might have created extra spaces again
    if (options.removeExtraSpaces) {
      cleaned = cleaned.replace(/ {2,}/g, ' ');
    }
  }

  // Final trim for good measure
  return cleaned.trim();
}
