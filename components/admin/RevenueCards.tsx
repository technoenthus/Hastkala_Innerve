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

interface DashboardStats {
  totalCraftsListed: number;
  totalCraftsSold: number;
  totalArtisanEarnings: number;
  totalPlatformEarnings: number;
}

interface RevenueCardsProps {
  products: Product[];
  stats?: DashboardStats | null;
}

export default function RevenueCards({ products, stats }: RevenueCardsProps) {
  const totalCrafts = stats?.totalCraftsListed ?? products.length;

  const totalArtisanEarnings = stats?.totalArtisanEarnings ??
    products.reduce((sum, p) => sum + p.artisanPrice, 0);

  const totalPlatformEarnings = stats?.totalPlatformEarnings ??
    products.reduce((sum, p) => sum + p.platformFee, 0);

  const totalFinalPrice = products.reduce(
    (sum, p) => sum + p.finalPrice,
    0
  );

  const averageMargin =
    totalFinalPrice > 0
      ? (totalPlatformEarnings / totalFinalPrice) * 100
      : 0;

  const totalCraftsSold = stats?.totalCraftsSold ?? 0;

  const cards = [
    { label: "Total Crafts Listed", value: totalCrafts },
    {
      label: "Total Crafts Sold",
      value: totalCraftsSold,
    },
    {
      label: "Total Artisan Earnings (Orders)",
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