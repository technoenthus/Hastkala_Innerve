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

interface RevenueCardsProps {
  products: Product[];
}

export default function RevenueCards({ products }: RevenueCardsProps) {
  const totalCrafts = products.length;

  const totalArtisanEarnings = products.reduce(
    (sum, p) => sum + p.artisanPrice,
    0
  );

  const totalPlatformEarnings = products.reduce(
    (sum, p) => sum + p.platformFee,
    0
  );

  const totalFinalPrice = products.reduce(
    (sum, p) => sum + p.finalPrice,
    0
  );

  const averageMargin =
    totalFinalPrice > 0
      ? (totalPlatformEarnings / totalFinalPrice) * 100
      : 0;

  const cards = [
    { label: "Total Crafts Listed", value: totalCrafts },
    {
      label: "Total Artisan Earnings",
      value: `₹${totalArtisanEarnings.toLocaleString()}`,
    },
    {
      label: "Total Platform Earnings",
      value: `₹${totalPlatformEarnings.toLocaleString()}`,
    },
    {
      label: "Average Platform Margin %",
      value: `${averageMargin.toFixed(2)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">{card.label}</h3>
          <p className="text-2xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}