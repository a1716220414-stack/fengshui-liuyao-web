import { GoogleGenAI } from "@google/genai";

type GenerateAIReadingOptions = {
  prompt: string;
  maxOutputTokens?: number;
};

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return new GoogleGenAI({
    apiKey,
  });
}

export async function generateAIReading({
  prompt,
  maxOutputTokens = 1200,
}: GenerateAIReadingOptions) {
  const ai = getGeminiClient();

  const model = process.env.AI_MODEL || "gemini-2.5-flash";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0.45,
      maxOutputTokens,
    },
  });

  const text = response.text;

  if (!text || !text.trim()) {
    throw new Error("AI returned empty response");
  }

  return text.trim();
}