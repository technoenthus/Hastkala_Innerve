import { artisans } from "@/lib/data";
import ArtisanCard from "@/components/ArtisanCard";
import Navigation from "@/components/Navigation";

export default function ArtisansPage() {
  return (
    <>
      <Navigation />
    <div className="min-h-screen bg-cream">
      <div className="bg-cream-warm border-b border-cream-dark">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-terra text-xs font-semibold tracking-widest uppercase mb-2">
            The Makers
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-indigo-deep mb-4">
            Meet the Artisans
          </h1>
          <p className="text-ink/60 max-w-xl leading-relaxed">
            Each artisan on HASTAKALA is a keeper of tradition — carrying centuries of craft
            knowledge in their hands. Their stories are as important as their products.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artisans.map((a) => (
            <ArtisanCard key={a.id} artisan={a} />
          ))}
        </div>

        {/* Mission note */}
        <div className="mt-16 bg-indigo-deep/5 border border-indigo-deep/10 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl text-indigo-deep mb-4">
            Are you an artisan?
          </p>
          <p className="text-ink/60 leading-relaxed mb-6">
            Join HASTAKALA and let AI help you tell your story, list your products, and reach
            buyers around the world. Free to join. No technical skills required.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-terra text-cream px-6 py-3 rounded-full font-medium hover:bg-terra-light transition-colors"
          >
            Join as an Artisan
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
