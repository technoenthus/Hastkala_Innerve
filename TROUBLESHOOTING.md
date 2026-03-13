# HASTAKALA — Quick Troubleshooting Guide

## 🔴 Common Issues & Solutions

---

## 1. Dev Server Won't Start

### Problem: `error - EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Kill process using port 3000
npx kill-port 3000

# Or manually specify different port
npm run dev -- -p 3001
```

---

## 2. Module Not Found / Import Errors

### Problem: `Module not found: Can't resolve '@/components/ProductCard'`

**Solutions:**
1. Check file exists:
   ```bash
   ls app/components/ProductCard.tsx
   # Should return the file path
   ```

2. Check spelling (case-sensitive on Linux):
   ```bash
   # ❌ Wrong
   import ProductCard from '@/components/productcard'
   
   # ✅ Correct
   import ProductCard from '@/components/ProductCard'
   ```

3. Verify path alias in `tsconfig.json`:
   ```json
   "paths": { "@/*": ["./*"] }
   ```

---

## 3. Images Not Loading

### Problem: Product/Artisan images show as broken

**Causes & Solutions:**

**A) Unsplash URL issue**
```javascript
// ❌ Wrong - no query params
src="https://images.unsplash.com/photo-xxx"

// ✅ Correct - add width/height
src="https://images.unsplash.com/photo-xxx?w=400&h=400&fit=crop"
```

**B) External images not in Next.js config**
Edit `next.config.js`:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
}
```

**C) Image component missing sizes prop**
```javascript
// ❌ Wrong
<Image src={url} alt="test" fill />

// ✅ Correct
<Image 
  src={url} 
  alt="test" 
  fill 
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover"
/>
```

---

## 4. Styles Not Applying

### Problem: Tailwind classes don't work (text stays black, no colors)

**Solutions:**

**A) Check globals.css is imported**
In `app/layout.tsx`:
```typescript
import "./globals.css"  // ✅ Must be here
```

**B) Verify tailwind.config.ts content path**
```typescript
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",  // ✅ Include app directory
]
```

**C) Custom colors defined in tsconfig**
```typescript
colors: {
  indigo: {
    deep: "#1e1b4b",  // ✅ Use exact hex
  }
}
```

**D) Rebuild Tailwind cache**
```bash
rm -rf .next
npm run dev   # Will regenerate
```

---

## 5. API Routes Not Working (500 Error)

### Problem: `POST /api/voice-to-story -> 500 Internal Server Error`

**Debugging steps:**

**Step 1: Check error in server console**
```bash
# Look at terminal where `npm run dev` is running
# Should see error message like:
# [error] ... GEMINI_API_KEY is not set
```

**Step 2: Verify .env.local exists**
```bash
ls -la .env.local
# Should show the file

cat .env.local | grep GEMINI
# Should show: GEMINI_API_KEY=sk_...
```

**Step 3: Reload environment**
```bash
# Stop dev server (Ctrl+C)
# Restart: npm run dev
# Environment variables reload on restart
```

**Step 4: Test API directly**
```bash
# In another terminal:
curl -X POST http://localhost:3000/api/fair-price \
  -H "Content-Type: application/json" \
  -d '{"craftType":"test","materialCost":500,"laborHours":10,"region":"India","rarity":"rare","hasGITag":false}'

# Should return JSON (not error)
```

**Step 5: Check Gemini API Key validity**
```bash
# Visit: https://aistudio.google.com/app/apikey
# Look for your key
# If it's there, it's probably valid
# If not visible, regenerate it
```

**Step 6: Check rate limits**
- Gemini free tier has limits
- If doing 100+ calls, you'll hit limit
- Solution: Use mock responses in UI

---

## 6. Form Submission Does Nothing

### Problem: Click "Generate Story" button, nothing happens

**Debugging:**

**A) Check if API is being called**
1. Open DevTools (F12)
2. Go to "Network" tab
3. Click button
4. Look for POST request
5. If no request → JavaScript error (check Console tab)

**B) Check console for errors**
```javascript
// Console shows:
// ❌ Uncaught TypeError: fetch is not defined
// Solution: Make sure function is 'async' and has proper try/catch
```

**C) API responds but nothing displays**
```javascript
// Check if response is being parsed
const data = await res.json();
console.log("Got response:", data);  // Add this line
```

**D) State not updating**
```javascript
// ❌ Wrong
result = await fetch(...);

