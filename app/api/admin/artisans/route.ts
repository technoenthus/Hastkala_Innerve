import { NextRequest, NextResponse } from 'next/server';
import { artisans as realArtisans } from '@/lib/data';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // First fetch the products to calculate earnings
    const productsRes = await fetch("http://localhost:3000/api/products", {
      cache: "no-store"
    });

    if (!productsRes.ok) {
      throw new Error("Failed to fetch products for artisan calculations");
    }

    const products = await productsRes.json();

    // Calculate artisan data from real products
    const artisansData = realArtisans.map(artisan => {
      // Find products for this artisan
      const artisanProducts = products.filter((p: any) => p.artisanName === artisan.name);

      const productCount = artisanProducts.length;
      const totalEarnings = artisanProducts.reduce((sum: number, p: any) => sum + p.artisanPrice, 0);

      return {
        id: artisan.id,
        name: artisan.name,
        region: artisan.region,
        productCount: productCount,
        totalEarnings: totalEarnings,
        craft: artisan.craft,
      };
    });

    return NextResponse.json({
      success: true,
      data: artisansData
    });
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}
