import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Package,
  Ruler,
  Tag,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { products, artisans, getProductById, getProductsByArtisan, productSoldCounts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BuyNowButton from "@/components/BuyNowButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const artisan = artisans.find((a) => a.id === product.artisanId);
  const relatedProducts = getProductsByArtisan(product.artisanId).filter(
    (p) => p.id !== product.id
  );
  const soldCount = productSoldCounts[product.id] ?? 0;

  return (
    <>
      <Navigation />
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-ink/40 mb-8">
          <Link href="/explore" className="hover:text-terra">
            <ArrowLeft size={13} className="inline mr-1" />
            Explore
          </Link>
          <span>/</span>
          <span>{product.craftType}</span>
          <span>/</span>
          <span className="text-indigo-deep font-medium line-clamp-1">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream-warm">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-cream-warm">
                    <Image
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">
              {product.craftType} · {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-indigo-deep leading-snug mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl font-semibold text-indigo-deep">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-ink/40 line-through text-lg">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <p className="text-sm text-ink/50 mb-4">
              Sold: <span className="font-semibold text-indigo-deep">{soldCount}</span>
            </p>

            {/* Description */}
            <p className="text-ink/70 leading-relaxed mb-6">{product.description}</p>

            {/* Product details grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: MapPin, label: "Region", value: product.region },
                { icon: Clock, label: "Labor", value: `${product.laborHours} hours` },
                { icon: Package, label: "Material", value: product.material },
                ...(product.dimensions ? [{ icon: Ruler, label: "Size", value: product.dimensions }] : []),
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-2.5 bg-cream-warm rounded-xl p-3"
                >
                  <item.icon size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-ink/40 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-indigo-deep">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Tag size={13} className="text-ink/30 mt-0.5" />
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white border border-cream-dark text-indigo-deep px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Artisan */}
            {artisan && (
              <Link
                href={`/artisan/${artisan.id}`}
                className="flex items-center gap-3 bg-cream-warm border border-cream-dark rounded-2xl p-4 mb-6 hover:border-gold/40 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={artisan.image}
                    alt={artisan.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs text-ink/40 mb-0.5">Made by</p>
                  <p className="font-medium text-indigo-deep">{artisan.name}</p>
                  <p className="text-xs text-terra">{artisan.craft}</p>
                </div>
                <span className="ml-auto text-ink/30 text-xs">View profile →</span>
              </Link>
            )}

            {/* CTA */}
            <BuyNowButton productId={product.id} price={product.price} />
            <p className="text-center text-xs text-ink/40">
              Free shipping · Certificate of authenticity · 30-day returns
            </p>
          </div>
        </div>

        {/* ── STORY SECTION ── */}
        <div className="border-t border-cream-dark pt-12 mb-12">
          <div className="max-w-3xl">
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-4">
              The Story Behind This Piece
            </p>
            <p className="font-serif text-2xl md:text-3xl text-indigo-deep leading-relaxed italic">
              &ldquo;{product.story}&rdquo;
            </p>
          </div>
        </div>

        {/* ── PROCESS ── */}
        <div className="bg-cream-warm rounded-3xl p-8 md:p-10 mb-12">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
            Craft Process
          </p>
          <h2 className="font-serif text-2xl font-semibold text-indigo-deep mb-6">
            How this was made
          </h2>
          <div className="space-y-4">
            {product.process.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 bg-indigo-deep text-cream rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-ink/70 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── AUTHENTICITY ── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {[
            {
              title: "Verified Origin",
              desc: `Handmade in ${product.region}`,
            },
            {
              title: "AI Story Verified",
              desc: "Story generated from artisan's own voice",
            },
            {
              title: "Fair Trade Priced",
              desc: "Price calculated by our Fair Price AI",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 bg-white border border-cream-dark rounded-2xl p-4"
            >
              <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-indigo-deep text-sm">{item.title}</p>
                <p className="text-xs text-ink/50 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {relatedProducts.length > 0 && (
          <div>
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
              More from {artisan?.name.split(" ")[0]}
            </p>
            <h2 className="font-serif text-3xl font-semibold text-indigo-deep mb-6">
              Other works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} artisanName={artisan?.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
