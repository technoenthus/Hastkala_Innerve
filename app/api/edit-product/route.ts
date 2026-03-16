import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "@/lib/data";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, title, price, description, material, story, tags, process } = body;

    if (!productId || !title || !price) {
      return NextResponse.json(
        { error: "productId, title, and price are required" },
        { status: 400 }
      );
    }

    const updatedProduct = updateProduct(productId, {
      title,
      price,
      description,
      material,
      story,
      tags,
      process,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.error("edit-product error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}