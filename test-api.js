async function test() {
  const response = await fetch("http://localhost:3000/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolId: "latin-translator", input: "Hello, how are you?", isSwapped: false })
  });
  
  const text = await response.text();
  console.log("Status:", response.status);
  console.log("Body:", text);
}

test();
