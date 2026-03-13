import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Award, Clock, ArrowLeft } from "lucide-react";
import { artisans, getProductsByArtisan } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return artisans.map((a) => ({ id: a.id }));
}

export default function ArtisanPage({ params }: { params: { id: string } }) {
  const artisan = artisans.find((a) => a.id === params.id);
  if (!artisan) notFound();

  const artisanProducts = getProductsByArtisan(artisan.id);

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Cover */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={artisan.coverImage}
          alt={artisan.craft}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-indigo-deep/30 to-transparent" />

        <div className="absolute top-6 left-6">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 text-cream/80 hover:text-cream text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft size={14} /> All Artisans
          </Link>
        </div>
      </div>

      {/* Profile header */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative -mt-16 mb-8 flex items-end gap-5">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-cream shadow-xl flex-shrink-0">
            <Image
              src={artisan.image}
              alt={artisan.name}
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="pb-2">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-indigo-deep">
              {artisan.name}
            </h1>
            <p className="text-terra font-medium">{artisan.craft}</p>
            <div className="flex items-center gap-1.5 text-ink/50 text-sm mt-1">
              <MapPin size={13} />
              {artisan.region}, {artisan.state}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Story */}
          <div className="md:col-span-2">
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-4">
              Story
            </p>
            <p className="font-serif text-lg text-indigo-deep/80 leading-relaxed">
              {artisan.story}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="bg-cream-warm border border-cream-dark rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-gold" />
                <div>
                  <p className="text-xs text-ink/50">Experience</p>
                  <p className="font-semibold text-indigo-deep">
                    {artisan.yearsOfExperience} years
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gold" />
                <div>
                  <p className="text-xs text-ink/50">Based in</p>
                  <p className="font-semibold text-indigo-deep">
                    {artisan.region}, {artisan.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Awards */}
            {artisan.awards && artisan.awards.length > 0 && (
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Award size={14} className="text-gold" />
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider">
                    Recognition
                  </p>
                </div>
                <ul className="space-y-2">
                  {artisan.awards.map((award) => (
                    <li key={award} className="text-sm text-ink/70 leading-snug">
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-2">
                Craft Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {artisan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-indigo-deep/5 text-indigo-deep px-3 py-1 rounded-full border border-indigo-deep/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream-dark mb-10" />

        {/* Products */}
        <div className="mb-16">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
            Craft Collection
          </p>
          <h2 className="font-serif text-3xl font-semibold text-indigo-deep mb-8">
            Works by {artisan.name.split(" ")[0]}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisanProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                artisanName={artisan.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
