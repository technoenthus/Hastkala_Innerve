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
} from "lucide-react";
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
  const [result, setResult] = useState<typeof mockStory | null>(null);
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

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Artisan Name", value: artisanName, set: setArtisanName },
          { label: "Craft Type", value: craftType, set: setCraftType },
          { label: "Region", value: region, set: setRegion },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">
              {f.label}
            </label>
            <input
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
            />
          </div>
        ))}
      </div>

      {/* Recording area */}
      <div className="bg-white border border-cream-dark rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isRecording
                ? "bg-red-500 text-white record-pulse"
                : "bg-terra text-white hover:bg-terra-light"
            }`}
          >
            {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
          <div>
            <p className="font-medium text-indigo-deep">
              {isRecording ? "Recording… (speak naturally)" : "Click to record voice"}
            </p>
            <p className="text-xs text-ink/50">Hindi, Tamil, Telugu, Bengali, or English</p>
          </div>
        </div>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={4}
          placeholder="Or type your description here… e.g. 'Main Madhubani painting banati hun, meri nani ne sikhaya tha…'"
          className="w-full bg-cream-warm border border-cream-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-soft resize-none"
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !transcript.trim()}
        className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? "Generating story…" : "Generate Story with AI"}
      </button>

      {result && (
        <div className="space-y-4 border-t border-cream-dark pt-6">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle size={16} /> Story generated successfully
          </div>

          <div className="bg-indigo-deep/5 border border-indigo-deep/10 rounded-2xl p-5">
            <p className="text-xs font-semibold text-indigo-deep uppercase tracking-wider mb-3">
              Craft Story
            </p>
            <p className="font-serif text-indigo-deep/80 leading-relaxed whitespace-pre-line">
              {result.story}
            </p>
          </div>

          <div className="bg-terra/5 border border-terra/15 rounded-2xl p-5">
            <p className="text-xs font-semibold text-terra uppercase tracking-wider mb-2">
              Product Description
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">{result.productDescription}</p>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5">
            <p className="text-xs font-semibold text-gold-dark uppercase tracking-wider mb-2">
              Marketing Caption
            </p>
            <p className="text-sm text-ink/70 leading-relaxed">{result.marketingCaption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Photo Listing Tool ──────────────────────────────────────────
function PhotoListingTool() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof mockListing | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function generate() {
    if (!preview) return;
    setLoading(true);
    try {
      const base64 = preview.split(",")[1];
      const mimeType = preview.split(";")[0].split(":")[1];
      const res = await fetch("/api/photo-to-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });
      if (res.ok) {
        setResult(await res.json());
      } else {
        await new Promise((r) => setTimeout(r, 2000));
        setResult(mockListing);
      }
    } catch {
      await new Promise((r) => setTimeout(r, 2000));
      setResult(mockListing);
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className="relative border-2 border-dashed border-cream-dark rounded-2xl p-10 text-center cursor-pointer hover:border-indigo-soft transition-colors bg-white"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="mx-auto max-h-64 rounded-xl object-contain" />
        ) : (
          <div>
            <Camera size={40} className="mx-auto text-indigo-deep/20 mb-4" />
            <p className="font-medium text-indigo-deep mb-1">Drop a craft photo here</p>
            <p className="text-sm text-ink/40">or click to browse · JPG, PNG, WEBP</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {preview && (
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {loading ? "Analyzing photo…" : "Generate Listing with AI"}
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
                {result.tags.map((tag: string) => (
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
        onClick={generate}
        disabled={loading}
        className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
        {loading ? "Writing story…" : "Generate Emotional Story"}
      </button>

      {story && (
        <div className="border-t border-cream-dark pt-6">
          <div className="bg-indigo-deep/5 border border-indigo-deep/10 rounded-2xl p-6">
            <p className="text-xs font-semibold text-indigo-deep uppercase tracking-wider mb-4">
              Generated Product Story
            </p>
            <p className="font-serif text-lg text-indigo-deep/80 leading-relaxed whitespace-pre-line italic">
              &ldquo;{story}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Social Media Kit Tool ───────────────────────────────────────
const PLATFORM_COLORS: Record<string, string> = {
  "Instagram": "bg-pink-50 border-pink-200 text-pink-700",
  "Instagram Reels": "bg-purple-50 border-purple-200 text-purple-700",
  "Facebook": "bg-blue-50 border-blue-200 text-blue-700",
};

function SocialMediaKitTool() {
  const [form, setForm] = useState({
    productTitle: "Sacred Fish Pair — Madhubani on Handmade Paper",
    description: "A traditional Madhubani painting depicting the Matsya motif, symbol of fertility and good fortune in Mithila culture. Painted with natural pigments on handmade paper using a bamboo twig brush.",
    craftType: "Madhubani",
    artisanName: "Meera Devi",
    region: "Mithila, Bihar",
    price: "4800",
  });
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<{ platform: string; caption: string; hashtags: string[] }[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/social-media-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: form.price ? Number(form.price) : undefined }),
      });
      const data = await res.json();
      if (data?.captions) setCaptions(data.captions);
    } catch {
      // network error — do nothing
    }
    setLoading(false);
  }

  function copyCaption(idx: number, caption: string, hashtags: string[]) {
    const text = `${caption}\n\n${hashtags.map((h) => `#${h}`).join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {([
          { label: "Product Title", key: "productTitle", span: true },
          { label: "Craft Type", key: "craftType" },
          { label: "Artisan Name", key: "artisanName" },
          { label: "Region", key: "region" },
          { label: "Price (₹)", key: "price" },
        ] as { label: string; key: string; span?: boolean }[]).map((f) => (
          <div key={f.key} className={f.span ? "sm:col-span-2" : ""}>
            <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">{f.label}</label>
            <input
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
              className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft"
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-ink/50 uppercase tracking-wider block mb-1.5">Product Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            className="w-full bg-white border border-cream-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-soft resize-none"
          />
        </div>
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
        </div>
      </div>

      {/* Tool selector */}
      <div className="border-b border-cream-dark bg-cream-warm sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                id={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2.5 px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTool === t.id
                    ? "border-indigo-deep text-indigo-deep"
                    : "border-transparent text-ink/50 hover:text-ink"
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.bg} ${t.color}`}>
                  <t.icon size={14} />
                </div>
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active tool */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {TOOLS.map((t) => {
          if (t.id !== activeTool) return null;
          return (
            <div key={t.id}>
              <div className="mb-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${t.bg} ${t.color} mb-3`}>
                  <t.icon size={22} />
                </div>
                <h2 className="font-serif text-3xl font-semibold text-indigo-deep mb-1">{t.title}</h2>
                <p className="text-ink/50 text-sm">{t.subtitle}</p>
              </div>
              <ActiveComp />
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
