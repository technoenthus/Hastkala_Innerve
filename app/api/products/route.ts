import { NextResponse } from "next/server";
import { products as realProducts, artisans } from "@/lib/data";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "orders.json");

function readOrders() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export async function GET() {
  try {
    // Read orders from JSON file
    const orders = readOrders();

    // Transform real products with sold count from orders
    const transformedProducts = realProducts.map(product => {
      // Find the artisan for this product
      const artisan = artisans.find(a => a.id === product.artisanId);

      // Calculate sold count from fetched orders, match by productId
      const soldCount = orders.filter(o => o.productId === product.id).length;

      // Calculate pricing (assuming platform takes 20% fee for admin, 10% for user-facing)
      const finalPrice = product.price;
      const platformFee = Math.round(finalPrice * 0.2); // 20% platform fee
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
        soldCount: soldCount,
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