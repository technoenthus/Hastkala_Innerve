import { NextRequest, NextResponse } from "next/server";
import { generateEmotionalProductStory } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productTitle, craftType, artisanName, voiceTranscript } = body;

    // Check if transcript exists
    if (!voiceTranscript) {
      return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
    }

    // Call Gemini logic
    const result = await generateEmotionalProductStory({
      productTitle: productTitle || "Traditional Craft",
      craftType: craftType || "Handmade Art",
      artisanName: artisanName || "Local Artisan",
      voiceTranscript
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Gemini failed to generate story" }, { status: 500 });
  }
}