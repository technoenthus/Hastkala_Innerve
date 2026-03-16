"use client";

import React, { useState } from "react";
import { Calculator, IndianRupee, Loader2, Info, TrendingUp } from "lucide-react";

export default function FairPriceCalculator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    craftType: "",
    materialCost: "",
    laborHours: "",
    region: "",
  });

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fair-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm space-y-6">
        <h3 className="text-sm font-mono uppercase tracking-widest text-[#B85C38] mb-4 flex items-center gap-2">
          <Calculator size={16} /> Cost Parameters
        </h3>
        <div className="space-y-4">
          <input 
            placeholder="Craft Type (e.g., Pottery)" 
            className="w-full border-b p-3 bg-transparent outline-none focus:border-[#B85C38]"
            onChange={(e) => setFormData({...formData, craftType: e.target.value})}
          />
          <input 
            placeholder="Material Cost (₹)" 
            className="w-full border-b p-3 bg-transparent outline-none focus:border-[#B85C38]"
            onChange={(e) => setFormData({...formData, materialCost: e.target.value})}
          />
          <input 
            placeholder="Labor Hours" 
            className="w-full border-b p-3 bg-transparent outline-none focus:border-[#B85C38]"
            onChange={(e) => setFormData({...formData, laborHours: e.target.value})}
          />
          <input 
            placeholder="Region (State/Village)" 
            className="w-full border-b p-3 bg-transparent outline-none focus:border-[#B85C38]"
            onChange={(e) => setFormData({...formData, region: e.target.value})}
          />
        </div>
        <button 
          onClick={handleCalculate}
          disabled={loading}
          className="w-full py-4 bg-[#1A2456] text-white rounded-xl font-mono text-xs uppercase tracking-widest flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Calculate Fair Price"}
        </button>
      </div>

      <div className="bg-[#1A2456] p-10 rounded-2xl text-white flex flex-col justify-center items-center text-center">
        {result ? (
          <div className="space-y-6">
            <p className="text-[#B85C38] font-mono text-xs uppercase tracking-[0.3em]">Suggested Fair Price</p>
            <h2 className="text-7xl font-serif">₹{result.suggestedPrice}</h2>
            <div className="p-4 bg-white/5 rounded-lg text-left text-sm border border-white/10">
              <p className="flex items-start gap-2 italic opacity-80">
                <Info size={18} className="text-[#B85C38] shrink-0" />
                {result.reasoning}
              </p>
            </div>
          </div>
        ) : (
          <p className="opacity-40 font-mono text-xs uppercase italic tracking-widest">Awaiting data for fair-trade analysis</p>
        )}
      </div>
    </div>
  );
}