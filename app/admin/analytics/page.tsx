"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Product = {
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
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];

export default function AnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else {
          console.error("Invalid API response format");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Platform vs Artisan Earnings
  const platformVsArtisan = [
    {
      name: "Earnings",
      Artisan: products.reduce((sum, p) => sum + p.artisanPrice, 0),
      Platform: products.reduce((sum, p) => sum + p.platformFee, 0),
    },
  ];

  // Revenue by Craft Category
  const byCraft = products.reduce((acc, p) => {
    const existing = acc.find(item => item.name === p.craftType);
    if (existing) {
      existing.revenue += p.platformFee;
    } else {
      acc.push({ name: p.craftType, revenue: p.platformFee });
    }
    return acc;
  }, [] as { name: string; revenue: number }[]);

  // Revenue Trend
  const byDate = products.reduce((acc, p) => {
    const existing = acc.find(item => item.date === p.createdAt);
    if (existing) {
      existing.revenue += p.platformFee;
    } else {
      acc.push({ date: p.createdAt, revenue: p.platformFee });
    }
    return acc;
  }, [] as { date: string; revenue: number }[]);

  const revenueTrend = byDate.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // AI Tool Usage
  const toolUsage = products.reduce((acc, p) => {
    p.aiToolsUsed.forEach(tool => {
      const existing = acc.find(item => item.name === tool);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: tool, count: 1 });
      }
    });
    return acc;
  }, [] as { name: string; count: number }[]);

  const toolNames: Record<string, string> = {
    story_generator: "Story Generator",
    photo_to_listing: "Photo → Listing",
    fair_price: "Fair Price Calculator",
  };

  const formattedToolUsage = toolUsage.map(item => ({
    ...item,
    name: toolNames[item.name] || item.name,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Platform vs Artisan Earnings */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Platform vs Artisan Earnings
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformVsArtisan}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Artisan" fill="#8884d8" name="Artisan Earnings" />
                    <Bar dataKey="Platform" fill="#82ca9d" name="Platform Earnings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue by Craft Category */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Revenue by Craft Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={byCraft}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Trend */}
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  Revenue Trend Over Time
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      name="Daily Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* AI Tool Usage */}
              <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">AI Tool Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={formattedToolUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" name="Usage Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
