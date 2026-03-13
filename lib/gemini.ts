// Google Gemini AI Integration Layer
// Requires GEMINI_API_KEY in environment variables

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Add it to .env.local");
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
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
  voiceTranscript: string; // raw transcript from artisan
  region: string;
}): Promise<{
  story: string;
  productDescription: string;
  marketingCaption: string;
}> {
  const prompt = `
You are a world-class storytelling editor specializing in Indian craft culture.

An artisan has described their work in their own words. Transform this raw description into three outputs:

ARTISAN: ${input.artisanName}
CRAFT TRADITION: ${input.craftType}
REGION: ${input.region}
ARTISAN'S OWN WORDS: "${input.voiceTranscript}"

Generate exactly this JSON (no markdown, raw JSON only):
{
  "story": "<2-3 paragraph emotional craft story, first-person, honest, rooted in place and tradition>",
  "productDescription": "<1 paragraph professional product description, 80-120 words, for an international buyer>",
  "marketingCaption": "<Instagram caption, 2-3 sentences, includes 5 relevant hashtags>"
}

Keep the artisan's voice authentic. Don't romanticize poverty. Celebrate skill and tradition.
`;

  const raw = await callGemini(prompt);
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      story: raw,
      productDescription: "",
      marketingCaption: "",
    };
  }
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
  const VISION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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

// --- Mock mode for demo without API key ---
export const mockStory = {
  story: `I am Meera. I learned to paint before I learned to write. My grandmother would wake before sunrise, mix her pigments from the plants that grew behind our house — the indigo vine, the turmeric root, the lamp-black from the kitchen — and by the time the sun reached the courtyard, the wall would already have gods in it.

I have been painting for thirty-four years. My hands know the fish motif the way my lungs know breathing. But each painting is still a conversation. The bamboo twig tells me where it wants to go. I follow.

When you buy this painting, you are not buying decoration. You are buying a conversation between my grandmother's hands and mine, stretched across fifty years and pressed into paper so it can travel to your wall.`,
  productDescription:
    "A masterwork of Madhubani painting tradition by National Award winner Meera Devi. Created using hand-ground natural pigments on handmade paper, this sacred fish pair depicts the Matsya motif — symbol of prosperity in Mithila culture. Each line is drawn freehand with a bamboo twig brush. No two paintings are identical.",
  marketingCaption:
    "Born from the mud walls of Mithila, now finding new walls to live on. This Matsya painting by Meera Devi carries 2,500 years of prayer in its pigments. #MadhubaniArt #IndianCraft #Handmade #ArtisanIndia #HeritageLiving",
};

export const mockListing = {
  title: "Madhubani Sacred Fish Pair — Natural Pigments on Paper",
  description:
    "Traditional Mithila folk painting depicting twin fish, symbol of good fortune and fertility. Hand-painted by master artisan using natural pigments — turmeric yellow, indigo blue, lamp black. Bamboo twig brushwork creates characteristic fine-line details. Unique piece, certificate of authenticity included.",
  tags: ["Madhubani", "Bihar", "Natural Pigments", "Folk Art", "Fish Motif", "Handmade"],
  category: "Paintings",
  suggestedMaterials: "Natural pigments, handmade paper, bamboo twig",
};
