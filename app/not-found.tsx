import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl font-semibold text-indigo-deep/10 mb-2">404</p>
        <h1 className="font-serif text-3xl font-semibold text-indigo-deep mb-3">
          This page is still being woven
        </h1>
        <p className="text-ink/50 mb-8">
          Like a sari mid-loom, this page doesn&apos;t exist yet. But there&apos;s beauty
          everywhere else.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors"
        >
          Back to HASTAKALA
        </Link>
      </div>
    </div>
  );
}
