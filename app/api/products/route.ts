import { NextResponse } from "next/server";
import { products as realProducts, artisans } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Transform real products to admin format
    const transformedProducts = realProducts.map(product => {
      // Find the artisan for this product
      const artisan = artisans.find(a => a.id === product.artisanId);

      // Calculate pricing (assuming platform takes 10% fee)
      const finalPrice = product.price;
      const platformFee = Math.round(finalPrice * 0.1); // 10% platform fee
      const artisanPrice = finalPrice - platformFee;

      // Generate some AI tools used (based on product features)
      const aiToolsUsed = [];
      if (product.description && product.description.length > 50) {
        aiToolsUsed.push("story_generator");
      }
      if (product.images && product.images.length > 0) {
        aiToolsUsed.push("photo_to_listing");
      }
      if (product.price && product.originalPrice) {
        aiToolsUsed.push("fair_price");
      }

      return {
        id: product.id,
        productTitle: product.title,
        craftType: product.craftType,
        artisanName: artisan?.name || "Unknown Artisan",
        artisanRegion: artisan?.region || product.region,
        artisanPrice: artisanPrice,
        platformFee: platformFee,
        finalPrice: finalPrice,
        aiToolsUsed: aiToolsUsed.length > 0 ? aiToolsUsed : ["story_generator"], // fallback
        createdAt: new Date().toISOString().split('T')[0], // Use today's date as createdAt
      };
    });

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}