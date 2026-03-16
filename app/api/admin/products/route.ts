import { NextResponse } from "next/server";
import { products as productList, artisans } from "@/lib/data";
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

    // Use the existing products API format for dashboard
    const transformedProducts = productList.map((product) => {
      const finalPrice = product.price;
      const platformFee = Math.round(finalPrice * 0.2); // 20% platform fee
      const artisanPrice = finalPrice - platformFee;

      const artisan = artisans.find((a) => a.id === product.artisanId);
      const artisanName = artisan?.name ?? "Unknown Artisan";

      // Calculate soldCount from fetched orders
      const soldCount = orders.filter(o => o.productId === product.id).length;

      const aiToolsUsed = [];
      if (product.description && product.description.length > 50) aiToolsUsed.push("story_generator");
      if (product.images && product.images.length > 0) aiToolsUsed.push("photo_to_listing");
      if (product.price && product.originalPrice) aiToolsUsed.push("fair_price");

      return {
        id: product.id,
        productTitle: product.title,
        craftType: product.craftType,
        artisanName: artisanName,
        artisanRegion: product.region,
        artisanPrice,
        platformFee,
        finalPrice,
        soldCount,
        aiToolsUsed: aiToolsUsed.length > 0 ? aiToolsUsed : ["story_generator"],
        createdAt: new Date().toISOString().split("T")[0],
      };
    });

    const totalCraftsListed = transformedProducts.length;
    const totalCraftsSold = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
    const totalArtisanEarnings = totalRevenue * 0.8;
    const totalPlatformEarnings = totalRevenue * 0.2;

    const stats = {
      totalCraftsListed,
      totalCraftsSold,
      totalRevenue,
      totalArtisanEarnings,
      totalPlatformEarnings,
    };

    return NextResponse.json({
      success: true,
      data: {
        products: transformedProducts,
        orders,
        stats,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { success: false, data: { products: [], orders: [], stats: {} } },
      { status: 500 }
    );
  }
}