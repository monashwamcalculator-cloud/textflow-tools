import { NextResponse } from 'next/server';
import { getToolConfig } from '@/lib/tools/registry';
import { buildTranslationPrompt } from '@/lib/tools/prompts';

const MAX_CHARS = 2000;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Extremely basic in-memory rate limiting (Replace with Redis/Upstash for production Vercel)
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function getRateLimitStatus(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Foundation
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!getRateLimitStatus(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Validate Request Body
    const body = await req.json();
    const { toolId, input, isSwapped } = body;

    if (!toolId || typeof input !== "string") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const textInput = input.trim();
    if (!textInput) {
      return NextResponse.json({ result: "" }, { status: 200 });
    }

    if (textInput.length > MAX_CHARS) {
      return NextResponse.json({ error: "Character limit exceeded." }, { status: 400 });
    }

    // 3. Get Tool Configuration
    const toolConfig = getToolConfig(toolId);
    if (!toolConfig) {
      return NextResponse.json({ error: "Tool not found." }, { status: 404 });
    }

    // Adjust config for swapped direction if applicable
    const activeConfig = { ...toolConfig };
    if (isSwapped && toolConfig.allowSwap) {
      activeConfig.sourceLanguage = toolConfig.targetLanguage;
      activeConfig.targetLanguage = toolConfig.sourceLanguage;
    }

    // 4. Validate API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not set.");
      return NextResponse.json(
        { error: "Translation service is currently unavailable (API key missing)." },
        { status: 503 }
      );
    }

    // 5. Build Prompt
    const prompt = buildTranslationPrompt(activeConfig, textInput);
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

    // 6. Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Gemini API Error:", errData);
      return NextResponse.json({ error: "Translation engine encountered an error." }, { status: 502 });
    }

    const data = await response.json();
    
    // 7. Validate & Format Response
    let resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    resultText = resultText.trim();

    return NextResponse.json({ result: resultText }, { status: 200 });
    
  } catch (error) {
    console.error("Translation API Error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
