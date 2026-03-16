"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import RevenueCards from "@/components/admin/RevenueCards";
import RevenueCharts from "@/components/admin/RevenueCharts";
import ToolUsageStats from "@/components/admin/ToolUsageStats";
import ProductRevenueTable from "@/components/admin/ProductRevenueTable";

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

/* ============================================ */
/* MAIN ADMIN DASHBOARD                         */
/* ============================================ */

export default function AdminDashboard() {
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Revenue Cards */}
              <div className="lg:col-span-3">
                <RevenueCards products={products} />
              </div>

              {/* Charts */}
              <div className="lg:col-span-2">
                <RevenueCharts products={products} />
              </div>

              {/* AI Tool Usage */}
              <div className="lg:col-span-1">
                <ToolUsageStats products={products} />
              </div>

              {/* Product Revenue Table */}
              <div className="lg:col-span-3">
                <ProductRevenueTable products={products} />
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}