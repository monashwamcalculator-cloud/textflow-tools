const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis",
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non",
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

function getRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords = 5, maxWords = 15): string {
  const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  let sentence = "";
  
  for (let i = 0; i < length; i++) {
    const word = getRandomWord();
    if (i === 0) {
      sentence += word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      sentence += " " + word;
    }
  }
  return sentence + ".";
}

export function generateLorem(paragraphs: number, startWithLorem: boolean = true): string {
  const result: string[] = [];
  
  for (let i = 0; i < paragraphs; i++) {
    // Generate between 3 and 7 sentences per paragraph
    const numSentences = Math.floor(Math.random() * 5) + 3;
    let pText = "";
    
    for (let j = 0; j < numSentences; j++) {
      if (i === 0 && j === 0 && startWithLorem) {
        // Overwrite the first sentence if startWithLorem is true
        pText += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      } else {
        pText += generateSentence() + " ";
      }
    }
    
    result.push(pText.trim());
  }
  
  return result.join("\n\n");
}
