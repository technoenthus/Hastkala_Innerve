"use client";

import React, { useState } from "react";
import { Mic, Square, Sparkles, Loader2 } from "lucide-react";

export default function UnifiedStoryGenerator() {
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [output, setOutput] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    productTitle: "",
    craftType: "",
    artisanName: "",
  });

  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Please use Chrome.");

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; 

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
      recognition.onresult = (e: any) => {
        setVoiceTranscript(e.results[0][0].transcript);
        setIsRecording(false);
      };
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, voiceTranscript }),
      });
      const data = await res.json();
      if (data) setOutput(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-stone-400 uppercase mb-2">Product Title</label>
          <input className="w-full p-4 border rounded-xl outline-none focus:border-[#B85C38] bg-white" placeholder="e.g. Sacred Fish Pair" onChange={(e) => setFormData({...formData, productTitle: e.target.value})} />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-stone-400 uppercase mb-2">Artisan Name</label>
          <input className="w-full p-4 border rounded-xl outline-none focus:border-[#B85C38] bg-white" placeholder="e.g. Meera Devi" onChange={(e) => setFormData({...formData, artisanName: e.target.value})} />
        </div>
        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold text-stone-400 uppercase mb-2">Craft Type</label>
          <input className="w-full p-4 border rounded-xl outline-none focus:border-[#B85C38] bg-white" placeholder="e.g. Madhubani Painting" onChange={(e) => setFormData({...formData, craftType: e.target.value})} />
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-stone-100 flex flex-col items-center text-center">
        <button onClick={toggleRecording} className={`p-6 rounded-full transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-[#B85C38] text-white'}`}>
          {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </button>
        <p className="mt-4 text-stone-600 font-medium">{isRecording ? "Listening..." : "Click to record voice"}</p>
        {voiceTranscript && <div className="mt-4 p-4 bg-stone-50 rounded-xl italic text-stone-500 text-sm">"{voiceTranscript}"</div>}
      </div>

      <button onClick={handleGenerate} disabled={loading || !voiceTranscript} className="w-full bg-[#1A2456] text-white py-5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg disabled:opacity-50">
        {loading ? <><Loader2 className="animate-spin" /> WEAVING STORY...</> : <><Sparkles size={18} /> GENERATE STORY WITH AI</>}
      </button>

      {output && (
        <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Region:</p>
              <p className="text-sm font-semibold text-stone-800">{output.extractedRegion}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Materials:</p>
              <p className="text-sm font-semibold text-stone-800">{output.extractedMaterials}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">Process:</p>
              <p className="text-sm font-semibold text-stone-800">{output.extractedProcess}</p>
            </div>
          </div>
          <div className="bg-white p-10 rounded-2xl border border-stone-50 italic text-2xl leading-relaxed text-stone-800 shadow-sm">
            {output.story}
          </div>
        </div>
      )}
    </div>
  );
}