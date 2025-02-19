const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.REACT_APP_NEBIUS_API_KEY,
});

async function feynmanTechnique(concept) {
  const completion = await client.chat.completions.create({
    "max_tokens": 200,
    "temperature": 0.7,
    "top_p": 1,
    "top_k": 50,
    "n": 1,
    "stream": false,
    "model": "Qwen/Qwen2.5-Coder-32B-Instruct",
    "messages": [
      {
        "role": "system",
        "content": "You are an intelligent tutor that helps users learn through the Feynman Technique. When the user explains a concept, analyze their response, find gaps in understanding, and provide feedback. Encourage them to simplify their explanation and try again."
      },
      {
        "role": "user",
        "content": `I want to explain: ${concept}`
      }
    ]
  });

  console.log(completion.choices[0].message.content);
}

// Example usage
feynmanTechnique("Photosynthesis");
