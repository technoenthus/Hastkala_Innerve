import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT PANEL — Info with image + glass */}
      <div
        className="relative flex items-center justify-center p-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/login_Page.jpg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-indigo-deep/50"></div>

        {/* Glass content */}
        <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 max-w-md text-cream">
          <h1 className="font-serif text-4xl font-semibold mb-6">
            Share your craft with the world
          </h1>

          <p className="text-cream/80 leading-relaxed mb-6">
            HASTAKALA helps artisans tell their stories, generate product
            listings with AI, and connect with buyers across the globe.
          </p>

          <p className="text-gold text-sm">
            Login to access AI tools, upload crafts, and manage your artisan profile.
          </p>
        </div>
      </div>


      {/* RIGHT PANEL — Centered login */}
      <div className="flex items-center rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] justify-center bg-cream-warm p-8 -ml-20 relative z-20">

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]
        w-[100%] h-[100%] flex items-center justify-center">

          {/* Inner content container */}
          <div className="w-[60%] max-w-sm text-center">

            <h1 className="text-2xl font-serif font-bold mb-8 text-indigo-deep">
              Login
            </h1>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-deep"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-deep"
            />

            {/* Login */}
            <Link
              href="/home"
              className="mt-5 block bg-indigo-deep text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-deep/80 transition-colors"
            >
              Login
            </Link>

            {/* Create account */}
            <p className="text-sm text-gray-500 mt-6">
              Don’t have an account?{" "}
              <Link href="/home" className="text-indigo-deep font-medium hover:underline">
                Create account
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}