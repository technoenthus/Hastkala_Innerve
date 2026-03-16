"use client";
import { useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Camera,
  Calculator,
  BookOpen,
  Loader2,
  CheckCircle,
  Upload,
  Sparkles,
  Shield,
} from "lucide-react";
import CraftHeritageIdentifier from "@/components/CraftHeritageIdentifier";
import { mockStory, mockListing } from "@/lib/gemini";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// ─── Voice Story Tool ───────────────────────────────────────────
function VoiceStoryTool() {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ productTitle: string; productDescription: string; craftStory: string } | null>(null);
  const [artisanName, setArtisanName] = useState("Meera Devi");
  const [craftType, setCraftType] = useState("Madhubani Painting");
  const [region, setRegion] = useState("Mithila, Bihar");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  function startRecording() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Please type your description.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "hi-IN";
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const t = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setTranscript(t);
    };
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  }

  function stopRecording() {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }

  async function generate() {
    if (!transcript.trim()) {
      alert("Please record or type a description first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/voice-to-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artisanName, craftType, region, voiceTranscript: transcript }),
      });
      if (res.ok) {
        setResult(await res.json());
      } else {
        // Demo mode
        await new Promise((r) => setTimeout(r, 1500));
        setResult(mockStory);
      }
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
      setResult(mockStory);
    }
    setLoading(false);
  }

import React, { useState } from "react";
import { Sparkles, BookOpen, Camera, Calculator } from "lucide-react";
import Navigation from "@/components/Navigation";

// IMPORTANT: These three files MUST exist in your /components folder
import UnifiedStoryGenerator from "@/components/UnifiedStoryGenerator";
import PhotoToListing from "@/components/PhotoToListing";
import FairPriceCalculator from "@/components/FairPriceCalculator";