// ✅ Correct - use setState
setResult(await res.json());
```

---

## 7. Mobile Buttons Not Clickable

### Problem: Buttons work on desktop but not mobile

**Solutions:**

**A) Buttons too small (< 44px)**
```javascript
// ❌ Wrong
<button className="px-2 py-1"> Click me </button>

// ✅ Correct - min 44x44px
<button className="px-4 py-3"> Click me </button>
```

**B) Overlapping elements**
Use `z-index` to fix layering:
```javascript
<button className="relative z-10"> Click me </button>
```

**C) Touch events not handled**
```javascript
// ✅ onClick works for both mouse & touch
<button onClick={() => handleClick()}>
  Click me
</button>
```

---

## 8. Layout Broken on Mobile

### Problem: Website looks squeezed or content overlaps on phone

**Debugging:**

**A) Check DevTools responsive mode**
1. Open DevTools (F12)
2. Click responsive icon (top-left)
3. Select "iPhone 12"
4. Refresh page
5. Check layout

**B) Missing responsive classes**
```javascript
// ❌ Wrong - same size everywhere
<div className="w-full px-6">

// ✅ Correct - responsive padding
<div className="w-full px-4 md:px-6 lg:px-8">
```

**C) Images not responsive**
```javascript
// ✅ Always use Image component with sizes
<Image
  src={url}
  alt="test"
  width={400}
  height={300}
  className="w-full h-auto"
/>
```

**D) Grid not stacking**
```javascript
// ❌ Wrong - always 4 columns
<div className="grid grid-cols-4 gap-4">

// ✅ Correct - responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
```

---

## 9. Navigation Links Don't Work

### Problem: Click on nav link, page doesn't change

**Debugging:**

**A) Links use wrong href**
```javascript
// ❌ Wrong
<Link href="explore">  (missing /)

// ✅ Correct
<Link href="/explore">
```

**B) Page component doesn't export**
```javascript
// ❌ Wrong
export default HomePage() { ... }

// ✅ Correct
export default function HomePage() { ... }
```

**C) Dynamic route `[id]` not generating pages**
```javascript
// In /app/product/[id]/page.tsx, need This:
export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }));
}

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  ...
}
```

---

## 10. Gemini API Returns Garbage

### Problem: AI response is malformed JSON or empty

**Causes & Solutions:**

**A) API key invalid**
- Response: `401 Unauthorized` in Network tab
- Solution: Regenerate key at https://aistudio.google.com/app/apikey

**B) Rate limit exceeded**
- Response: `429 Too Many Requests`
- Solution: Wait a minute, then try again. Or use mock mode.

**C) Malformed prompt**
- Response: Valid JSON but empty/weird content
- Solution: Check prompt in `lib/gemini.ts`, ensure it has clear instructions

**D) Response parsing fails**
```javascript
// ❌ If Gemini returns markdown JSON:
// ```json
// { "story": "..." }
// ```

// ✅ Fix by stripping markers:
const cleaned = raw.replace(/```json|```/g, "").trim();
const parsed = JSON.parse(cleaned);
```

---

## 11. Search/Filter Not Working

### Problem: Type in search box, results don't filter

**Debugging:**

**A) Check search state updates**
```javascript
const [search, setSearch] = useState("");

// Make sure input calls setter:
<input 
  value={search} 
  onChange={(e) => setSearch(e.target.value)}  // ✅ Required
