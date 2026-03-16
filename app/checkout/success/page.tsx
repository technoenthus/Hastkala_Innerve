"use client";

export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-cream py-12 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          {/* Success icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={56} className="text-green-600" />
            </div>
          </div>

          {/* Success message */}
          <h1 className="font-serif text-3xl font-semibold text-indigo-deep mb-3">
            Order Confirmed! 🎉
          </h1>
          <p className="text-ink/60 mb-2">
            Your order has been placed successfully.
          </p>
          {orderId && (
            <p className="text-xs text-ink/40 mb-8">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>
          )}

          {/* Details box */}
          <div className="bg-white rounded-2xl border border-cream-dark p-6 mb-8">
            <p className="text-sm text-ink/60 mb-4">
              Your handcrafted item will be carefully prepared and shipped to you with a certificate of authenticity. You'll receive a tracking update within 24 hours.
            </p>
            <div className="text-xs text-ink/50 space-y-2">
              <p>✓ Order confirmed and saved</p>
              <p>✓ Artisan notified to prepare your item</p>
              <p>✓ Free shipping across India</p>
              <p>✓ 30-day returns available</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/explore"
              className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/artisans"
              className="flex items-center justify-center gap-2 bg-white border border-cream-dark text-indigo-deep py-3 rounded-full font-medium hover:bg-cream-warm transition-colors"
            >
              Explore Artisans
            </Link>
          </div>

          <p className="text-xs text-ink/40 mt-8">
            Questions? Check your email for order details and artisan information.
          </p>
        </div>
      </div>
    </>
  );
}
