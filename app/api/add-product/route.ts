import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { artisans, Product } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const dataFile = path.join(process.cwd(), "data", "products.json");

    const fileData = fs.readFileSync(dataFile, "utf8");
    const productList = JSON.parse(fileData);
    const UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop"
    ];

    const newProduct: Product = {
      id: `product-${productList.length + 1}`,
      artisanId: body.artisanId,
      title: body.title || "Dummy Product",
      description: body.description || "This is a dummy product",
      story: "Dummy story",
      price: body.price || 1000,
      category: "Test",
      material: "Test Material",
      region: artisans.find((a) => a.id === body.artisanId)?.region || "Test",
      craftType: artisans.find((a) => a.id === body.artisanId)?.craft || "Test",
      images: [UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)]],
      tags: ["dummy"],
      laborHours: 5,
      inStock: true,
      featured: false,
      process: ["Step 1", "Step 2"],
    };

    productList.push(newProduct);

    fs.writeFileSync(dataFile, JSON.stringify(productList, null, 2));

    return NextResponse.json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
    });
  }
}