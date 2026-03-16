import { NextRequest, NextResponse } from "next/server";
import { getCraftStory } from "@/lib/craft-stories-db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { artisanName, craftType, region } = body;

  if (!craftType) {
    return NextResponse.json({ error: "craftType is required" }, { status: 400 });
  }

  const result = getCraftStory(
    craftType ?? "Handcraft",
    artisanName ?? "the artisan",
    region ?? "India"
  );
  return NextResponse.json(result);
}
