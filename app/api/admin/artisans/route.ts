import { NextResponse } from 'next/server';
import { artisans, products } from '@/lib/data';
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

    const artisansData = artisans.map((artisan) => {
      // Filter orders by artist name to ensure exact match
      const artisanOrders = orders.filter((o) => o.artisanName === artisan.name);
      
      // Calculate sold products from matched orders
      const soldProducts = artisanOrders.length;
      
      // Calculate total earnings from matched orders
      const totalEarnings = artisanOrders.reduce((sum, o) => sum + o.price, 0);
      
      // Count products listed by this artisan
      const productsListed = products.filter(p => p.artisanId === artisan.id).length;

      return {
        name: artisan.name,
        artistName: artisan.name,
        craft: artisan.craft,
        craftType: artisan.craft,
        region: artisan.region,
        productsListed,
        soldProducts,
        totalEarnings,
      };
    });

    return NextResponse.json({
      success: true,
      data: artisansData,
    });
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}
