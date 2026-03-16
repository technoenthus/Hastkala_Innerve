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

type Order = {
  id: string;
  productId: string;
  craftType: string;
  artisanName: string;
  price: number;
  createdAt: string;
  aiToolsUsed: string[];
};

interface RevenueChartsProps {
  orders: Order[];
}

const COLORS = ["#8884d8", "#82ca9d"];

export default function RevenueCharts({ orders }: RevenueChartsProps) {

  /* BAR CHART DATA - Grouped by Craft Type */
  const craftRevenue = orders.reduce(
    (acc: { [key: string]: { artisan: number; platform: number } }, o) => {
      if (!acc[o.craftType]) {
        acc[o.craftType] = { artisan: 0, platform: 0 };
      }
      acc[o.craftType].artisan += o.price * 0.8;
      acc[o.craftType].platform += o.price * 0.2;
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
  const revenueByDate = orders.reduce(
    (acc: { date: string; revenue: number }[], o) => {
      const existing = acc.find((item) => item.date === o.createdAt);

      if (existing) {
        existing.revenue += o.price * 0.2;
      } else {
        acc.push({
          date: o.createdAt,
          revenue: o.price * 0.2,
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
  const totalArtisan = orders.reduce((sum, o) => sum + o.price * 0.8, 0);
  const totalPlatform = orders.reduce((sum, o) => sum + o.price * 0.2, 0);

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