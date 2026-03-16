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

interface ToolUsageStatsProps {
  products: Product[];
}

const toolNames = {
  story_generator: "Story Generator",
  photo_to_listing: "Photo → Listing",
  fair_price: "Fair Price Calculator",
};

export default function ToolUsageStats({ products }: ToolUsageStatsProps) {

  const toolCounts = products.reduce((acc, product) => {
    product.aiToolsUsed.forEach((tool) => {
      acc[tool] = (acc[tool] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">AI Tool Usage</h3>

      <div className="space-y-4">
        {Object.entries(toolCounts).map(([tool, count]) => (
          <div key={tool} className="flex justify-between">
            <span>{toolNames[tool as keyof typeof toolNames] || tool}</span>
            <span className="font-bold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}