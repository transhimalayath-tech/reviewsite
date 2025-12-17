
import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonData } from "../types";

export async function generateProductComparison(productA: string, productB: string): Promise<{ data: ComparisonData, sources: any[] }> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Perform a detailed journalistic comparison between ${productA} and ${productB}. 
  Provide a professional analysis including specific pros and cons for each, a price comparison, and an affiliate-marketing friendly summary. 
  Determine which product wins for different use cases. 
  Return the result in a JSON structure that looks like this:
  {
    "title": "A catchy newspaper headline",
    "subtitle": "A journalistic subheadline",
    "date": "current date string",
    "category": "the product niche",
    "summary": "overview of the battle",
    "productA": { "name": "${productA}", "pros": ["..."], "cons": ["..."], "priceRange": "$...", "affiliateUrl": "search for a common store link", "rating": 4.5 },
    "productB": { "name": "${productB}", "pros": ["..."], "cons": ["..."], "priceRange": "$...", "affiliateUrl": "search for a common store link", "rating": 4.2 },
    "verdict": "the definitive final word",
    "author": "The Editorial Board"
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          date: { type: Type.STRING },
          category: { type: Type.STRING },
          summary: { type: Type.STRING },
          productA: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              priceRange: { type: Type.STRING },
              affiliateUrl: { type: Type.STRING },
              rating: { type: Type.NUMBER }
            },
            required: ["name", "pros", "cons", "priceRange", "affiliateUrl", "rating"]
          },
          productB: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              priceRange: { type: Type.STRING },
              affiliateUrl: { type: Type.STRING },
              rating: { type: Type.NUMBER }
            },
            required: ["name", "pros", "cons", "priceRange", "affiliateUrl", "rating"]
          },
          verdict: { type: Type.STRING },
          author: { type: Type.STRING }
        },
        required: ["title", "subtitle", "date", "category", "summary", "productA", "productB", "verdict", "author"]
      },
      tools: [{ googleSearch: {} }]
    }
  });

  const rawText = response.text;
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  try {
    const data = JSON.parse(rawText) as ComparisonData;
    return { data, sources };
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    throw new Error("The review could not be formatted properly. Please try again.");
  }
}
