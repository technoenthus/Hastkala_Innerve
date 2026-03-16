"use client";

import React, { useState } from "react";
import { Sparkles, BookOpen, Camera, Calculator } from "lucide-react";

// IMPORTANT: These three files MUST exist in your /components folder
import UnifiedStoryGenerator from "@/components/UnifiedStoryGenerator";
import PhotoToListing from "@/components/PhotoToListing";
import FairPriceCalculator from "@/components/FairPriceCalculator";

export default function StoryGeneratorPage() {
  // Navigation strictly limited to 3 tools for a cleaner UX
  const [activeTab, setActiveTab] = useState("story-generator");

  return (
    <div className="min-h-screen bg-[#FBF7F0] font-serif selection:bg-[#B85C38]/20">
      
      {/* 1. Hero Header Section */}
      <div className="bg-[#1A2456] text-white p-16 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 rotate-12 bg-white/20 w-32 h-32 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 -rotate-12 bg-[#B85C38]/40 w-48 h-48 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="inline-block p-2 border border-white/20 rounded-full mb-6">
             <Sparkles size={24} className="text-[#B85C38]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight">
            AI Tools for Artisans
          </h1>
          <p className="opacity-70 max-w-2xl mx-auto text-lg italic">
            Empowering the hands that preserve our history through the voice of modern AI.
          </p>
        </div>
      </div>

      {/* 2. Three-Tool Navigation Bar */}
      <div className="flex justify-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <button 
          onClick={() => setActiveTab("story-generator")}
          className={`px-8 md:px-12 py-6 flex items-center gap-3 transition-all duration-300 ${
            activeTab === "story-generator" 
            ? "border-b-4 border-[#B85C38] text-[#1A2456] font-bold" 
            : "opacity-40 hover:opacity-100 text-[#1A2456]"
          }`}
        >
          <BookOpen size={20} className={activeTab === "story-generator" ? "text-[#B85C38]" : ""} /> 
          <span className="uppercase tracking-widest text-[10px] md:text-xs font-mono">Story Generator</span>
        </button>
        
        <button 
          onClick={() => setActiveTab("photo-listing")}
          className={`px-8 md:px-12 py-6 flex items-center gap-3 transition-all duration-300 ${
            activeTab === "photo-listing" 
            ? "border-b-4 border-[#B85C38] text-[#1A2456] font-bold" 
            : "opacity-40 hover:opacity-100 text-[#1A2456]"
          }`}
        >
          <Camera size={20} className={activeTab === "photo-listing" ? "text-[#B85C38]" : ""} /> 
          <span className="uppercase tracking-widest text-[10px] md:text-xs font-mono">Photo to Listing</span>
        </button>

        <button 
          onClick={() => setActiveTab("price-calculator")}
          className={`px-8 md:px-12 py-6 flex items-center gap-3 transition-all duration-300 ${
            activeTab === "price-calculator" 
            ? "border-b-4 border-[#B85C38] text-[#1A2456] font-bold" 
            : "opacity-40 hover:opacity-100 text-[#1A2456]"
          }`}
        >
          <Calculator size={20} className={activeTab === "price-calculator" ? "text-[#B85C38]" : ""} /> 
          <span className="uppercase tracking-widest text-[10px] md:text-xs font-mono">Fair Price</span>
        </button>
      </div>

      {/* 3. Main Content Rendering Area */}
      <div className="max-w-6xl mx-auto p-8 md:p-16">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-2 min-h-[500px]">
          {activeTab === "story-generator" && <UnifiedStoryGenerator />}
          {activeTab === "photo-listing" && <PhotoToListing />}
          {activeTab === "price-calculator" && <FairPriceCalculator />}
        </div>
      </div>
      
      {/* Subtle Branding Footer */}
      <footer className="p-16 text-center">
        <div className="h-px w-24 bg-[#B85C38]/20 mx-auto mb-8"></div>
        <p className="text-stone-300 font-mono text-[10px] uppercase tracking-[0.5em]">
          HASTAKALA AI · Preserving Lineage · India 2026
        </p>
      </footer>
    </div>
  );
}