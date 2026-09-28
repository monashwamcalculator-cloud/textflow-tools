import { NextResponse } from 'next/server';
import { getToolConfig } from '@/lib/tools/registry';
import { buildTranslationPrompt } from '@/lib/tools/prompts';
import { GoogleGenAI } from '@google/genai';

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
    const apiKey = process.env.GEMINI_API_KEY || process.env.GeminiAPIKey;
    if (!apiKey) {
      console.error("API key environment variables are not set.");
      return NextResponse.json(
        { error: "Translation service is currently unavailable (API key missing)." },
        { status: 503 }
      );
    }

    // 5. Build Prompt
    const prompt = buildTranslationPrompt(activeConfig, textInput);
    
    // Prefer stable production flash model, defaulting to the newest
    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.8-flash";
    const fallbackModel = "gemini-2.5-flash";

    // 6. Call Gemini API using Official SDK
    const ai = new GoogleGenAI({ apiKey });

    try {
      let response;
      let retries = 2;
      let attempt = 0;
      
      while (attempt <= retries) {
        try {
          response = await ai.models.generateContent({
            model: primaryModel,
            contents: prompt,
            config: { temperature: 0.3, maxOutputTokens: 2048 }
          });
          break; // Success!
        } catch (err: any) {
          if (attempt < retries && (err?.status === 503 || err?.message?.includes("high demand") || err?.status === 429)) {
            attempt++;
            console.warn(`[Attempt ${attempt}] Google API overloaded. Retrying in 1.5s...`);
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            throw err;
          }
        }
      }

      // 7. Validate & Format Response
      let resultText = response.text || "";
      return NextResponse.json({ result: resultText.trim() }, { status: 200 });

    } catch (apiError: any) {
      // Log the full error internally but do NOT expose the API key in the client response
      console.error("Gemini API Engine Error details:", apiError);
      
      let safeErrorMessage = "Translation engine encountered an error.";
      const errStatus = apiError.status || 502;
      const rawMessage = apiError.message || "";
      
      if (rawMessage.includes("API key not valid") || errStatus === 400 || errStatus === 401) {
         safeErrorMessage = "Translation engine configuration error: Invalid API Key.";
      } else if (rawMessage.includes("quota") || errStatus === 429) {
         safeErrorMessage = "Translation engine is currently over capacity. Please try again later.";
      } else if (rawMessage.includes("experiencing high demand") || errStatus === 503) {
         safeErrorMessage = "The Google AI translation engine is currently overloaded and experiencing high demand. Spikes are temporary, please try again in a minute.";
      } else if (errStatus === 404 || rawMessage.includes("is not found")) {
         safeErrorMessage = `Translation engine configuration error: Model not found. (${rawMessage})`;
      } else {
         safeErrorMessage = `Translation engine encountered an error: ${rawMessage || "Unknown cause"}`;
      }
      
      return NextResponse.json({ error: safeErrorMessage }, { status: errStatus });
    }
    
  } catch (error) {
    console.error("Translation Endpoint Error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
