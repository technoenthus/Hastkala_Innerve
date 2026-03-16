import Link from "next/link";
import { BookOpen, TrendingUp } from "lucide-react";
import { SKILL_TUTORIALS, MARKETING_TUTORIALS, Tutorial } from "@/lib/data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <div className="bg-white border border-cream-dark rounded-2xl p-6 card-hover">
      <h3 className="font-serif text-lg font-semibold text-indigo-deep mb-2">
        {tutorial.title}
      </h3>

      <p className="text-sm text-ink/60 mb-4 leading-relaxed">
        {tutorial.description}
      </p>

      <a
        href={tutorial.link}
        target="_blank"
        className="text-terra text-sm font-medium hover:underline"
      >
        Read tutorial →
      </a>
    </div>
  );
}

export default function TutorialsPage() {
  return (
    <>
    <Navigation />
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Page Title */}
      <div className="text-center mb-16 pt-20 pb-9">
        <h1 className="font-serif text-4xl md:text-5xl text-indigo-deep mb-4">
          Artisan Learning Hub
        </h1>
        <p className="text-ink/60 max-w-xl mx-auto">
          Tutorials designed to help artisans improve their craft skills
          and learn how to reach global markets.
        </p>
      </div>

      {/* Skill Tutorials */}
      <section className="mb-16 pb-6">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="text-terra" size={22} />
          <h2 className="font-serif text-2xl text-indigo-deep">
            Skill Tutorials
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_TUTORIALS.map((t) => (
            <TutorialCard key={t.title} tutorial={t} />
          ))}
        </div>
      </section>

      {/* Marketing Tutorials */}
      <section className="pb-6"> 
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-terra" size={22} />
          <h2 className="font-serif text-2xl text-indigo-deep">
            Marketing & Selling
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETING_TUTORIALS.map((t) => (
            <TutorialCard key={t.title} tutorial={t} />
          ))}
        </div>
      </section>

    </div>
    <Footer />
    </>
  );
}