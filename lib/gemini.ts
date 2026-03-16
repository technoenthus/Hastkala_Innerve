// lib/gemini.ts

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

async function callGemini(prompt: string, temperature = 0.85): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.error("Missing API Key");
    return "Error: API Key not configured.";
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens: 1024,
      },
    }),
  });

    if (!response.ok) {
      console.error("Gemini Error Details:", data);
      throw new Error(data.error?.message || "Gemini API failure");
    }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

// --- Feature 1: Voice/Text to Craft Story ---
export async function generateCraftStory(input: {
  artisanName: string;
  craftType: string;
  voiceTranscript: string;
  region: string;
}): Promise<{
  productTitle: string;
  productDescription: string;
  craftStory: string;
}> {
  const prompt = `You are helping a traditional artisan create a product story for an online craft marketplace.

=== LOCKED ARTISAN DETAILS (do NOT change these) ===
Artisan Name: ${input.artisanName}
Craft Type: ${input.craftType}
Region: ${input.region}
=====================================================

IMPORTANT: The craft type "${input.craftType}" is provided by the artisan and is the absolute truth.
Do NOT replace, rename, or substitute it with any other craft name.
Every output field must refer to "${input.craftType}" — never to any other craft.

The artisan recorded a voice message. The transcript may have speech-to-text errors.

Your job:
1. Clean and understand the transcript.
2. If the transcript has useful content, use it to enrich the story.
3. If the transcript is unclear, incomplete, or just greetings — do NOT invent details.
   Instead, write a simple story using only the artisan name, craft type, and region above.

Rules:
- Tone: warm, simple, authentic. Suitable for a global online marketplace.
- Do NOT invent techniques, history, or materials unless the artisan mentioned them.
- Do NOT use the words "timeless", "ancient wisdom", or "mystical".
- The craft name "${input.craftType}" must appear in productTitle and craftStory.

Transcript:
"""
${input.voiceTranscript}
"""

Return ONLY this raw JSON (no markdown, no explanation):
{
  "productTitle": "<max 8 words, must include '${input.craftType}'>",
  "productDescription": "<4-5 lines describing the handmade product, mention '${input.craftType}'>",
  "craftStory": "<3-4 sentences about ${input.artisanName} and ${input.craftType} tradition in ${input.region}>"
}`;

  const raw = await callGemini(prompt, 0.4);
  let parsed: { productTitle: string; productDescription: string; craftStory: string };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    return {
      productTitle: `${input.craftType} by ${input.artisanName}`,
      productDescription: raw,
      craftStory: `${input.artisanName} is a ${input.craftType} artisan from ${input.region}.`,
    };
  }

  // Validation: ensure craft type is present, correct if hallucinated
  const craftLower = input.craftType.toLowerCase();
  if (!parsed.productTitle.toLowerCase().includes(craftLower)) {
    parsed.productTitle = `${input.craftType} by ${input.artisanName}`;
  }
  if (!parsed.craftStory.toLowerCase().includes(craftLower)) {
    parsed.craftStory =
      `${input.artisanName} is a ${input.craftType} artisan from ${input.region}. ` + parsed.craftStory;
  }

  return parsed;
}

// --- FEATURE 1: PHOTO TO LISTING ---
export async function generateListingFromPhoto(input: {
  imageBase64: string;
  mimeType: string;
  artisanRegion?: string;
  craftType?: string;
}): Promise<{
  title: string;
  description: string;
  tags: string[];
  category: string;
  suggestedMaterials: string;
}> {
  const VISION_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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
      captions: [
        { platform: "Instagram", caption: `Every thread in this ${input.craftType} piece carries the memory of ${input.region}. ${input.artisanName} has spent decades perfecting this art so you can wear a piece of living history.`, hashtags: ["HandmadeInIndia", "ArtisanCraft", input.craftType.replace(" ", ""), "IndianHeritage", "SupportArtisans", "CraftRevival", "SlowFashion", "MadeWithLove"] },
        { platform: "Instagram", caption: `Did you know? ${input.craftType} is a tradition passed down through generations in ${input.region}. Each piece takes hours of skilled handwork — no machines, no shortcuts.`, hashtags: ["CraftFacts", "IndianCraft", "Heritage", "Handmade", "ArtisanIndia", "TraditionalArt", "CulturalHeritage", "Authentic"] },
        { platform: "Facebook", caption: `Behind every piece from our collection is a story. ${input.artisanName} from ${input.region} creates each ${input.craftType} work by hand, using techniques refined over a lifetime. This is what we mean when we say handmade.`, hashtags: ["BehindTheScenes", "ArtisanStory", "Handmade", "IndianCraft", "SupportLocal"] },
        { platform: "Facebook", caption: `Own a piece of India's living heritage. "${input.productTitle}" by ${input.artisanName} — crafted with tradition, made for your home. Limited pieces available.`, hashtags: ["ShopNow", "IndianArt", "Handmade", "ArtisanMarketplace", "GiftIdeas"] },
        { platform: "Instagram Reels", caption: `This is what 30 years of mastery looks like. ✨ ${input.artisanName}'s ${input.craftType} work from ${input.region} — where every line is a prayer.`, hashtags: ["ArtisanIndia", "CraftRevival", "IndianArt", "Handmade", "Viral", "ReelItFeelIt", "CulturalPride", "Heritage"] },
      ],
    };
  }
}

// --- Mock mode for demo without API key ---
export const mockStory = {
  productTitle: "Madhubani Painting by Meera Devi",
  productDescription:
    "A handcrafted Madhubani painting by Meera Devi from Mithila, Bihar. Made with natural pigments on handmade paper using bamboo twig brushwork, this piece brings the warmth and spirit of Indian folk art into your home. Each stroke is made by hand, making every painting truly one of a kind.",
  craftStory:
    "Meera Devi has been practising Madhubani painting in Mithila, Bihar for over three decades. This art form has been kept alive by women like Meera who learned it from their mothers and grandmothers, painting on mud walls during weddings and festivals. When you bring this painting home, you carry forward a tradition that has survived for thousands of years.",
};

export const mockListing = {
  title: "Madhubani Sacred Fish Pair — Natural Pigments on Paper",
  description:
    "Traditional Mithila folk painting depicting twin fish, symbol of good fortune and fertility. Hand-painted by master artisan using natural pigments — turmeric yellow, indigo blue, lamp black. Bamboo twig brushwork creates characteristic fine-line details. Unique piece, certificate of authenticity included.",
  tags: ["Madhubani", "Bihar", "Natural Pigments", "Folk Art", "Fish Motif", "Handmade"],
  category: "Paintings",
  suggestedMaterials: "Natural pigments, handmade paper, bamboo twig",
};
