export type ToolType = "translation" | "transformation" | "creative" | "utility";

export type ToolStatus = "active" | "draft" | "beta";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  icon: string;
  type: ToolType;
  featured?: boolean;
  status: ToolStatus;
  sourceLanguage?: string;
  targetLanguage?: string;
  // Future fields
  seoTitle?: string;
  metaDescription?: string;
  accuracyNote?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  toolCount: number;
}
