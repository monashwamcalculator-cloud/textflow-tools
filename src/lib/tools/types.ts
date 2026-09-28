export type ToolType =
  | "translation"
  | "transformation"
  | "creative"
  | "encoding";

export type ToolCategory =
  | "language"
  | "historical"
  | "fictional"
  | "slang"
  | "style"
  | "fun";

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolConfig {
  id: string;
  slug: string;
  name: string;
  type: ToolType;
  category: ToolCategory;

  description: string;
  shortDescription: string;

  sourceLanguage?: string;
  targetLanguage?: string;
  
  allowSwap?: boolean;

  featured?: boolean;
  status: "active" | "draft";

  systemPrompt: string;

  seo: {
    title: string;
    description: string;
    canonical?: string;
  };

  content: {
    introduction: string;
    about?: string;
    howToUse?: string;
    examples?: Example[];
    accuracyNote?: string;
    faqs?: FAQ[];
  };

  relatedTools?: string[];
}
