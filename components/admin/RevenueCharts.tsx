"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
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

interface RevenueChartsProps {
  products: Product[];
}

const COLORS = ["#8884d8", "#82ca9d"];

export default function RevenueCharts({ products }: RevenueChartsProps) {

  /* BAR CHART DATA - Grouped by Craft Type */
  const craftRevenue = products.reduce(
    (acc: { [key: string]: { artisan: number; platform: number } }, p) => {
      if (!acc[p.craftType]) {
        acc[p.craftType] = { artisan: 0, platform: 0 };
      }
      acc[p.craftType].artisan += p.artisanPrice;
      acc[p.craftType].platform += p.platformFee;
      return acc;
    },
    {}
  );

  const barData = Object.entries(craftRevenue).map(([craftType, earnings]) => ({
    name: craftType,
    artisan: earnings.artisan,
    platform: earnings.platform,
  }));

  /* LINE CHART DATA */
  const revenueByDate = products.reduce(
    (acc: { date: string; revenue: number }[], p) => {
      const existing = acc.find((item) => item.date === p.createdAt);

      if (existing) {
        existing.revenue += p.platformFee;
      } else {
        acc.push({
          date: p.createdAt,
          revenue: p.platformFee,
        });
      }

      return acc;
    },
    []
  );

  const lineData = revenueByDate.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  /* PIE CHART DATA */
  const totalArtisan = products.reduce((sum, p) => sum + p.artisanPrice, 0);
  const totalPlatform = products.reduce((sum, p) => sum + p.platformFee, 0);

  const pieData = [
    { name: "Artisan Earnings", value: totalArtisan },
    { name: "Platform Earnings", value: totalPlatform },
  ];

  return (
    <div className="space-y-8">

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Earnings per Craft</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="artisan" fill="#8884d8" name="Artisan Earnings" />
            <Bar dataKey="platform" fill="#82ca9d" name="Platform Earnings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Platform Revenue Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}