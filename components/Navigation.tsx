"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, User } from "lucide-react";

const navLinks = [
  { href: "/explore", label: "Explore Crafts" },
  { href: "/artisans", label: "Artisans" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/about", label: "Our Mission" },
  { href: "/tutorials", label: "Tutorials" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative top-0 inset-x-0 z-50 bg-cream/90 backdrop-blur-md border-b border-cream-dark">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold text-indigo-deep tracking-wide">
            HASTAKALA
          </span>
          <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-sans">
            हस्तकला
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 hover:text-indigo-deep transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium bg-indigo-deep text-cream px-4 py-2 rounded-full hover:bg-indigo-mid transition-colors"
          >
            <User size={14} />
            Profile
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-indigo-deep"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-cream-dark px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-ink/80 hover:text-indigo-deep py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-medium bg-indigo-deep text-cream px-4 py-2 rounded-full mt-2"
          >
            <User size={14} />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}
