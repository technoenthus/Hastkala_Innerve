import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mic, Camera, Calculator, BookOpen, MapPin } from "lucide-react";
import { artisans, getFeaturedProducts, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ArtisanCard from "@/components/ArtisanCard";
import Gnav from "@/components/Gnav";
import Footer from "@/components/Footer";
const AI_FEATURES = [
  {
    icon: Mic,
    title: "Voice to Story",
    description:
      "Artisans speak in any language. AI transforms their words into compelling craft narratives and product listings.",
    color: "bg-terra/10 text-terra",
    href: "/ai-tools#voice",
  },
  {
    icon: Camera,
    title: "Photo to Listing",
    description:
      "Photograph a craft item. AI generates title, description, tags, and category — ready to publish.",
    color: "bg-indigo-mid/10 text-indigo-mid",
    href: "/ai-tools#photo",
  },
  {
    icon: Calculator,
    title: "Fair Price AI",
    description:
      "AI calculates a fair market price accounting for materials, skill hours, and tradition rarity.",
    color: "bg-gold/20 text-gold-dark",
    href: "/ai-tools#price",
  },
  {
    icon: BookOpen,
    title: "Story Generator",
    description:
      "Emotional product stories that make global buyers feel the human connection behind every piece.",
    color: "bg-terra/10 text-terra",
    href: "/ai-tools#story",
  },
];

const STATS = [
  { value: "4,000+", label: "Years of Dhokra tradition" },
  { value: "₹3.3L Cr", label: "Indian handicraft market size" },
  { value: "7M+", label: "Artisans across India" },
  { value: "23%", label: "Average income gain with digital access" },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Gnav />
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-indigo-deep grain-overlay">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-20">
          {[
            "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=800&fit=crop",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep via-indigo-deep/95 to-indigo-deep/60" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
              AI-Powered · Google Cloud · India&apos;s Crafts
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[1.05] mb-6">
              Where hands
              <br />
              <em className="text-gold not-italic">remember</em>
              <br />
              what machines
              <br />
              forget.
            </h1>

            <p className="text-cream/60 text-lg leading-relaxed max-w-md mb-8">
              HASTAKALA connects India&apos;s 7 million artisans with global buyers — using AI to
              translate craft stories, generate listings, and ensure fair pricing.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 bg-terra text-cream px-6 py-3 rounded-full font-medium hover:bg-terra-light transition-colors"
              >
                Explore Crafts
                <ArrowRight size={16} />
              </Link>
              {/* <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream px-6 py-3 rounded-full font-medium hover:border-gold hover:text-gold transition-colors"
              >
                See AI Tools
              </Link> */}
            </div>
          </div>

          {/* Featured artisan card */}
          <div className="hidden md:block">
            <div className="relative bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-3xl overflow-hidden p-6">
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
                Featured Artisan
              </p>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gold/30">
                  <Image
                    src={artisans[0].image}
                    alt={artisans[0].name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-cream">{artisans[0].name}</h3>
                  <p className="text-terra text-sm">{artisans[0].craft}</p>
                  <div className="flex items-center gap-1 text-cream/40 text-xs mt-1">
                    <MapPin size={11} />
                    {artisans[0].region}, {artisans[0].state}
                  </div>
                </div>
              </div>
              <p className="text-cream/60 text-sm leading-relaxed italic font-serif">
                &ldquo;I learned to paint before I learned to write. My grandmother mixed pigments
                from the plants behind our house…&rdquo;
              </p>
              <Link
                href={`/artisan/${artisans[0].id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-gold text-xs font-medium hover:underline"
              >
                Read her story <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-cream-warm border-y border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-indigo-deep">
                {s.value}
              </p>
              <p className="text-xs text-ink/50 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI FEATURES ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-indigo-deep mb-4">
            AI that speaks artisan
          </h2>
          <p className="text-ink/60 max-w-xl mx-auto leading-relaxed">
            Available for our artist members, four tools that eliminate the digital barrier between master craftspeople and the global
            market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AI_FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 bg-white rounded-2xl border border-cream-dark/50"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon size={22} />
              </div>

              <h3 className="font-serif text-lg font-semibold text-indigo-deep mb-2">
                {f.title}
              </h3>

              <p className="text-sm text-ink/60 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-cream-warm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
                Handpicked
              </p>
              <h2 className="font-serif text-4xl font-semibold text-indigo-deep">
                Featured Crafts
              </h2>
            </div>
            <Link
              href="/explore"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-indigo-deep hover:text-terra transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const artisan = artisans.find((a) => a.id === product.artisanId);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  artisanName={artisan?.name}
                />
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-deep"
            >
              View all crafts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARTISANS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
              The Makers
            </p>
            <h2 className="font-serif text-4xl font-semibold text-indigo-deep">
              Meet the artisans
            </h2>
          </div>
          <Link
            href="/artisans"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-indigo-deep hover:text-terra transition-colors"
          >
            All artisans <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((a) => (
            <ArtisanCard key={a.id} artisan={a} />
          ))}
        </div>
      </section>

      {/* ── EDITORIAL PULL QUOTE ── */}
      <section className="bg-indigo-deep py-24 relative overflow-hidden grain-overlay">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1800&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            Our belief
          </p>
          <blockquote className="font-serif text-3xl md:text-5xl text-cream leading-tight font-medium">
            &ldquo;Every craft carries the memory of ten thousand hands before it. The artisan is
            not a manufacturer — they are a keeper.&rdquo;
          </blockquote>
          <p className="mt-6 text-cream/40 text-sm">
            — HASTAKALA Mission Statement
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Buyer CTA */}
          <div className="bg-terra/5 border border-terra/20 rounded-3xl p-8 md:p-10">
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">
              For Buyers
            </p>
            <h3 className="font-serif text-3xl font-semibold text-indigo-deep mb-4">
              Own something made by human hands
            </h3>
            <p className="text-ink/60 mb-6 leading-relaxed">
              Every piece on HASTAKALA comes with the artisan&apos;s story, verified origin, and the
              knowledge that your purchase directly supports a craft tradition.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors"
            >
              Start exploring <ArrowRight size={16} />
            </Link>
          </div>

          {/* Artisan CTA */}
          <div className="bg-indigo-deep/5 border border-indigo-mid/20 rounded-3xl p-8 md:p-10">
            <p className="text-indigo-soft text-xs font-semibold tracking-widest uppercase mb-3">
              For Artisans
            </p>
            <h3 className="font-serif text-3xl font-semibold text-indigo-deep mb-4">
              Tell your story. Sell your craft.
            </h3>
            <p className="text-ink/60 mb-6 leading-relaxed">
              Upload a photo, record your voice in any language. Our AI handles the listing, the
              description, the pricing. You focus on the making.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-terra text-cream px-6 py-3 rounded-full font-medium hover:bg-terra-light transition-colors"
            >
              Open artisan portal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  ); 
}
