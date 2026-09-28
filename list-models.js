const { GoogleGenAI } = require('@google/genai');

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const models = await ai.models.list();
    console.log("Available models:");
    for await (const m of models) {
      console.log(m.name);
    }
  } catch (e) {
    console.error(e);
  }
}

test();
