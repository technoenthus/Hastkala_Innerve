'use client'
import { useState, useRef } from 'react'
import { CheckCircle, Copy, RotateCcw, ChevronDown, ChevronUp, Shield } from 'lucide-react'

interface Prediction { label: string; score: number }
interface CraftResult {
  identified: boolean
  fallback_used?: boolean
  message?: string
  craft?: {
    name: string; state: string; region: string
    gi_tag: string; gi_registered: boolean
    age: string; community: string; confidence: number
    cultural_story: string; listing_keywords: string[]
    price_range: string; typical_products: string[]
    all_predictions: Prediction[]
  }
}

export default function CraftHeritageIdentifier() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CraftResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB'); return }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPG, PNG or WebP image'); return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const handleIdentify = async () => {
    if (!imageFile) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    const messages = ['Analyzing craft patterns...', 'Consulting heritage database...', 'Generating cultural story...', 'Almost ready...']
    let i = 0
    setLoadingMessage(messages[0])
    const interval = setInterval(() => { i = (i + 1) % messages.length; setLoadingMessage(messages[i]) }, 2000)

    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      const response = await fetch('/api/identify-craft', { method: 'POST', body: formData })
      const data: CraftResult = await response.json()
      setResult(data)
    } catch {
      setError('Failed to identify craft. Please check your connection and try again.')
    } finally {
      clearInterval(interval)
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (result?.craft?.cultural_story) {
      navigator.clipboard.writeText(result.craft.cultural_story)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setImageFile(null)
    setImagePreview(null)
    setResult(null)
    setError(null)
  }

  const confidenceBadge = (score: number) =>
    score >= 70 ? 'bg-green-100 text-green-800' :
    score >= 50 ? 'bg-yellow-100 text-yellow-800' :
    'bg-orange-100 text-orange-800'

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      {!imageFile && !isLoading && !result && (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
          className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-300 bg-white ${dragOver ? 'border-indigo-deep bg-indigo-deep/5' : 'border-cream-dark hover:border-indigo-soft'}`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-indigo-deep/5 flex items-center justify-center">
              <Shield size={26} className="text-indigo-deep/40" />
            </div>
            <p className="font-medium text-indigo-deep">Drop your craft photo here</p>
            <p className="text-sm text-ink/40">Supports JPG, PNG, WebP · Max 5MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      )}

      {/* Preview + analyze */}
      {imageFile && !isLoading && !result && (
        <div className="space-y-4">
          <div className="bg-white border border-cream-dark rounded-2xl p-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview!} alt="Preview" className="max-h-64 object-contain rounded-xl" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleIdentify}
              className="flex items-center gap-2 bg-indigo-deep text-cream px-6 py-3 rounded-full font-medium hover:bg-indigo-mid transition-all duration-300">
              <Shield size={16} /> Identify this Craft
            </button>
            <button onClick={reset}
              className="flex items-center gap-2 border border-indigo-deep text-indigo-deep px-6 py-3 rounded-full font-medium hover:bg-indigo-deep/5 transition-all duration-300">
              <RotateCcw size={16} /> Choose different photo
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          <div className="bg-white border border-cream-dark rounded-2xl p-4 flex justify-center opacity-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview!} alt="Preview" className="max-h-48 object-contain rounded-xl" />
          </div>
          <div className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-deep/20 border-t-indigo-deep rounded-full animate-spin" />
            <p className="font-medium text-indigo-deep">{loadingMessage}</p>
            <p className="text-xs text-ink/40">HuggingFace CLIP is analyzing your image...</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result?.identified && result.craft && (
        <div className="space-y-4 border-t border-cream-dark pt-6">
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle size={16} /> Craft identified successfully
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <div className="bg-white border border-cream-dark rounded-2xl p-4 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview!} alt="Uploaded craft" className="max-h-56 object-contain rounded-xl" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${confidenceBadge(result.craft.confidence)}`}>
                  {result.craft.confidence}% confident
                </span>
                {result.fallback_used && (
                  <span className="text-xs text-ink/40 bg-cream-warm border border-cream-dark px-2.5 py-1 rounded-full">
                    Identified via Gemini Vision
                  </span>
                )}
              </div>
              {/* Prediction bars */}
              <div className="space-y-2">
                {result.craft.all_predictions.map((p, i) => (
                  <div key={p.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={i === 0 ? 'font-medium text-indigo-deep' : 'text-ink/50'}>{p.label}</span>
                      <span className={i === 0 ? 'font-medium text-indigo-deep' : 'text-ink/40'}>{p.score}%</span>
                    </div>
                    <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${i === 0 ? 'bg-indigo-deep' : 'bg-ink/20'}`}
                        style={{ width: `${p.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-deep">{result.craft.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
                    {result.craft.state}
                  </span>
                  {result.craft.gi_registered ? (
                    <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle size={11} /> {result.craft.gi_tag}
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-full font-medium">
                      {result.craft.gi_tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/50 mt-2">{result.craft.age} · {result.craft.community}</p>
              </div>

              <hr className="border-cream-dark" />

              <div>
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-2">Cultural Heritage Story</p>
                <blockquote className="border-l-4 border-amber-400 bg-amber-50 p-4 rounded-r-xl italic text-sm text-ink/80 leading-relaxed">
                  {result.craft.cultural_story}
                </blockquote>
              </div>

              <hr className="border-cream-dark" />

              <div>
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-2">Perfect for selling as</p>
                <div className="flex flex-wrap gap-2">
                  {result.craft.typical_products.map(p => (
                    <span key={p} className="text-sm bg-blue-50 text-blue-700 rounded-full px-3 py-1">{p}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-2">Listing keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.craft.listing_keywords.map(k => (
                    <span key={k} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">{k}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">Price range</p>
                <p className="text-sm font-bold text-indigo-deep">{result.craft.price_range}</p>
              </div>

              <hr className="border-cream-dark" />

              <div className="flex gap-3 flex-wrap">
                <button onClick={handleCopy}
                  className="flex items-center gap-2 bg-indigo-deep text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-mid transition-all duration-300">
                  {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy story for listing'}
                </button>
                <button onClick={reset}
                  className="flex items-center gap-2 border border-indigo-deep text-indigo-deep px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-deep/5 transition-all duration-300">
                  <RotateCcw size={14} /> Identify another craft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not identified */}
      {result && !result.identified && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
          <p className="text-amber-800 font-medium">{result.message}</p>
          {result.all_predictions && result.all_predictions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">What was detected</p>
              {result.all_predictions.map(p => (
                <div key={p.label} className="flex justify-between text-sm text-amber-700">
                  <span>{p.label}</span><span>{p.score}%</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={reset}
            className="flex items-center gap-2 bg-indigo-deep text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-mid transition-all duration-300">
            <RotateCcw size={14} /> Try again
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start justify-between gap-4">
          <p className="text-red-700 text-sm">{error}</p>
          <button onClick={reset} className="text-xs text-red-600 underline whitespace-nowrap">Try again</button>
        </div>
      )}

      {/* How it works */}
      <div className="border border-cream-dark rounded-2xl overflow-hidden">
        <button
          onClick={() => setHowItWorksOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-indigo-deep hover:bg-cream-warm transition-colors"
        >
          How it works
          {howItWorksOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {howItWorksOpen && (
          <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { n: '1', text: 'CLIP AI scans visual patterns in your photo' },
              { n: '2', text: 'Matched against 15 Indian craft traditions' },
              { n: '3', text: 'GI tag & cultural database lookup' },
              { n: '4', text: 'Gemini AI writes your marketplace story' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3 bg-cream-warm rounded-xl p-3">
                <span className="w-6 h-6 rounded-full bg-indigo-deep text-cream text-xs font-bold flex items-center justify-center shrink-0">{s.n}</span>
                <p className="text-sm text-ink/70">{s.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
