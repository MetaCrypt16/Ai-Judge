
import { GoogleGenAI, Type } from "@google/genai";
import { Message, JudgeVerdict } from "../types";

// Note: getAiOpponentResponse is deprecated as the platform is now strictly human vs human local multiplayer.

export const evaluateDebate = async (
  topic: string,
  history: Message[]
): Promise<JudgeVerdict> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const transcript = history.map(m => `[Side: ${m.side}] [Speaker: ${m.sender}]: ${m.text}`).join('\n\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{
        parts: [{
          text: `You are an expert, unbiased professional debate judge. Two humans have just finished a structured debate on the topic: "${topic}".
          
          Here is the full debate transcript:
          ${transcript}
          
          Your task is to provide a final verdict in strict JSON format.
          
          Evaluation criteria:
          1. Logic: Consistency and validity of reasoning.
          2. Evidence: Use of facts, data, and citations (or logic-based evidence if facts aren't available).
          3. Rebuttal: How effectively they countered the opponent's specific points.
          4. Clarity: Quality of rhetoric and ease of understanding.
          
          Provide the verdict with:
          - winner: Exactly "PRO" or "CON".
          - reasoning: A 2-paragraph evaluation explaining why the winner prevailed. Be specific about which arguments were most effective.
          - scores: numeric scores from 0-10 for each criteria.`
        }]
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            scores: {
              type: Type.OBJECT,
              properties: {
                logic: { type: Type.NUMBER },
                evidence: { type: Type.NUMBER },
                rebuttal: { type: Type.NUMBER },
                clarity: { type: Type.NUMBER },
              },
              required: ["logic", "evidence", "rebuttal", "clarity"]
            }
          },
          required: ["winner", "reasoning", "scores"]
        }
      }
    });

    const verdict = JSON.parse(response.text || '{}');
    
    // Simulate blockchain verification hash
    const mockHash = "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    return {
      winner: verdict.winner || 'PRO',
      reasoning: verdict.reasoning || 'No reasoning provided by the judge.',
      scores: verdict.scores || { logic: 0, evidence: 0, rebuttal: 0, clarity: 0 },
      blockchainHash: mockHash
    };
  } catch (error) {
    console.error("Gemini Judging Error:", error);
    throw new Error("Failed to evaluate the debate. The AI judge is currently offline.");
  }
};
