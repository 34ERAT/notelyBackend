import { GoogleGenAI } from "@google/genai";
import config from "../config/config";

const ai = new GoogleGenAI({ apiKey: config.gemini_api_key });
export async function genAi(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });
  return response.text;
}
