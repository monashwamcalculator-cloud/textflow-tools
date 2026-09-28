fetch("https://textflow-tools.vercel.app/api/translate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ toolId: "latin-translator", input: "how are you", isSwapped: false })
}).then(res => res.json().then(b => console.log(res.status, b))).catch(console.error);
