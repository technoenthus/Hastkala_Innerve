import { NextRequest, NextResponse } from "next/server";
import { generateSocialMediaKit } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const result = await generateSocialMediaKit(body);
    return NextResponse.json(result);
  } catch (e) {
    console.error("[social-media-kit]", e);
    // Return fallback captions so the UI never breaks
    const { productTitle = "", craftType = "", artisanName = "", region = "", description = "" } = body;
    return NextResponse.json({
      captions: [
        { platform: "Instagram", caption: `Every detail of this ${craftType} piece tells a story rooted in ${region}. ${artisanName} has spent decades perfecting this art — and it shows in every line.`, hashtags: ["HandmadeInIndia", craftType.replace(/ /g, ""), "ArtisanCraft", "IndianHeritage", "SupportArtisans", "CraftRevival", "SlowFashion", "MadeWithLove"] },
        { platform: "Instagram", caption: `${craftType} is a tradition passed down through generations in ${region}. Each piece takes hours of skilled handwork — no machines, no shortcuts. Just pure craft.`, hashtags: ["CraftFacts", "IndianCraft", "Heritage", "Handmade", "ArtisanIndia", "TraditionalArt", "CulturalHeritage", "Authentic"] },
        { platform: "Facebook", caption: `Behind every piece is a story. ${artisanName} from ${region} creates each ${craftType} work by hand, using techniques refined over a lifetime. "${productTitle}" — this is what we mean when we say handmade.`, hashtags: ["BehindTheScenes", "ArtisanStory", "Handmade", "IndianCraft", "SupportLocal"] },
        { platform: "Facebook", caption: `Own a piece of India's living heritage. "${productTitle}" by ${artisanName} — crafted with tradition, made for your home. Limited pieces available. Link in bio.`, hashtags: ["ShopNow", "IndianArt", "Handmade", "ArtisanMarketplace", "GiftIdeas"] },
        { platform: "Instagram Reels", caption: `This is what 30 years of mastery looks like. ✨ ${artisanName}'s ${craftType} work from ${region} — where every line is a prayer. Would you hang this in your home?`, hashtags: ["ArtisanIndia", "CraftRevival", "IndianArt", "Handmade", "ReelItFeelIt", "CulturalPride", "Heritage", "Viral"] },
      ],
    });
  }
}
