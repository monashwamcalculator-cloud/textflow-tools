import { ToolConfig } from "./types";

export function buildTranslationPrompt(toolConfig: ToolConfig, input: string): string {
  let prompt = `You are a highly capable ${toolConfig.name}.\n`;
  prompt += `Your task is to convert the following text as instructed.\n`;
  
  if (toolConfig.systemPrompt) {
    prompt += `\nINSTRUCTIONS:\n${toolConfig.systemPrompt}\n`;
  }

  prompt += `\nRULES:\n`;
  prompt += `- Return ONLY the translated or transformed text.\n`;
  prompt += `- Do not include any conversational filler, explanations, or quotes around the output.\n`;
  prompt += `- If the input is empty or just whitespace, return an empty string.\n`;
  prompt += `- Preserve the original formatting (paragraphs, line breaks) where possible.\n`;

  prompt += `\nINPUT TEXT:\n"""\n${input}\n"""\n`;
  prompt += `\nOUTPUT:\n`;

  return prompt;
}
