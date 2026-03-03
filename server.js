import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: userMessage,
        stream: false
      })
    });

    const data = await response.json();
    res.json({ reply: data.response });

  } catch (error) {
    res.status(500).json({ error: "LLM error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
