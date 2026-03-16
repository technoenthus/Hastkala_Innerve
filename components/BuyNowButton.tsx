"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

interface BuyNowButtonProps {
  productId: string;
  price: number;
}

export default function BuyNowButton({ productId, price }: BuyNowButtonProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/checkout?productId=${productId}`);
  };

  return (
    <button
      onClick={handleBuyNow}
      className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-full font-medium text-base hover:bg-gray-800 transition-colors mb-3"
    >
      <ShoppingBag size={18} />
      Buy Now — ₹{price.toLocaleString("en-IN")}
    </button>
  );
}
