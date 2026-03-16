// lib/gemini.ts

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY) as string;

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.error("Missing API Key");
    return "Error: API Key not configured.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1, 
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini Error Details:", data);
      throw new Error(data.error?.message || "Gemini API failure");
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}

function cleanJSON(raw: string) {
  try {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error("No JSON found");
    
    const jsonString = raw.substring(start, end + 1);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("JSON Parse Error. Raw text was:", raw);
    return null;
  }
}

// --- FEATURE 1: PHOTO TO LISTING ---
export async function generateListingFromPhoto(input: {
  imageBase64: string;
  mimeType: string;
  artisanRegion?: string;
  craftType?: string;
}) {
  const prompt = `
    Analyze this image of an Indian craft. 
    Return ONLY a JSON object:
    {
      "title": "compelling title",
      "description": "80-word emotional story",
      "tags": ["handmade", "india"],
      "category": "Pottery",
      "suggestedMaterials": "Natural Clay"
    }
  `;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: input.mimeType, data: input.imageBase64 } },
            { text: prompt }
          ]
        }],
      }),
    });

    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return cleanJSON(raw);
  } catch (error) {
    console.error("Vision API Error:", error);
    return null;
  }
}

// --- FEATURE 2: FAIR PRICE CALCULATOR ---
export async function calculateFairPrice(input: {
  craftType: string;
  materialCost: number;
  laborHours: number;
  region: string;
  rarity: string;
  hasGITag: boolean;
}) {
  const prompt = `
    Calculate fair price for ${input.craftType} from ${input.region}.
    Materials: ₹${input.materialCost}, Labor: ${input.laborHours}hrs, Rarity: ${input.rarity}, GI Tag: ${input.hasGITag}.
    
    Return ONLY JSON:
    {
      "suggestedPrice": 0,
      "priceBreakdown": { "materials": 0, "labor": 0, "premium": 0 },
      "reasoning": "string",
      "comparisonNote": "string"
    }
  `;

  const raw = await callGemini(prompt);
  return cleanJSON(raw);
}

// --- FEATURE 3: UNIFIED STORY GENERATOR ---
export async function generateEmotionalProductStory(input: {
  productTitle: string;
  craftType: string;
  artisanName: string;
  voiceTranscript: string;
}) {
  const prompt = `
    Analyze this transcript and return ONLY a JSON object.
    TRANSCRIPT: "${input.voiceTranscript}"
    PRODUCT: "${input.productTitle}"
    ARTISAN: "${input.artisanName}"
    CRAFT: "${input.craftType}"

    JSON FORMAT:
    {
      "story": "2-paragraph emotional heritage story",
      "extractedRegion": "Region name",
      "extractedMaterials": "Materials list",
      "extractedProcess": "1-sentence process"
    }
  `;

  try {
    const raw = await callGemini(prompt);
    const result = cleanJSON(raw);

    return result || {
      story: raw,
      extractedRegion: "Mithila, Bihar",
      extractedMaterials: "Handmade Paper, Natural Pigments",
      extractedProcess: "Traditional hand-painting with bamboo sticks"
    };
  } catch (error) {
    return {
      story: "The weaving of this story encountered a temporary hurdle, but the craft remains eternal.",
      extractedRegion: "Traditional India",
      extractedMaterials: "Natural elements",
      extractedProcess: "Handcrafted heritage"
    };
  }
}