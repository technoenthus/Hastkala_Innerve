// Google Gemini AI Integration Layer
// Requires GEMINI_API_KEY in environment variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function callGemini(prompt: string, temperature = 0.85): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local");
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
    const err = await response.text();
    throw new Error(`Gemini API error: ${err}`);
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

// --- Feature 2: Photo to Product Listing ---
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
  const VISION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `
You are an expert in Indian handicrafts and artisan marketplaces.

Analyze this image of a handmade craft item and generate a marketplace listing.
${input.artisanRegion ? `The artisan is from: ${input.artisanRegion}` : ""}
${input.craftType ? `Craft tradition: ${input.craftType}` : ""}

Return exactly this JSON (raw JSON, no markdown):
{
  "title": "<compelling product title, 5-10 words>",
  "description": "<product description, 80-120 words, for international buyers, highlight handmade quality>",
  "tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>", "<tag6>"],
  "category": "<one of: Paintings, Pottery, Textiles, Sculptures, Jewelry, Woodwork, Other>",
  "suggestedMaterials": "<comma-separated list of likely materials>"
}
`;

  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set");

  const response = await fetch(VISION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: input.mimeType,
                data: input.imageBase64,
              },
            },
            { text: prompt },
          ],
        },
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  });

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      title: "Handcrafted Artisan Piece",
      description: raw,
      tags: ["Handmade", "Indian Craft"],
      category: "Other",
      suggestedMaterials: "Unknown",
    };
  }
}

// --- Feature 3: Fair Price Calculator ---
export async function calculateFairPrice(input: {
  craftType: string;
  materialCost: number;
  laborHours: number;
  region: string;
  rarity: "common" | "rare" | "endangered";
  hasGITag: boolean;
}): Promise<{
  suggestedPrice: number;
  priceBreakdown: {
    materialCost: number;
    laborCost: number;
    craftPremium: number;
    platformFee: number;
    total: number;
  };
  reasoning: string;
  comparisonNote: string;
}> {
  const prompt = `
You are a fair trade pricing expert specializing in Indian handicrafts.

Calculate a fair market price for this artisan product:

CRAFT TYPE: ${input.craftType}
MATERIAL COST: ₹${input.materialCost}
LABOR: ${input.laborHours} hours
REGION: ${input.region}
TRADITION RARITY: ${input.rarity}
GI TAG: ${input.hasGITag ? "Yes (Geographic Indication certified)" : "No"}

Consider:
- Fair wages for skilled artisans in ${input.region} (₹200-400/hour for specialized craft)
- Craft premium for heritage traditions
- Global market comparisons
- Sustainable pricing that supports the artisan's livelihood

Return exactly this JSON (raw JSON only):
{
  "suggestedPrice": <number in INR>,
  "priceBreakdown": {
    "materialCost": <number>,
    "laborCost": <number>,
    "craftPremium": <number>,
    "platformFee": <number>,
    "total": <number>
  },
  "reasoning": "<2-3 sentence explanation of pricing rationale>",
  "comparisonNote": "<how this compares to typical market price for similar items>"
}
`;

  const raw = await callGemini(prompt);
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    // Fallback calculation
    const laborRate = input.rarity === "endangered" ? 350 : input.rarity === "rare" ? 280 : 200;
    const laborCost = input.laborHours * laborRate;
    const craftPremium = input.hasGITag ? input.materialCost * 0.3 : 0;
    const subtotal = input.materialCost + laborCost + craftPremium;
    const platformFee = Math.round(subtotal * 0.15);
    return {
      suggestedPrice: subtotal + platformFee,
      priceBreakdown: {
        materialCost: input.materialCost,
        laborCost,
        craftPremium,
        platformFee,
        total: subtotal + platformFee,
      },
      reasoning: "Based on standard fair-trade guidelines for Indian handicrafts.",
      comparisonNote: "Priced fairly for both artisan livelihood and buyer value.",
    };
  }
}

