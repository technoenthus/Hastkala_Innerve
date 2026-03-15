"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, artisans, categories, regions, craftTypes } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All India");
  const [selectedCraft, setSelectedCraft] = useState("All Crafts");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        p.craftType.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchRegion =
        selectedRegion === "All India" ||
        p.region.toLowerCase().includes(selectedRegion.toLowerCase());
      const matchCraft =
        selectedCraft === "All Crafts" || p.craftType === selectedCraft;
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCat && matchRegion && matchCraft && matchPrice;
    });
  }, [search, selectedCategory, selectedRegion, selectedCraft, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedRegion("All India");
    setSelectedCraft("All Crafts");
    setMaxPrice(50000);
  };

  const hasFilters =
    search ||
    selectedCategory !== "All" ||
    selectedRegion !== "All India" ||
    selectedCraft !== "All Crafts" ||
    maxPrice < 50000;

  return (
    <>
      <Navigation />
    <div className="pt-16 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-cream-warm border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
            The Collection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-indigo-deep mb-6">
            Explore Crafts
          </h1>

          {/* Search bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by craft, material, region…"
                className="w-full bg-white border border-cream-dark rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-soft focus:ring-2 focus:ring-indigo-soft/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border text-sm font-medium transition-colors ${
                showFilters || hasFilters
                  ? "bg-indigo-deep text-cream border-indigo-deep"
                  : "bg-white border-cream-dark text-ink/70 hover:border-indigo-soft"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && (
                <span className="bg-terra text-cream text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="border-t border-cream-dark bg-white">
            <div className="max-w-7xl mx-auto px-6 py-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedCategory === c
                          ? "bg-indigo-deep text-cream border-indigo-deep"
                          : "border-cream-dark text-ink/70 hover:border-indigo-soft"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
                  Region
                </p>
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRegion(r)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedRegion === r
                          ? "bg-indigo-deep text-cream border-indigo-deep"
                          : "border-cream-dark text-ink/70 hover:border-indigo-soft"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Craft Type */}
              <div>
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
                  Craft Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {craftTypes.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCraft(c)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedCraft === c
                          ? "bg-indigo-deep text-cream border-indigo-deep"
                          : "border-cream-dark text-ink/70 hover:border-indigo-soft"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
                  Max Price: ₹{maxPrice.toLocaleString("en-IN")}
                </p>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terra"
                />
                <div className="flex justify-between text-[10px] text-ink/40 mt-1">
                  <span>₹500</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="max-w-7xl mx-auto px-6 pb-4">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-xs text-terra font-medium hover:underline"
                >
                  <X size={12} /> Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink/50">
            <span className="font-semibold text-indigo-deep">{filtered.length}</span> crafts found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-indigo-deep mb-3">No crafts found</p>
            <p className="text-ink/50 text-sm mb-4">Try adjusting your filters.</p>
            <button onClick={clearFilters} className="text-terra text-sm font-medium hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((product) => {
              const artisan = artisans.find((a) => a.id === product.artisanId);
              return (
                <div key={product.id} className="masonry-item">
                  <ProductCard
                    product={product}
                    artisanName={artisan?.name}
                    size={product.featured ? "lg" : "md"}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
