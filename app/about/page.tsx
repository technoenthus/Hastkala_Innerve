import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Zap, Globe, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const IMPACT_STATS = [
  { value: "7M+", label: "Artisans in India", sub: "Most without digital access" },
  { value: "₹3.3L Cr", label: "Craft market size", sub: "Growing 12% annually" },
  { value: "80%", label: "Artisans below poverty line", sub: "Despite exceptional skill" },
  { value: "23%", label: "Income increase", sub: "With marketplace access" },
];

const PRINCIPLES = [
  {
    icon: Target,
    title: "Authenticity First",
    desc: "Every artisan is verified. Every product is origin-traced. No factory-made goods. No misrepresentation.",
  },
  {
    icon: Zap,
    title: "AI as Equalizer",
    desc: "The digital divide kills opportunity. Our AI tools remove the writing, marketing, and pricing barrier entirely.",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Soul",
    desc: "Built for the world but rooted in village India. Products shipped globally. Stories told locally.",
  },
  {
    icon: Heart,
    title: "Fair Trade by Default",
    desc: "Price calculation is built into the platform. Artisans don't undersell themselves because they don't know their worth.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-indigo-deep text-cream py-24 px-6">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1800&h=800&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            Our Mission
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6 leading-tight">
            Where hands remember
            <br />
            <em className="text-gold not-italic">what machines forget.</em>
          </h1>
          <p className="text-cream/70 text-xl max-w-2xl mx-auto leading-relaxed">
            HASTAKALA exists to ensure that the traditions held in the hands of India&apos;s 7
            million artisans don&apos;t die because of a digital divide.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">
              The Problem
            </p>
            <h2 className="font-serif text-4xl font-semibold text-indigo-deep mb-6">
              Skill is not the barrier. Language is.
            </h2>
            <div className="space-y-4 text-ink/70 leading-relaxed">
              <p>
                Meera Devi has been painting Madhubani for 34 years. She has won national awards.
                Her work has been exhibited internationally. She cannot write a product description
                in English. She cannot set up an Etsy store. She cannot respond to international
                buyers.
              </p>
              <p>
                She is not unusual. She is representative of the 7 million artisans across India who
                are master craftspeople and digital strangers simultaneously.
              </p>
              <p>
                The craft survives poverty. It does not survive the algorithm. <strong className="text-indigo-deep">HASTAKALA fixes that.</strong>
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=500&fit=crop"
              alt="Artisan at work"
              fill
              className="object-cover"
              sizes="500px"
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="bg-cream-warm border-y border-cream-dark py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-terra text-xs font-semibold tracking-widest uppercase mb-10">
            The Scale of Opportunity
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-4xl font-semibold text-indigo-deep">{s.value}</p>
                <p className="text-sm font-medium text-indigo-deep mt-1">{s.label}</p>
                <p className="text-xs text-ink/40 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-3">
          How We Think
        </p>
        <h2 className="font-serif text-4xl font-semibold text-indigo-deep mb-10">
          Our Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-cream-dark rounded-2xl p-6 flex gap-4"
            >
              <div className="w-10 h-10 bg-indigo-deep/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <p.icon size={18} className="text-indigo-deep" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-deep mb-2">{p.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-indigo-deep text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            Built With
          </p>
          <h2 className="font-serif text-3xl font-semibold mb-6">Technology Stack</h2>
          <p className="text-cream/60 mb-10 max-w-xl mx-auto">
            Designed for a 24-hour hackathon build. Simple, powerful, deployable.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js 14", role: "Frontend & API" },
              { name: "Gemini 1.5", role: "AI (Vision + Text)" },
              { name: "TailwindCSS", role: "Styling" },
              { name: "Firebase", role: "Database & Storage" },
            ].map((t) => (
              <div key={t.name} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <p className="font-semibold text-cream">{t.name}</p>
                <p className="text-xs text-cream/40 mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-4xl font-semibold text-indigo-deep mb-4">
          Join the movement
        </h2>
        <p className="text-ink/60 leading-relaxed mb-8 max-w-xl mx-auto">
          Whether you are an artisan with a craft to share, or a buyer who believes the world is
          better with handmade things in it — HASTAKALA is your platform.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors"
          >
            Explore crafts <ArrowRight size={16} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-terra text-cream px-6 py-3 rounded-full font-medium hover:bg-terra-light transition-colors"
          >
            Join as artisan <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
