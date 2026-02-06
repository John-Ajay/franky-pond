import { GoogleGenAI } from "@google/genai";

// Declare process for TypeScript so it doesn't fail the build
declare global {
  interface Window {
    process: {
      env: {
        API_KEY: string;
      };
    };
  }
}

const getAIClient = () => {
  // Use a fallback to ensure we never pass 'undefined' as a string
  const apiKey = (process.env.API_KEY) || '';
  return new GoogleGenAI({ apiKey });
};

export const chatWithFranky = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  const ai = getAIClient();
  try {
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
  } catch (error) {
    console.error("Chat error:", error);
    return "Oops, caught a fly in my throat. Try again?";
  }
};

export const generateFrogsona = async (description: string): Promise<string | null> => {
  const ai = getAIClient();
  // Simplified prompt to avoid triggering safety filters unnecessarily
  const prompt = `Stylized 3D character art of a frog NFT character based on: ${description}. Vibrant colors, high quality digital art style, matching Franky the Frog collection vibes.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      console.error("No candidates returned from Gemini API");
      return null;
    }

    const candidate = response.candidates[0];
    
    if (candidate.finishReason === 'SAFETY') {
      console.warn("Generation was blocked by Safety filters. Try a different prompt.");
      return null;
    }

    // Iterate through all parts to find the image data
    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    console.error("No inlineData found in the response parts.");
    return null;
  } catch (error) {
    console.error("Detailed Image Generation Error:", error);
    return null;
  }
};