import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-indigo-deep text-cream/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <p className="font-serif text-2xl font-semibold text-cream">HASTAKALA</p>
              <p className="text-gold text-sm tracking-widest">हस्तकला</p>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
              Where hands remember what machines forget. An AI-powered marketplace connecting
              India&apos;s master artisans with global buyers who value authenticity.
            </p>
            <p className="mt-4 text-xs text-cream/40">
            </p>
          </div>

          {/* Discover */}
          <div>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Discover
            </p>
            <ul className="space-y-2 text-sm text-cream/60">
              {[
                { href: "/explore", label: "All Crafts" },
                { href: "/artisans", label: "Meet Artisans" },
                { href: "/explore?region=bihar", label: "Bihar Crafts" },
                { href: "/explore?region=rajasthan", label: "Rajasthan Crafts" },
                { href: "/explore?category=textiles", label: "Textiles" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Platform
            </p>
            <ul className="space-y-2 text-sm text-cream/60">
              {[
                { href: "/ai-tools", label: "AI Tools" },
                { href: "/dashboard", label: "Artisan Portal" },
                { href: "/about", label: "Our Mission" },
                { href: "/about#impact", label: "Impact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            © 2025 HASTAKALA. Made with care for the artisans of India. Created by: Team CodeInBlood
          </p>
          
        </div>
      </div>
    </footer>
  );
}
