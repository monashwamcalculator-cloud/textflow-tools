async function test() {
  const model = "gemini-1.5-flash";
  const apiKey = "DUMMY_KEY";
  const prompt = "test";
  
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
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
