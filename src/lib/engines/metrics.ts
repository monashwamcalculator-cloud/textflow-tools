export interface TextMetrics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

export function analyzeText(text: string): TextMetrics {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  
  // Words: Split by whitespace, ignoring empty strings. This safely handles all Unicode characters.
  const wordsArray = text.trim().split(/\s+/).filter(w => w.replace(/[^\p{L}\p{N}]/gu, '').length > 0);
  const words = text.trim() === '' ? 0 : wordsArray.length;
  
  // Sentences: Split by . ! ? followed by space or end of string.
  const sentencesArray = text.split(/[.!?]+(?:\s+|$)/).filter(s => s.trim().length > 0);
  const sentences = text.trim() === '' ? 0 : Math.max(1, sentencesArray.length);
  
  // Paragraphs: match two or more newlines
  const paragraphsArray = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphs = text.trim() === '' ? 0 : paragraphsArray.length;
  
  // Reading time: Average 200 words per minute
  const readingTimeMinutes = Math.ceil(words / 200);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTimeMinutes
  };
}