/>
```

**B) Check filter logic**
```javascript
// In useMemo:
const filtered = products.filter(p => 
  p.title.toLowerCase().includes(search.toLowerCase())  // ✅ Case-insensitive
);
```

**C) Check memoization**
```javascript
// ✅ Must include all dependencies:
const filtered = useMemo(() => {
  // Filter logic
}, [search, selectedCategory, selectedRegion]);  // ✅ All here
```

---

## 12. Build Fails with TypeScript Errors

### Problem: `npm run build` fails with type errors

**Debugging:**

**A) Check error message**
```bash
# Error usually shows file + line:
# error TS2339: Property 'id' does not exist on type '{}'
```

**B) Fix type safety**
```typescript
// ❌ Wrong
const product = products.find(p => p.id === params.id);

// ✅ Correct - add type guard
const product = products.find(p => p.id === params.id);
if (!product) notFound();  // Handle undefined

// Or use non-null assertion
const product = products.find(p => p.id === params.id)!;
```

**C) Enable TypeScript strict mode gradually**
Edit `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,  // Start with this
    "noImplicitAny": true
  }
}
```

---

## 13. Deployment to Vercel Fails

### Problem: Push to GitHub, Vercel build fails

**A) Check build logs**
1. Go to Vercel dashboard
2. Click project → Deployments
3. Click failed deployment
4. Scroll to Build Logs
5. Look for error message

**B) Common build errors**

**Error: Environment variable not set**
```
Error: GEMINI_API_KEY is not set
```
Solution: In Vercel → Settings → Environment Variables → Add `GEMINI_API_KEY`

**Error: Port already in use (Vercel)**
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solution: Vercel manages port, shouldn't happen. Try rebuilding.

**Error: Node version mismatch**
```
Error: The engine "node" is incompatible
```
Solution: In `package.json`, add:
```json
"engines": {
  "node": "18.x"
}
```

**C) Clear cache and rebuild**
- Vercel dashboard → Settings → Clear Build Cache
- Then trigger rebuild

---

## 14. "Cannot find module" on Deploy (But Works Locally)

### Problem: Works on `npm run dev`, but fails after `npm run build`

**Cause:** Case sensitivity on Linux/Vercel servers (different from Windows)

**Fix:**
```bash
# Check actual filenames
ls -la app/components/

# Ensure imports match exactly:
# If file is: ProductCard.tsx
# Then import: ProductCard (not productcard)

import ProductCard from '@/components/ProductCard';  // ✅ Correct
```

---

## 15. Slow Performance / Page Load

### Problem: Page takes 5+ seconds to load

**Optimization:**

**A) Check network waterfall**
1. DevTools → Network tab
2. Refresh page
3. Look for slow requests
4. Prioritize fixing slowest item

**B) Optimize images**
```javascript
// ✅ Auto-optimize with Next.js Image:
<Image
  src={url}
  alt="test"
  width={400}
  height={300}
  priority  // Only for above-fold
/>
```

**C) Lazy load components**
```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/Heavy'),
  { loading: () => <div>Loading...</div> }
);
```

**D) Check bundle size**
```bash
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js:
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer(nextConfig)

# Run: ANALYZE=true npm run build
```

---

## 🆘 Still Stuck?

### Emergency Debug Workflow

1. **Check console**
   - F12 → Console tab
   - Look for red error messages
   - Copy first error message

2. **Check Network tab**
   - F12 → Network
   - Reload page
   - Look for red (failed) requests
   - Click request, check Response

3. **Check server logs**
   - Terminal where `npm run dev` runs
   - Look for error stack trace

4. **Search error online**
   - Google the exact error message
   - Usually first StackOverflow result has solution

5. **Isolate the problem**
   - Comment out code section by section
   - Find which line causes error
   - Fix that specific area

6. **Use mock/fallback**
   - If API broken, use mock data
   - If design broken, simplify it
   - Get demo working, polish later

---

## 🎯 When All Else Fails

**If 1 hour left and something broken:**

```bash
# Option 1: Revert to last working version
git checkout HEAD -- <filename>

# Option 2: Simplify the feature
# Remove that feature, move on

# Option 3: Use mock data
# Hardcode test response

# Option 4: Deploy without that feature
# Better to deploy 95% working than nothing
```

**Remember:** In hackathons, **shipped > perfect**. Get it live, then iterate.

---

**Good luck! You've got this!** 🚀
