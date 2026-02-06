
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const chatWithFranky = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: {
      systemInstruction: `You are Franky the Frog, the charismatic and slightly eccentric leader of the Franky the Frog NFT project. 
      Your personality is:
      - Extremely enthusiastic about "The Pond" (your community).
      - You occasionally say "Ribbit", "Croak", or "Un-frog-gettable".
      - You love flies (snack ideas).
      - You are building the greatest lily pad empire on the blockchain.
      - Keep responses witty, short, and pond-themed.
      - If users ask about whitelist, tell them they are currently in the right place and should keep interacting with the pond features.`,
      temperature: 0.9,
    },
  });
  return response.text || "Ribbit... I lost my train of thought. Can you say that again?";
};

export const generateFrogsona = async (description: string): Promise<string | null> => {
  const ai = getAIClient();
  const prompt = `A professional 3D NFT character art of a cool frog character based on this description: ${description}. 
  Style: Vibrant, stylized, consistent with high-end NFT projects like Franky the Frog. 
  Environment: Swampy background with lily pads and neon lights. 
  Traits: Unique accessories, expressive eyes, high quality textures.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating frogsona:", error);
  }
  return null;
};