export default function StoryGeneratorPage() {
  // Navigation strictly limited to 3 tools for a cleaner UX
  const [activeTab, setActiveTab] = useState("story-generator");

  return (
    <>
      <Navigation />
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

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
              Product Title
            </p>
            <p className="font-serif text-xl text-indigo-deep font-semibold">{result.productTitle}</p>
          </div>

          <div className="bg-terra/5 border border-terra/15 rounded-2xl p-5">
            <p className="text-xs font-semibold text-terra uppercase tracking-wider mb-2">
              Product Description
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">{result.productDescription}</p>
          </div>

          <div className="bg-indigo-deep/5 border border-indigo-deep/10 rounded-2xl p-5">
            <p className="text-xs font-semibold text-indigo-deep uppercase tracking-wider mb-3">
              Craft Story
            </p>
            <p className="font-serif text-indigo-deep/80 leading-relaxed whitespace-pre-line">
              {result.craftStory}
            </p>
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
      )}

      {result && (
        <div className="space-y-4 border-t border-cream-dark pt-6">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle size={16} /> Listing generated
          </div>

          <div className="bg-white border border-cream-dark rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-1">Title</p>
              <p className="font-serif text-xl text-indigo-deep">{result.title}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-1">Category</p>
              <span className="inline-block bg-terra/10 text-terra text-sm px-3 py-1 rounded-full">
                {result.category}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-1">Description</p>
              <p className="text-sm text-ink/70 leading-relaxed">{result.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {(result.tags ?? []).map((tag: string) => (
                  <span key={tag} className="text-xs bg-cream-warm border border-cream-dark text-indigo-deep px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-1">Materials</p>
              <p className="text-sm text-ink/60">{result.suggestedMaterials}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fair Price Calculator ────────────────────────────────────────
function FairPriceTool() {
  const [form, setForm] = useState({
    craftType: "Madhubani Painting",
    region: "Mithila, Bihar",
    materialCost: 500,
    laborHours: 18,
    rarity: "rare" as "common" | "rare" | "endangered",
    hasGITag: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    suggestedPrice: number;
    priceBreakdown: { materialCost: number; laborCost: number; craftPremium: number; platformFee: number; total: number };
    reasoning: string;
    comparisonNote: string;
  } | null>(null);

  async function calculate() {
    setLoading(true);
    try {
      const res = await fetch("/api/fair-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setResult(await res.json());
      } else {
        await new Promise((r) => setTimeout(r, 1200));
        const labor = form.laborHours * (form.rarity === "endangered" ? 350 : form.rarity === "rare" ? 280 : 200);
        const premium = form.hasGITag ? form.materialCost * 0.3 : 0;
        const sub = form.materialCost + labor + premium;
        const fee = Math.round(sub * 0.15);
        setResult({
          suggestedPrice: sub + fee,
          priceBreakdown: { materialCost: form.materialCost, laborCost: labor, craftPremium: Math.round(premium), platformFee: fee, total: sub + fee },
          reasoning: `Based on ₹${form.rarity === "endangered" ? 350 : form.rarity === "rare" ? 280 : 200}/hour for ${form.rarity} craft skill in ${form.region}, with standard platform fees.`,
          comparisonNote: "This price reflects fair trade standards and is competitive in the global handicraft market.",
        });
      }
    } catch {
      await new Promise((r) => setTimeout(r, 1200));
      const labor = form.laborHours * 280;
      const sub = form.materialCost + labor;
      const fee = Math.round(sub * 0.15);
      setResult({
        suggestedPrice: sub + fee,
        priceBreakdown: { materialCost: form.materialCost, laborCost: labor, craftPremium: 0, platformFee: fee, total: sub + fee },
        reasoning: "Calculated using fair trade guidelines for skilled artisans.",
        comparisonNote: "Competitively priced for the global handcraft market.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Craft Type", key: "craftType", type: "text" },
          { label: "Region", key: "region", type: "text" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.key as keyof typeof form] as string}
              onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
            />
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
            Material Cost (₹)
          </label>
          <input
            type="number"
            value={form.materialCost}
            onChange={(e) => setForm((p) => ({ ...p, materialCost: Number(e.target.value) }))}
            className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
            Labor Hours
          </label>
          <input
            type="number"
            value={form.laborHours}
            onChange={(e) => setForm((p) => ({ ...p, laborHours: Number(e.target.value) }))}
            className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
            Tradition Rarity
          </label>
          <select
            value={form.rarity}
            onChange={(e) => setForm((p) => ({ ...p, rarity: e.target.value as "common" | "rare" | "endangered" }))}
            className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="endangered">Endangered</option>
          </select>
        </div>
        <div className="flex items-center gap-3 bg-white border border-cream-dark rounded-xl px-4 py-3">
          <input
            type="checkbox"
            id="gi-tag"
            checked={form.hasGITag}
            onChange={(e) => setForm((p) => ({ ...p, hasGITag: e.target.checked }))}
            className="w-4 h-4 accent-indigo-deep"
          />
          <label htmlFor="gi-tag" className="text-sm text-indigo-deep font-medium cursor-pointer">
            Has GI Tag (Geographic Indication)
          </label>
        </div>
      </div>

      <button
        onClick={calculate}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
        {loading ? "Calculating fair price…" : "Calculate Fair Price"}
      </button>

      {result && (
        <div className="space-y-4 border-t border-cream-dark pt-6">
          <div className="bg-indigo-deep rounded-2xl p-6 text-center">
            <p className="text-cream/60 text-sm mb-1">Suggested Fair Price</p>
            <p className="font-serif text-5xl text-cream font-semibold">
              ₹{result.suggestedPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white border border-cream-dark rounded-2xl p-5">
            <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-4">
              Price Breakdown
            </p>
            <div className="space-y-2">
              {[
                { label: "Material Cost", value: result.priceBreakdown.materialCost, color: "bg-terra" },
                { label: "Labour (Skill)", value: result.priceBreakdown.laborCost, color: "bg-indigo-soft" },
                { label: "Craft Premium", value: result.priceBreakdown.craftPremium, color: "bg-gold" },
                { label: "Platform Fee (15%)", value: result.priceBreakdown.platformFee, color: "bg-ink/30" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm text-ink/60">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-indigo-deep">
                    ₹{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              <div className="border-t border-cream-dark pt-2 flex items-center justify-between">
                <span className="font-semibold text-indigo-deep">Total</span>
                <span className="font-semibold text-indigo-deep">
                  ₹{result.priceBreakdown.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
            <p className="text-sm text-ink/70 leading-relaxed">{result.reasoning}</p>
            <p className="text-xs text-gold-dark mt-2">{result.comparisonNote}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Story Generator ─────────────────────────────────────────────
function StoryGeneratorTool() {
  const [form, setForm] = useState({
    productTitle: "Sacred Fish Pair — Madhubani Painting",
    craftType: "Madhubani",
    artisanName: "Meera Devi",
    artisanRegion: "Mithila, Bihar",
    materials: "Natural pigments, handmade paper",
    process: "Bamboo twig brushwork, natural color pigments, freehand composition",
  });
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");

  const mockProductStory = `When you hold this painting, you are holding the memory of a river you've never seen — the Kamala river that runs through Meera's village in Mithila, feeding the indigo plants that became the blue in these fish. The turmeric that became the gold. The lamp soot that became the fine, unwavering black lines.

Meera painted this the morning her granddaughter was born. The fish are not decoration in Mithila — they are the first avatar of Vishnu, the soul that swims before it flies. She painted them to welcome a new soul into the world. Now they come to yours.

Your purchase means Meera's granddaughter grows up watching her grandmother paint, not explain to a child why the tradition died.`;

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, process: [form.process] }),
      });
      if (res.ok) {
        const data = await res.json();
        setStory(data.story);
      } else {
        await new Promise((r) => setTimeout(r, 1500));
        setStory(mockProductStory);
      }
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
      setStory(mockProductStory);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Product Title", key: "productTitle" },
          { label: "Craft Type", key: "craftType" },
          { label: "Artisan Name", key: "artisanName" },
          { label: "Artisan Region", key: "artisanRegion" },
          { label: "Materials", key: "materials" },
        ].map((f) => (
          <div key={f.key} className={f.key === "productTitle" ? "sm:col-span-2" : ""}>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
              {f.label}
            </label>
            <input
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
            Process (brief description)
          </label>
          <input
            value={form.process}
            onChange={(e) => setForm((p) => ({ ...p, process: e.target.value }))}
            className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
          />
        </div>
      </div>
        
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

      <button
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? "Generating kit…" : "Generate Social Media Kit"}
      </button>

      {captions.length > 0 && (
        <div className="space-y-4 border-t border-cream-dark pt-6">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle size={16} /> 5 captions ready to post
          </div>
          {captions.map((c, i) => (
            <div key={i} className="bg-white border border-cream-dark rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${PLATFORM_COLORS[c.platform] ?? "bg-cream border-cream-dark text-ink"}` }>
                  {c.platform}
                </span>
                <button
                  onClick={() => copyCaption(i, c.caption, c.hashtags)}
                  className="flex items-center gap-1.5 text-xs text-ink/50 hover:text-indigo-deep transition-colors"
                >
                  {copied === i ? <CheckCircle size={13} className="text-green-500" /> : <Upload size={13} />}
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-ink/80 leading-relaxed">{c.caption}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.hashtags.map((tag) => (
                  <span key={tag} className="text-xs bg-indigo-deep/5 text-indigo-deep px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
const TOOLS = [
  { id: "voice", icon: Mic, title: "Voice to Story", subtitle: "Record · Translate · Narrate", component: VoiceStoryTool, color: "text-terra", bg: "bg-terra/10" },
  { id: "photo", icon: Camera, title: "Photo to Listing", subtitle: "Upload · Analyze · Publish", component: PhotoListingTool, color: "text-indigo-soft", bg: "bg-indigo-mid/10" },
  { id: "price", icon: Calculator, title: "Fair Price Calculator", subtitle: "Input · Calculate · Price Fairly", component: FairPriceTool, color: "text-gold-dark", bg: "bg-gold/15" },
  { id: "story", icon: BookOpen, title: "Story Generator", subtitle: "Details · Craft · Connect", component: StoryGeneratorTool, color: "text-terra", bg: "bg-terra/10" },
  { id: "social", icon: Sparkles, title: "Social Media Kit", subtitle: "Describe · Generate · Post", component: SocialMediaKitTool, color: "text-pink-500", bg: "bg-pink-50" },
  { id: "heritage", icon: Shield, title: "Heritage Identifier", subtitle: "Upload · Identify · Discover", component: CraftHeritageIdentifier, color: "text-indigo-deep", bg: "bg-indigo-deep/10" },
];

export default function AIToolsPage() {
  const [activeTool, setActiveTool] = useState("voice");
  const ActiveComp = TOOLS.find((t) => t.id === activeTool)?.component ?? VoiceStoryTool;

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-indigo-deep text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Sparkles size={12} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">AI Tools for Artisans</h1>
          <p className="text-cream/60 text-lg max-w-xl mx-auto leading-relaxed">
            Four AI tools that eliminate the barrier between craft knowledge and digital commerce.
            Speak. Upload. Price. Sell.
          </p>
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
    </>
  );
}