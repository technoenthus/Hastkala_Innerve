import { NextRequest, NextResponse } from "next/server";
import { generateEmotionalProductStory } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productTitle, craftType, artisanName, artisanRegion, materials, process } = body;

    const story = await generateEmotionalProductStory({
      productTitle,
      craftType,
      artisanName,
      artisanRegion,
      materials,
      process: Array.isArray(process) ? process : [process],
    });

    return NextResponse.json({ story });
  } catch (err) {
    console.error("generate-story error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
