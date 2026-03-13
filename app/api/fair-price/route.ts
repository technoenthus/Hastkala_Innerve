import { NextRequest, NextResponse } from "next/server";
import { calculateFairPrice } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { craftType, materialCost, laborHours, region, rarity, hasGITag } = body;

    const result = await calculateFairPrice({
      craftType,
      materialCost: Number(materialCost),
      laborHours: Number(laborHours),
      region,
      rarity: rarity ?? "rare",
      hasGITag: Boolean(hasGITag),
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("fair-price error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
