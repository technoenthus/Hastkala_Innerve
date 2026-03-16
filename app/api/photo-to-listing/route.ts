import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_LISTINGS, getSampleByCraftType } from "@/lib/sample-listings-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, craftType } = body;

    // Try match by filename
    if (filename) {
      const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase();
      const match = SAMPLE_LISTINGS.find(s =>
        s.sampleImagePath.toLowerCase().includes(nameWithoutExt)
      );
      if (match) return NextResponse.json({ ...match, unknown: false });
    }

    // Try match by craftType hint
    if (craftType) {
      const match = getSampleByCraftType(craftType);
      if (match) return NextResponse.json({ ...match, unknown: false });
    }

    return NextResponse.json({ unknown: true });
  } catch (err) {
    console.error("photo-to-listing error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
