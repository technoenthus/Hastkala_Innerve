"use client";

import React, { useState } from "react";
import { Camera, Sparkles, Loader2, Package, Tag } from "lucide-react";

export default function PhotoToListing() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const res = await fetch("/api/photo-to-listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            imageBase64: base64, 
            mimeType: file.type 
          }),
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="relative group bg-white p-12 rounded-3xl border-2 border-dashed border-stone-200 hover:border-[#B85C38] transition-all text-center">
        <input 
          type="file" 
          accept="image/*" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          onChange={handleFileUpload}
        />
        <div className="p-6 bg-stone-50 rounded-full inline-block group-hover:bg-[#B85C38]/10 transition-colors">
          <Camera size={48} className="text-stone-300 group-hover:text-[#B85C38]" />
        </div>
        <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-stone-500">Upload Product Photo</h3>
        <p className="text-sm text-stone-400 mt-2 italic">AI will analyze the craft and generate a listing</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center gap-4 py-10">
          <Loader2 className="animate-spin text-[#B85C38]" size={32} />
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Gemini is analyzing the craft...</p>
        </div>
      )}

      {result && (
        <div className="bg-white p-10 rounded-2xl border border-stone-100 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-[#B85C38] font-mono text-[10px] uppercase">
            <Sparkles size={14} /> AI Analysis Complete
          </div>
          <div>
            <h2 className="text-3xl font-serif text-[#1A2456] mb-4">{result.title}</h2>
            <p className="text-stone-600 leading-relaxed text-lg italic">"{result.description}"</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {result.tags?.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-[#FBF7F0] text-[#B85C38] text-[10px] font-mono rounded-full uppercase">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}