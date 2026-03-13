import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  artisanName?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProductCard({ product, artisanName, size = "md" }: ProductCardProps) {
  const heights = { sm: "h-48", md: "h-64", lg: "h-80" };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden card-hover shadow-sm border border-cream-dark/50">
        {/* Image */}
        <div className={`relative ${heights[size]} overflow-hidden bg-cream-warm`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-gold text-ink text-xs font-semibold px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute bottom-3 right-3 bg-cream/90 backdrop-blur-sm text-indigo-deep text-sm font-semibold px-3 py-1 rounded-full">
            ₹{product.price.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs font-medium text-terra uppercase tracking-wider mb-1">
            {product.craftType}
          </p>
          <h3 className="font-serif text-base font-medium text-indigo-deep leading-snug line-clamp-2 mb-2">
            {product.title}
          </h3>

          {artisanName && (
            <div className="flex items-center gap-1.5 text-xs text-ink/50">
              <MapPin size={11} />
              <span>
                {artisanName} · {product.region.split(",")[0]}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-cream-warm text-indigo-deep/70 px-2 py-0.5 rounded-full border border-cream-dark"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
