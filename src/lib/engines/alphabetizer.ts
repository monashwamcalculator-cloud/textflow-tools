export type SortOrder = 'A-Z' | 'Z-A' | 'Length (Short-Long)' | 'Length (Long-Short)';

export function sortText(text: string, order: SortOrder, ignoreCase: boolean): string {
  if (!text.trim()) return '';

  const cleanText = text.replace(/\r/g, '');
  const lines = cleanText.split('\n');

  lines.sort((a, b) => {
    let compareA = a;
    let compareB = b;

    if (ignoreCase) {
      compareA = a.toLowerCase();
      compareB = b.toLowerCase();
    }

    if (order === 'A-Z') {
      return compareA.localeCompare(compareB);
    } else if (order === 'Z-A') {
      return compareB.localeCompare(compareA);
    } else if (order === 'Length (Short-Long)') {
      return a.length - b.length || compareA.localeCompare(compareB); // tie-breaker A-Z
    } else if (order === 'Length (Long-Short)') {
      return b.length - a.length || compareA.localeCompare(compareB); // tie-breaker A-Z
    }

    return 0;
  });

  return lines.join('\n');
}
