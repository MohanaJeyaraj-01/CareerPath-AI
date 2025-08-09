// server/index.js
require("dotenv").config();
console.log("🔑 OPENROUTER_API_KEY loaded?", !!process.env.OPENROUTER_API_KEY);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios"); // 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Career AI Backend Running");
});

// 🧠 Analyze questionnaire responses
app.post("/api/analyze", (req, res) => {
  const answers = req.body.answers;

  const score = {
    tech: 0,
    design: 0,
    management: 0,
  };

  answers.forEach((ans) => {
    if (ans === "tech") score.tech++;
    else if (ans === "design") score.design++;
    else if (ans === "management") score.management++;
  });

  let recommendation = "Software Developer";
  if (score.design > score.tech && score.design > score.management) {
    recommendation = "UI/UX Designer";
  } else if (score.management > score.tech) {
    recommendation = "Project Manager";
  }

  res.json({ recommendation, score });
});

// 💬 GPT-3.5 Chatbot Route
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI career counselor. Provide job suggestions, learning paths, and growth advice based on the student's skills and interests.",
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message;
    res.json(reply);
  } catch (error) {
    console.error("🔴 OpenAI Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error fetching reply from GPT",
      details: error.response?.data || error.message,
    });
  }
});

// 🟢 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// 💬 OpenRouter Chatbot Route
app.post("/api/chat/openrouter", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // Or another model from OpenRouter
        messages: [
          {
            role: "system",
            content:
              "You are a helpful AI career counselor. Provide job suggestions, learning paths, and growth advice based on the student's skills and interests.",
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // optional but recommended
          "X-Title": "Career AI Chatbot",          // optional
        },
      }
    );

    const reply = response.data.choices[0].message;
    res.json(reply);
  } catch (error) {
    console.error("🔴 OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error fetching reply from OpenRouter",
      details: error.response?.data || error.message,
    });
  }
});
