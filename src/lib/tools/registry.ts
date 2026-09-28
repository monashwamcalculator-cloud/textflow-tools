import { ToolConfig } from "./types";

export const TOOL_REGISTRY: Record<string, ToolConfig> = {
  "latin-translator": {
    id: "latin-translator",
    slug: "latin-translator",
    name: "Latin Translator",
    type: "translation",
    category: "historical",
    shortDescription: "Translate modern English to classical Latin instantly.",
    description: "A fast and accurate translator for classical Latin text, perfect for historical study, tattoos, and academic reading.",
    sourceLanguage: "English",
    targetLanguage: "Latin",
    allowSwap: true,
    status: "active",
    systemPrompt: "Translate the provided English text into Classical Latin. Prioritize accurate grammar, proper declensions, and historically appropriate phrasing over literal word-for-word translation. If the text is in Latin, translate it to modern English.",
    seo: {
      title: "Latin Translator | English to Latin & Latin to English",
      description: "Free online Latin translator. Instantly translate English to Classical Latin and vice versa with our accurate historical language tool.",
    },
    content: {
      introduction: "Our Latin Translator bridges the gap between modern English and the language of the Roman Empire.",
      about: "Classical Latin was the language of the Roman Republic and the Roman Empire from about 75 BC to the 3rd century AD. It is the ancestor of all Romance languages. While no longer spoken natively, it remains crucial in law, medicine, science, and theology.",
      howToUse: "Simply type or paste your English text into the left box, and the Latin translation will appear on the right. You can swap the languages to translate from Latin back to English.",
      examples: [
        { input: "Seize the day", output: "Carpe diem", explanation: "A famous phrase from the Roman poet Horace." },
        { input: "I came, I saw, I conquered", output: "Veni, vidi, vici", explanation: "Attributed to Julius Caesar after his victory at Zela." }
      ],
      accuracyNote: "This tool uses AI to simulate Classical Latin. While it aims for high accuracy in grammar and vocabulary, Latin context and poetry often have nuances that automated tools cannot capture perfectly. It is not recommended for critical academic or legal citations.",
      faqs: [
        { question: "Is this Classical or Ecclesiastical Latin?", answer: "The tool prioritizes Classical Latin vocabulary and grammar, though it can understand Ecclesiastical phrasing." },
        { question: "Can it translate modern words?", answer: "Yes, the AI will attempt to find the closest historical equivalent or use neo-Latin terminology for modern concepts." }
      ]
    },
    relatedTools: ["spanish-translator"]
  },
  "spanish-translator": {
    id: "spanish-translator",
    slug: "spanish-translator",
    name: "Spanish Translator",
    type: "translation",
    category: "language",
    shortDescription: "Fast, accurate English to Spanish translation.",
    description: "Reliable Spanish translations for everyday use, business, and learning.",
    sourceLanguage: "English",
    targetLanguage: "Spanish",
    allowSwap: true,
    status: "active",
    systemPrompt: "Translate the provided text into natural, conversational Spanish. If the input is in Spanish, translate it to English. Preserve the tone (formal or informal) of the original text.",
    seo: {
      title: "Spanish Translator | English to Spanish Translation",
      description: "Free, highly accurate English to Spanish translator. Translate words, phrases, and documents instantly.",
    },
    content: {
      introduction: "Instantly translate text between English and Spanish with high accuracy.",
      about: "Spanish is a global language with nearly 500 million native speakers. This tool helps you communicate effectively, whether you're traveling, studying, or conducting business.",
      howToUse: "Enter your text in the source box. The translation will appear instantly. Use the swap button to reverse the translation direction.",
      examples: [
        { input: "Hello, how are you?", output: "Hola, ¿cómo estás?", explanation: "Standard informal greeting." },
        { input: "I would like a coffee, please.", output: "Me gustaría un café, por favor.", explanation: "Polite request." }
      ],
      accuracyNote: "This translator provides highly accurate translations for general text. However, regional dialects, slang, and complex technical jargon may occasionally be translated using neutral or standard phrasing.",
      faqs: [
        { question: "Does it translate Castilian or Latin American Spanish?", answer: "The tool defaults to a neutral, universally understood Latin American Spanish, but will understand Castilian inputs." }
      ]
    },
    relatedTools: ["latin-translator"]
  },
  "elvish-translator": {
    id: "elvish-translator",
    slug: "elvish-translator",
    name: "Elvish Translator",
    type: "creative",
    category: "fictional",
    shortDescription: "Convert your text into Tolkien's Sindarin Elvish.",
    description: "A fun tool to translate phrases into Sindarin Elvish, perfect for fantasy fans and roleplayers.",
    sourceLanguage: "English",
    targetLanguage: "Sindarin Elvish",
    allowSwap: false,
    status: "active",
    systemPrompt: "Translate the following English text into Sindarin Elvish, the fictional language created by J.R.R. Tolkien. Prioritize known Sindarin vocabulary and grammar. Do not use English words if an Elvish equivalent exists. Render the output in Latin characters (Romanized), not Tengwar script.",
    seo: {
      title: "Elvish Translator | English to Sindarin Translation",
      description: "Translate English text into Sindarin Elvish. A fun, AI-powered fictional language tool for fantasy enthusiasts.",
    },
    content: {
      introduction: "Bring your fantasy world to life by translating English into Sindarin, one of the primary Elvish languages.",
      about: "Sindarin is a constructed language created by J.R.R. Tolkien for his Middle-earth legendarium. It was the everyday language of the Elves in the Third Age.",
      howToUse: "Type your English phrase into the input box. The tool will generate the Romanized Sindarin equivalent.",
      examples: [
        { input: "A star shines on the hour of our meeting", output: "Êl síla erin lû e-govaned 'wîn", explanation: "A traditional Elvish greeting." }
      ],
      accuracyNote: "This tool generates AI-approximated Sindarin based on available linguistic corpora. It is NOT an official Tolkien translation. Tolkien's languages are complex and incomplete, so the AI may construct approximations for modern words.",
      faqs: [
        { question: "Does this output Tengwar script?", answer: "No, this tool provides the Romanized (Latin alphabet) spelling of the Elvish words so you can easily read and pronounce them." }
      ]
    },
    relatedTools: ["emoji-translator", "latin-translator"]
  },
  "gen-z-translator": {
    id: "gen-z-translator",
    slug: "gen-z-translator",
    name: "Gen Z Translator",
    type: "transformation",
    category: "slang",
    shortDescription: "Translate regular text into modern internet slang.",
    description: "Stay up to date with internet terminology. Convert formal English into Gen Z and internet slang.",
    sourceLanguage: "Standard English",
    targetLanguage: "Gen Z Slang",
    allowSwap: false,
    status: "active",
    systemPrompt: "Rewrite the following text into modern Gen Z internet slang. Use current terminology (e.g., no cap, fr, rizz, based, bet, lowkey, cooked). Keep the core meaning intact but completely change the tone to sound like a teenager on TikTok or social media. Do not be overly cringy, but definitely use the slang.",
    seo: {
      title: "Gen Z Translator | English to Internet Slang",
      description: "Translate standard English into modern Gen Z internet slang. Decode teenage text messages and social media posts.",
    },
    content: {
      introduction: "Translate your standard, boring text into the ultimate Gen Z internet slang.",
      about: "Internet slang evolves rapidly, heavily influenced by TikTok, Twitch, and meme culture. This tool bridges the generational gap by converting formal sentences into contemporary slang.",
      howToUse: "Type a normal, professional, or standard English sentence. The translator will output the Gen Z equivalent.",
      examples: [
        { input: "I am telling the truth, that is very good.", output: "No cap, that's lowkey fire.", explanation: "Using 'no cap' for truth and 'fire' for good." },
        { input: "He is very charismatic.", output: "He's got W rizz fr.", explanation: "'Rizz' means charisma." }
      ],
      accuracyNote: "Slang changes extremely fast. The tool uses a snapshot of recent Gen Z vocabulary. It is meant for entertainment and should not be used in professional contexts.",
      faqs: [
        { question: "Is the output grammatically correct?", answer: "It uses 'internet grammar', which often ignores standard punctuation and capitalization rules intentionally." }
      ]
    },
    relatedTools: ["emoji-translator"]
  },
  "emoji-translator": {
    id: "emoji-translator",
    slug: "emoji-translator",
    name: "Emoji Translator",
    type: "creative",
    category: "fun",
    shortDescription: "Turn your sentences into expressive emoji sequences.",
    description: "Have fun converting words and sentences entirely into emojis.",
    sourceLanguage: "Text",
    targetLanguage: "Emoji",
    allowSwap: false,
    status: "active",
    systemPrompt: "Convert the following text entirely into a sequence of emojis that represent the meaning. Do not include ANY text or letters in the output, ONLY emojis. Try to capture the full story or meaning of the input using expressive emoji combinations.",
    seo: {
      title: "Emoji Translator | Text to Emoji Converter",
      description: "Convert your text, sentences, and phrases into pure emoji sequences. A fun creative tool for social media.",
    },
    content: {
      introduction: "Communicate without words by turning your text into expressive emoji sequences.",
      about: "Emojis have become a universal visual language. This tool attempts to distill the semantic meaning of your sentences into a purely visual emoji format.",
      howToUse: "Enter any text or story. The AI will output a string of emojis that conceptually represent your input.",
      examples: [
        { input: "I am going to sleep because I am tired.", output: "🥱🛌💤", explanation: "Yawning, bed, and sleep emojis." },
        { input: "We drove to the beach and ate pizza.", output: "🚗🏖️🍕😋", explanation: "Car, beach, pizza, and yum emojis." }
      ],
      accuracyNote: "Emoji translation is highly subjective. Different people interpret emojis differently. This tool is purely for creative and entertainment purposes.",
      faqs: [
        { question: "Will the output contain any text?", answer: "No, the output is designed to be 100% emojis." }
      ]
    },
    relatedTools: ["gen-z-translator", "elvish-translator"]
  }
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return TOOL_REGISTRY[slug];
}

export function getAllToolConfigs(): ToolConfig[] {
  return Object.values(TOOL_REGISTRY);
}
