
import fs from 'fs'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface InlineData {
  data: string;
  mimeType: string;
}

interface GenerativePart {
  inlineData: InlineData;
}

function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

/**
 * Pass a prompt with or without an image to gemini and get a text response
 * @param prompt Text prompt to pass to gemini
 * @param relativeImagePath Relative path to the image to pass to gemini
 * @param imageExtension Extension of the image to pass to gemini
 * @returns Text response from gemini
 */
async function askGemini(prompt: string, relativeImagePath?: string, imageExtension?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

  const data: (string | GenerativePart)[] = [prompt]

  if (relativeImagePath) {
    data.push(fileToGenerativePart(relativeImagePath, `image/${imageExtension}`))
  }

  const result = await model.generateContent(data);
  const response = result.response;
  const text = response.text();
  return text;
}

export { askGemini };