// --- Feature 4: Emotional Story from Product Details ---
export async function generateEmotionalProductStory(input: {
  productTitle: string;
  craftType: string;
  artisanName: string;
  artisanRegion: string;
  materials: string;
  process: string[];
}): Promise<string> {
  const prompt = `
You are a master storyteller writing for a premium artisan marketplace.

Write an emotionally resonant 2-paragraph story for this product page.
The story should make a global buyer feel the connection between their purchase and the artisan's life.

PRODUCT: ${input.productTitle}
CRAFT: ${input.craftType}
ARTISAN: ${input.artisanName} from ${input.artisanRegion}
MATERIALS: ${input.materials}
PROCESS: ${input.process.join("; ")}

Rules:
- Write in second person ("When you hold this...")
- Reference the specific place, not generic "India"
- Mention the specific materials and how they were sourced or made
- End with what the buyer's purchase means to the artisan
- 150-200 words total
- No clichés ("timeless", "ancient wisdom", "mystical")
`;

  return callGemini(prompt);
}

// --- Feature 5: Social Media Kit ---
export async function generateSocialMediaKit(input: {
  productTitle: string;
  description: string;
  craftType: string;
  artisanName: string;
  region: string;
  price?: number;
}): Promise<{
  captions: { platform: string; caption: string; hashtags: string[] }[];
}> {
  const prompt = `
You are a social media marketing expert for Indian artisan products.

Generate 5 ready-to-post social media captions for this product.

PRODUCT: ${input.productTitle}
DESCRIPTION: ${input.description}
CRAFT: ${input.craftType}
ARTISAN: ${input.artisanName} from ${input.region}
${input.price ? `PRICE: ₹${input.price}` : ""}

Create 5 captions with different tones:
1. Emotional/storytelling (Instagram)
2. Educational/craft facts (Instagram)
3. Behind-the-scenes/process (Facebook)
4. Call-to-action/sale (Facebook)
5. Cultural pride (Instagram Reels)

Return exactly this JSON (raw JSON only):
{
  "captions": [
    { "platform": "Instagram", "caption": "<caption text, 2-4 sentences>", "hashtags": ["<8-10 relevant hashtags without #>"] },
    { "platform": "Instagram", "caption": "...", "hashtags": [...] },
    { "platform": "Facebook", "caption": "...", "hashtags": [...] },
    { "platform": "Facebook", "caption": "...", "hashtags": [...] },
    { "platform": "Instagram Reels", "caption": "...", "hashtags": [...] }
  ]
}

Rules: Be authentic, avoid generic phrases. Reference the specific craft, region, and artisan. Make buyers feel the human connection.
`;

  const raw = await callGemini(prompt);
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
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
  productTitle: "Warli Painting by Meera Devi",
  productDescription:
    "A handcrafted Warli painting by Meera Devi from Mithila, Bihar. Made with care using traditional techniques passed down through generations, this piece brings the warmth and spirit of Indian folk art into your home. Each stroke is made by hand, making every painting truly one of a kind. A meaningful piece of living heritage, crafted with love and skill.",
  craftStory:
    "Meera Devi has been practising Warli painting in Mithila, Bihar for many years. This art form has been kept alive by artisans like Meera who learned it from their mothers and grandmothers. When you bring this painting home, you carry forward a tradition that has survived for generations.",
};

export const mockListing = {
  title: "Madhubani Sacred Fish Pair — Natural Pigments on Paper",
  description:
    "Traditional Mithila folk painting depicting twin fish, symbol of good fortune and fertility. Hand-painted by master artisan using natural pigments — turmeric yellow, indigo blue, lamp black. Bamboo twig brushwork creates characteristic fine-line details. Unique piece, certificate of authenticity included.",
  tags: ["Madhubani", "Bihar", "Natural Pigments", "Folk Art", "Fish Motif", "Handmade"],
  category: "Paintings",
  suggestedMaterials: "Natural pigments, handmade paper, bamboo twig",
};
