
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEncouragement = async (isCorrect: boolean, score: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a friendly cartoon star buddy for a kid's math app. 
      The child just answered a question ${isCorrect ? 'correctly' : 'incorrectly'}. 
      Their current score is ${score}/10. 
      Give a very short, cheerful, and encouraging sentence (max 10 words) using simple words for a 6-year-old. 
      Use emojis.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || (isCorrect ? "Great job! 🌟" : "Don't worry, try again! 🌈");
  } catch (error) {
    console.error("Gemini Error:", error);
    return isCorrect ? "Awesome work! ⭐" : "You can do it! 🎈";
  }
};

export const getEducationalNote = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain ${topic} to a 7-year-old in two simple, fun sentences. Use an analogy.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Learning is like a super power! Keep going.";
  } catch (error) {
    return "You're getting smarter every second!";
  }
};
