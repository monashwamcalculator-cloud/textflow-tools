import { Category, Tool } from "@/types";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "language-translators",
    slug: "language-translators",
    name: "Language Translators",
    icon: "Globe2",
    description: "Translate real-world languages with high accuracy.",
    toolCount: 12
  },
  {
    id: "historical-languages",
    slug: "historical-languages",
    name: "Historical Languages",
    icon: "Landmark",
    description: "Translate Latin, Ancient Greek, Old English, and more.",
    toolCount: 8
  },
  {
    id: "fictional-languages",
    slug: "fictional-languages",
    name: "Fictional Languages",
    icon: "Swords",
    description: "Elvish, Klingon, Valyrian and other fantasy languages.",
    toolCount: 15
  },
  {
    id: "slang-internet",
    slug: "slang-internet",
    name: "Slang & Internet",
    icon: "Smartphone",
    description: "Gen Z, internet terminology, and pop culture.",
    toolCount: 6
  },
  {
    id: "text-styles",
    slug: "text-styles",
    name: "Text Styles",
    icon: "Type",
    description: "Formal, casual, professional, and corporate tone conversions.",
    toolCount: 10
  },
  {
    id: "fun-creative",
    slug: "fun-creative",
    name: "Fun & Creative",
    icon: "Wand2",
    description: "Emoji, Pirate, Morse code, and binary conversions.",
    toolCount: 22
  }
];

export const MOCK_POPULAR_TOOLS: Tool[] = [
  {
    id: "latin-translator",
    slug: "latin-translator",
    name: "Latin Translator",
    category: "historical-languages",
    shortDescription: "Translate modern English to classical Latin instantly.",
    description: "A fast and accurate translator for classical Latin text.",
    icon: "BookOpen",
    type: "translation",
    status: "active"
  },
  {
    id: "elvish-translator",
    slug: "elvish-translator",
    name: "Elvish Translator",
    category: "fictional-languages",
    shortDescription: "Convert your text into Tolkien's Sindarin Elvish.",
    description: "A fun tool to translate phrases into Elvish.",
    icon: "Feather",
    type: "creative",
    status: "active"
  },
  {
    id: "gen-z-translator",
    slug: "gen-z-translator",
    name: "Gen Z Translator",
    category: "slang-internet",
    shortDescription: "Translate regular text into modern internet slang.",
    description: "Stay up to date with internet terminology.",
    icon: "MessageCircle",
    type: "transformation",
    status: "active"
  },
  {
    id: "emoji-translator",
    slug: "emoji-translator",
    name: "Emoji Translator",
    category: "fun-creative",
    shortDescription: "Turn your sentences into expressive emoji sequences.",
    description: "Have fun converting words into emojis.",
    icon: "Smile",
    type: "creative",
    status: "active"
  },
  {
    id: "spanish-translator",
    slug: "spanish-translator",
    name: "Spanish Translator",
    category: "language-translators",
    shortDescription: "Fast, accurate English to Spanish translation.",
    description: "Reliable Spanish translations for everyday use.",
    icon: "Languages",
    type: "translation",
    status: "active"
  },
  {
    id: "morse-code",
    slug: "morse-code",
    name: "Morse Code Translator",
    category: "fun-creative",
    shortDescription: "Encode and decode international Morse code.",
    description: "Easily translate text to Morse code and back.",
    icon: "Radio",
    type: "utility",
    status: "active"
  }
];
