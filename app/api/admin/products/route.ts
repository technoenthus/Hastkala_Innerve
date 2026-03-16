import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}