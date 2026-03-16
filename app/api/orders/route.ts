import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { artisans } from "@/lib/data";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data", "orders.json");

function readOrders() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeOrders(orders: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, productName, artisanName, price } = body;

    if (!productId || !artisanName || typeof price !== "number") {
      return NextResponse.json(
        { success: false, error: "productId, artisanName, and numeric price are required" },
        { status: 400 }
      );
    }

    const orders = readOrders();

    const order = {
      id: Date.now(),
      productId,
      productName,
      artisanName,
      price,
      createdAt: new Date()
    };

    orders.push(order);

    writeOrders(orders);

    // Update artisan stats in memory
    const artisan = artisans.find(a => a.name === artisanName);
    if (artisan) {
      artisan.soldProducts += 1;
      artisan.totalEarnings += price;
    }

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (err) {
    console.error("order error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const orders = readOrders();
  return NextResponse.json({
    success: true,
    data: orders,
  });
}
