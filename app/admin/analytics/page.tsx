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

type Order = {
  id: string;
  productId: string;
  craftType: string;
  artisanName: string;
  price: number;
  createdAt: string;
  aiToolsUsed: string[];
};

type DashboardStats = {
  totalCraftsListed: number;
  totalCraftsSold: number;
  totalArtisanEarnings: number;
  totalPlatformEarnings: number;
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to fetch analytics data");

        const json = await res.json();
        if (json.success && json.data) {
          setOrders(Array.isArray(json.data.orders) ? json.data.orders : []);
          setStats(json.data.stats ?? null);
        } else {
          console.error("Invalid API response format");
          setOrders([]);
          setStats(null);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setOrders([]);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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
      Artisan:
        stats?.totalArtisanEarnings ??
        orders.reduce((sum, o) => sum + o.price * 0.8, 0),
      Platform:
        stats?.totalPlatformEarnings ??
        orders.reduce((sum, o) => sum + o.price * 0.2, 0),
    },
  ];

  // Revenue by Craft Category (based on orders)
  const byCraft = orders.reduce((acc, o) => {
    const existing = acc.find((item) => item.name === o.craftType);
    if (existing) {
      existing.revenue += o.price * 0.2;
    } else {
      acc.push({ name: o.craftType, revenue: o.price * 0.2 });
    }
    return acc;
  }, [] as { name: string; revenue: number }[]);

  // Revenue Trend (based on orders)
  const byDate = orders.reduce((acc, o) => {
    const existing = acc.find((item) => item.date === o.createdAt);
    if (existing) {
      existing.revenue += o.price * 0.2;
    } else {
      acc.push({ date: o.createdAt, revenue: o.price * 0.2 });
    }
    return acc;
  }, [] as { date: string; revenue: number }[]);

  const revenueTrend = byDate.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // AI Tool Usage (from orders)
  const toolUsage = orders.reduce((acc, o) => {
    o.aiToolsUsed.forEach((tool) => {
      const existing = acc.find((item) => item.name === tool);
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
