import { NextRequest, NextResponse } from "next/server";
import { generateListingFromPhoto } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, artisanRegion, craftType } = body;

    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: "imageBase64 and mimeType are required" },
        { status: 400 }
      );
    }

    const result = await generateListingFromPhoto({ imageBase64, mimeType, artisanRegion, craftType });
    return NextResponse.json(result);
  } catch (err) {
    console.error("photo-to-listing error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
