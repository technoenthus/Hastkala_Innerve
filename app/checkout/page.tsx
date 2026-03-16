"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { getProductById, artisans } from "@/lib/data";
import Navigation from "@/components/Navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const product = productId ? getProductById(productId) : null;
  const artisan = product ? artisans.find((a) => a.id === product.artisanId) : null;

  useEffect(() => {
    if (!productId) {
      router.push("/explore");
    }
  }, [productId, router]);

  const handleConfirmPurchase = async () => {
    if (!product || !artisan) {
      setError("Product information missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.title,
          artisanId: artisan.id,
          artisanName: artisan.name,
          price: product.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      router.push(`/checkout/success?orderId=${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (!product || !artisan) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <p className="text-ink/50">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-cream py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-ink/50 hover:text-indigo-deep mb-8 transition-colors"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {/* Checkout card */}
          <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8">
            <h1 className="font-serif text-3xl font-semibold text-indigo-deep mb-8">
              Order Summary
            </h1>

            {/* Product summary */}
            <div className="mb-8 pb-8 border-b border-cream-dark">
              <div className="flex gap-6">
                {/* Product image */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-cream-warm flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                {/* Product info */}
                <div className="flex-1">
                  <p className="text-terra text-xs font-semibold uppercase tracking-wider mb-2">
                    {product.craftType}
                  </p>
                  <h2 className="font-serif text-xl font-semibold text-indigo-deep mb-3">
                    {product.title}
                  </h2>

                  <div className="space-y-2 text-sm text-ink/60">
                    <p>
                      <span className="font-medium text-ink/80">Artist:</span> {artisan.name}
                    </p>
                    <p>
                      <span className="font-medium text-ink/80">Region:</span> {product.region}
                    </p>
                    <p>
                      <span className="font-medium text-ink/80">Material:</span> {product.material}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mb-8 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-ink/60">Product Price</span>
                <span className="font-medium text-indigo-deep">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink/60">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-cream-dark pt-3 flex justify-between items-center">
                <span className="font-medium text-indigo-deep">Total</span>
                <span className="font-serif text-2xl font-semibold text-indigo-deep">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8 bg-cream-warm rounded-xl p-4">
              <p className="text-xs text-ink/50 font-semibold uppercase tracking-wider mb-3">
                What's Included
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="text-green-600 font-bold">✓</span>
                  Authentic handmade product
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="text-green-600 font-bold">✓</span>
                  Certificate of authenticity
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="text-green-600 font-bold">✓</span>
                  Free shipping across India
                </li>
                <li className="flex items-start gap-2 text-sm text-ink/70">
                  <span className="text-green-600 font-bold">✓</span>
                  30-day returns policy
                </li>
              </ul>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirmPurchase}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </button>
              <Link
                href="/explore"
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-cream-dark text-indigo-deep py-3 rounded-full font-medium hover:bg-cream-warm transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-xs text-ink/40 text-center mt-4">
              Your payment and order will be processed securely
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
