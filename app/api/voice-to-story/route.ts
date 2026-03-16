import { NextRequest, NextResponse } from "next/server";
import { generateCraftStory, mockStory } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { artisanName, craftType, region, voiceTranscript } = body;

    if (!voiceTranscript) {
      return NextResponse.json({ error: "voiceTranscript is required" }, { status: 400 });
    }

    const result = await generateCraftStory({ artisanName, craftType, region, voiceTranscript });
    return NextResponse.json(result);
  } catch (err) {
    console.error("voice-to-story error:", err);
    return NextResponse.json(mockStory);
  }
}
