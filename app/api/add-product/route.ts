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
      images: ["https://via.placeholder.com/150"],
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