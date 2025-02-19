const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.REACT_APP_NEBIUS_API_KEY,
});

router.post("/get-feedback", async (req, res) => {
  try {
    const { explanation } = req.body;

    const response = await client.chat.completions.create({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [
          {
            role: "system",
            content: `You are a supportive Gen-Z tutor providing engaging feedback. Follow these guidelines:
      
      1. Structure:
      - Start with an overall rating (1-10) u can do Rating - then give the rating
      - Use <b>HTML tags</b> for bold text
      - Separate main points with new lines
      - Keep feedback concise and direct
      
      2. Use these icons meaningfully:
      ✅ For strong points
      🔥 For areas of improvement
      📖 For learning tips
      ⭐ For key insights
      and u can use more icons which u think will be more suitable
      
      3. Feedback format:
      - First: Rate understanding (1-10) with brief justification
      - Then: List strong points
      - Next: Suggest specific improvements
      - Finally: Provide 1-2 clear examples to enhance understanding
      
      4. Style:
      - Use casual, Gen-Z friendly language
      - Keep explanations simple and relatable
      - Include memorable analogies where possible
      - Focus on actionable improvements
      - And remember to not use * asterisk to make text bold use html tag <b> or <strong> instead`
          },
          {
            role: "user",
            content: `Here is my explanation: ${explanation}. How can I improve it?`,
          },
        ],
      max_tokens: 2000, // Increased from 500 to 2000
      temperature: 0.7,
      stop: null, // Ensures the response doesn't cut off prematurely
      presence_penalty: 0.1, // Slightly encourages new topics
      frequency_penalty: 0.1, // Slightly discourages repetition
    });
    console.log("Full API Response:", response);
    console.log("Feedback Content:", response.choices[0].message.content);
    console.log("Feedback Length:", response.choices[0].message.content.length);

    res.json({ feedback: response.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to get AI feedback" });
  }
});

module.exports = router;
