import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hastkala : AI Marketplace for Indian Artisans",
  description:
    "Where hands remember what machines forget. Discover authentic Indian handicrafts and connect with the artisans who make them.",
  openGraph: {
    title: "HASTAKALA : हस्तकला",
    description: "AI-powered marketplace for Indian artisans. Voice to story. Photo to listing.",
    images: [{ url: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200&h=630&fit=crop" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
