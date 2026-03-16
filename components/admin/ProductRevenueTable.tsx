"use client";

import React from "react";

interface Product {
  id: string;
  productTitle: string;
  craftType: string;
  artisanName: string;
  artisanRegion: string;
  artisanPrice: number;
  platformFee: number;
  finalPrice: number;
  aiToolsUsed: string[];
  createdAt: string;
}

interface ProductRevenueTableProps {
  products: Product[];
}

const toolNames = {
  story_generator: "Story Generator",
  photo_to_listing: "Photo → Listing",
  fair_price: "Fair Price Calculator",
};

export default function ProductRevenueTable({
  products,
}: ProductRevenueTableProps) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Product Revenue Table</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Craft Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Artisan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Artisan Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Platform Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Final Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Margin %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                AI Tools
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {

              const margin =
                product.finalPrice > 0
                  ? ((product.platformFee / product.finalPrice) * 100).toFixed(
                      2
                    )
                  : "0";

              return (
                <tr key={product.id}>
                  <td className="px-6 py-4 text-sm font-medium">
                    {product.productTitle}
                  </td>
                  <td className="px-6 py-4 text-sm">{product.craftType}</td>
                  <td className="px-6 py-4 text-sm">{product.artisanName}</td>
                  <td className="px-6 py-4 text-sm">₹{product.artisanPrice}</td>
                  <td className="px-6 py-4 text-sm">₹{product.platformFee}</td>
                  <td className="px-6 py-4 text-sm">₹{product.finalPrice}</td>
                  <td className="px-6 py-4 text-sm">{margin}%</td>
                  <td className="px-6 py-4 text-sm">
                    {product.aiToolsUsed
                      .map(
                        (tool) =>
                          toolNames[tool as keyof typeof toolNames] || tool
                      )
                      .join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}