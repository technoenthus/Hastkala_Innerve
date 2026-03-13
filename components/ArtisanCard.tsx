import Image from "next/image";
import Link from "next/link";
import { MapPin, Award } from "lucide-react";
import type { Artisan } from "@/lib/data";

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link href={`/artisan/${artisan.id}`} className="block group">
      <article className="relative overflow-hidden rounded-2xl card-hover bg-cream-warm border border-cream-dark/50">
        {/* Cover image */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={artisan.coverImage}
            alt={artisan.craft}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/70 to-transparent" />
        </div>

        {/* Profile */}
        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="relative -mt-8 mb-3 w-16 h-16 rounded-full overflow-hidden ring-4 ring-cream">
            <Image
              src={artisan.image}
              alt={artisan.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <h3 className="font-serif text-lg font-semibold text-indigo-deep">{artisan.name}</h3>
          <p className="text-sm font-medium text-terra mb-1">{artisan.craft}</p>

          <div className="flex items-center gap-1.5 text-xs text-ink/50 mb-3">
            <MapPin size={11} />
            <span>
              {artisan.region}, {artisan.state}
            </span>
          </div>

          <p className="text-sm text-ink/70 leading-relaxed line-clamp-2">{artisan.bio}</p>

          {artisan.awards && artisan.awards.length > 0 && (
            <div className="flex items-center gap-1.5 mt-3 text-xs text-gold font-medium">
              <Award size={12} />
              <span className="line-clamp-1">{artisan.awards[0]}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
