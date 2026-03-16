"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Mic,
  Calculator,
  BookOpen,
  Package,
  Eye,
  TrendingUp,
  PlusCircle,
  Sparkles,
  LayoutGrid,
  Settings,
} from "lucide-react";
import { artisans, getProductsByArtisan } from "@/lib/data";
import Navigation from "@/components/Navigation";

const DEMO_ARTISAN = artisans[0]; // Meera Devi
const DEMO_PRODUCTS = getProductsByArtisan(DEMO_ARTISAN.id);

const STATS = [
  { label: "Products Listed", value: DEMO_PRODUCTS.length, icon: Package, delta: "+1 this month" },
  { label: "Total Views", value: "1,284", icon: Eye, delta: "+18% this week" },
  { label: "Revenue (INR)", value: "₹42,600", icon: TrendingUp, delta: "+12% this month" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "upload", label: "Add Product", icon: PlusCircle },
  { id: "ai", label: "AI Tools", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Navigation />
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-cream-dark fixed top-16 bottom-0 left-0 z-20">
        {/* Artisan profile */}
        <div className="p-5 border-b border-cream-dark">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold/30">
              <Image
                src={DEMO_ARTISAN.image}
                alt={DEMO_ARTISAN.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-indigo-deep truncate">
                {DEMO_ARTISAN.name}
              </p>
              <p className="text-xs text-terra truncate">{DEMO_ARTISAN.craft}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-deep text-cream"
                  : "text-ink/60 hover:bg-cream-warm hover:text-indigo-deep"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-cream-dark">
          <Link
            href={`/artisan/${DEMO_ARTISAN.id}`}
            className="text-xs text-ink/40 hover:text-terra transition-colors"
          >
            View public profile →
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-60">
        {/* Mobile tab bar */}
        <div className="md:hidden flex overflow-x-auto border-b border-cream-dark bg-white px-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === item.id
                  ? "border-indigo-deep text-indigo-deep"
                  : "border-transparent text-ink/50"
              }`}
            >
              <item.icon size={13} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="font-serif text-3xl font-semibold text-indigo-deep mb-1">
                  Welcome back, {DEMO_ARTISAN.name.split(" ")[0]}
                </h1>
                <p className="text-ink/50 text-sm">Your craft is reaching the world.</p>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white border border-cream-dark rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">
                        {s.label}
                      </p>
                      <div className="w-8 h-8 bg-cream-warm rounded-lg flex items-center justify-center">
                        <s.icon size={14} className="text-indigo-deep" />
                      </div>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-indigo-deep">{s.value}</p>
                    <p className="text-xs text-green-600 mt-1">{s.delta}</p>
                  </div>
                ))}
              </div>

              {/* AI Quick Actions */}
              <div>
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-3">
                  AI Quick Actions
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { icon: Mic, label: "Record Voice Story", color: "bg-terra/10 text-terra", tab: "ai" },
                    { icon: Upload, label: "Upload Photo for Listing", color: "bg-indigo-mid/10 text-indigo-soft", tab: "upload" },
                    { icon: Calculator, label: "Calculate Fair Price", color: "bg-gold/15 text-gold-dark", tab: "ai" },
                    { icon: BookOpen, label: "Generate Product Story", color: "bg-terra/10 text-terra", tab: "ai" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setActiveTab(action.tab)}
                      className="flex items-center gap-3 bg-white border border-cream-dark rounded-xl p-4 text-left hover:border-indigo-soft/50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${action.color}`}>
                        <action.icon size={16} />
                      </div>
                      <span className="text-sm font-medium text-indigo-deep leading-snug">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* My products */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">
                    My Products
                  </p>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="text-xs text-terra font-medium flex items-center gap-1 hover:underline"
                  >
                    <PlusCircle size={12} /> Add new
                  </button>
                </div>
                <div className="space-y-3">
                  {DEMO_PRODUCTS.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 bg-white border border-cream-dark rounded-2xl p-4"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-warm flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indigo-deep truncate">{product.title}</p>
                        <p className="text-xs text-terra">{product.craftType}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-indigo-deep text-sm">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
                          <p className="text-[10px] text-ink/40">
                            {product.inStock ? "In stock" : "Out of stock"}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/product/${product.id}`}
                        className="ml-2 text-ink/20 hover:text-terra transition-colors"
                      >
                        <Eye size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── UPLOAD PRODUCT ── */}
          {activeTab === "upload" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-indigo-deep mb-1">
                  Add New Product
                </h2>
                <p className="text-ink/50 text-sm">
                  Upload a photo and let AI generate the listing for you.
                </p>
              </div>

              {/* Photo upload */}
              <div className="bg-white border-2 border-dashed border-cream-dark rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-soft transition-colors">
                <Upload size={32} className="mx-auto text-indigo-deep/20 mb-3" />
                <p className="font-medium text-indigo-deep mb-1">Upload craft photo</p>
                <p className="text-sm text-ink/40">JPG, PNG, WEBP · Max 10MB</p>
                <button className="mt-4 inline-flex items-center gap-2 bg-indigo-deep text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-mid transition-colors">
                  <Upload size={14} /> Choose File
                </button>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                {[
                  { label: "Product Title", placeholder: "AI will suggest based on photo…", type: "text" },
                  { label: "Price (₹)", placeholder: "AI Fair Price Calculator can help…", type: "number" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-soft"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your craft… or use AI to generate from voice →"
                    className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-soft resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-indigo-deep text-cream px-5 py-3 rounded-full text-sm font-medium hover:bg-indigo-mid transition-colors">
                    <Sparkles size={14} /> AI Generate Listing
                  </button>
                  <button className="flex items-center gap-2 border border-indigo-deep text-indigo-deep px-5 py-3 rounded-full text-sm font-medium hover:bg-indigo-deep/5 transition-colors">
                    Publish Product
                  </button>
                </div>

                <p className="text-xs text-ink/40">
                  Need to set a price?{" "}
                  <button
                    onClick={() => setActiveTab("ai")}
                    className="text-terra underline"
                  >
                    Use Fair Price AI →
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ── AI TAB (redirects to AI Tools page) ── */}
          {activeTab === "ai" && (
            <div className="max-w-xl text-center py-16">
              <div className="w-16 h-16 bg-indigo-deep/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-indigo-deep" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-indigo-deep mb-3">
                AI Tools
              </h2>
              <p className="text-ink/60 leading-relaxed mb-6">
                Access all four AI tools — Voice to Story, Photo to Listing, Fair Price Calculator,
                and Story Generator — on the dedicated AI Tools page.
              </p>
              <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors"
              >
                <Sparkles size={16} /> Open AI Tools
              </Link>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "settings" && (
            <div className="max-w-lg space-y-6">
              <h2 className="font-serif text-3xl font-semibold text-indigo-deep">
                Profile Settings
              </h2>

              {[
                { label: "Display Name", value: DEMO_ARTISAN.name },
                { label: "Craft Tradition", value: DEMO_ARTISAN.craft },
                { label: "Region", value: `${DEMO_ARTISAN.region}, ${DEMO_ARTISAN.state}` },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
                    {f.label}
                  </label>
                  <input
                    defaultValue={f.value}
                    className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-soft"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue={DEMO_ARTISAN.bio}
                  className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-soft resize-none"
                />
              </div>

              <button className="bg-indigo-deep text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-indigo-mid transition-colors">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
