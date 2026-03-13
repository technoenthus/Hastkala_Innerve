# HASTAKALA — Step-by-Step Implementation Guide

## ⏱️ 24-Hour Hackathon Timeline

**Goal:** Deploy a working prototype with live AI features

---

## 🛫 HOUR 0-1: Setup

### 1.1 Verify Project Structure
```bash
cd "c:/Users/malho/Desktop/New folder/hastkala"
npm list next       # Should show 14.2.5
ls -la              # Check all files exist
```

### 1.2 Get Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Open `.env.local`
6. Replace `GEMINI_API_KEY=your_gemini_api_key_here` with your actual key
7. Save (never commit this file!)

### 1.3 Start Dev Server
```bash
npm run dev
```
Open http://localhost:3000 in browser. You should see the Home page.

### ✅ Checkpoint 1
- [ ] Dev server running
- [ ] Home page loads
- [ ] Network tab shows no 502 errors
- [ ] Gemini API key added to .env.local

---

## 🏠 HOUR 1-3: Test & Polish Home Page

### 3.1 Visual Check
Visit http://localhost:3000 and verify:
- [ ] Hero section renders with background images
- [ ] Text is readable on mobile (80+ width)
- [ ] Navigation sticky at top
- [ ] Colors match design (indigo, terra, cream, gold)
- [ ] Featured products show 4 cards
- [ ] Featured artisans show 4 cards
- [ ] Buttons are clickable

### 3.2 Mobile Responsiveness
- [ ] Test on Chrome DevTools: iPhone 12
- [ ] Hamburger menu appears on <768px
- [ ] Images scale properly
- [ ] Text doesn't overlap
- [ ] Buttons are tap-friendly (48px min)

### 3.3 Test Navigation
- [ ] Logo links to home
- [ ] Nav links work (/explore, /artisans, /ai-tools, /about)
- [ ] "Artisan Portal" button goes to /dashboard
- [ ] Mobile menu opens/closes

### 3.4 Test Footer
- [ ] Links work
- [ ] Layout stacks on mobile
- [ ] Responsive text sizes

### 3.5 Fix Any Bugs
Use browser DevTools Console to identify issues:
- Type errors? Check `/app/page.tsx`
- Image not loading? Update Unsplash URLs
- Color not rendering? Check `tailwind.config.ts`

### ✅ Checkpoint 2
- [ ] Home page pixel-perfect
- [ ] Mobile fully functional
- [ ] Navigation works end-to-end
- [ ] No console errors

---

## 🔍 HOUR 3-6: Explore & Product Pages

### 6.1 Test Explore Page
Visit http://localhost:3000/explore

- [ ] Search bar works (filter by keyword)
- [ ] Filter panel toggles on/off
- [ ] Category filter works (click "Paintings")
- [ ] Region filter works
- [ ] Craft type filter works
- [ ] Price slider works (drag to 10K)
- [ ] Results update in real-time
- [ ] "Clear all filters" button resets everything
- [ ] Masonry grid displays properly
- [ ] Products show correct card info

### 6.2 Test Product Detail Page
Click a product card → should go to `/product/madhubani-fish-pair`

- [ ] Image gallery loads
- [ ] Product title is prominent
- [ ] Price displayed clearly
- [ ] Description readable
- [ ] Story section is italic/styled
- [ ] Craft process shows numbered steps
- [ ] Artisan card links to `/artisan/[id]`
- [ ] "Add to Cart" button visible
- [ ] Related products show at bottom
- [ ] All links work (breadcrumb, artisan, etc.)

### 6.3 Test Artisan Profile Page
Click artisan card from product → should go to `/artisan/meera-devi`

- [ ] Cover image displays
- [ ] Avatar positioned correctly
- [ ] Bio and story render properly
- [ ] Experience/location stats show
- [ ] Awards section displays
- [ ] Product grid shows their items
- [ ] Click a product goes to product detail

### 6.4 Test All Artisans Page
Visit http://localhost:3000/artisans

- [ ] 4 artisan cards display
- [ ] Cards are clickable
- [ ] Links go to correct profiles
- [ ] Mission section shows at bottom

### 6.5 Mobile Testing
- [ ] All pages work on iPhone 12 viewport
- [ ] Images scale properly
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] No horizontal scrolling

### ✅ Checkpoint 3
- [ ] Explore page fully functional
- [ ] Product detail page displays story
- [ ] Artisan profiles complete
- [ ] All navigation works
- [ ] Mobile responsive all pages

---

## 🤖 HOUR 6-12: AI Tools & API Integration

### 12.1 Test AI Tools Page (Demo Mode)
Visit http://localhost:3000/ai-tools

#### Voice to Story
- [ ] Each field (name, craft, region) has a text input
- [ ] Click record button (should prompt for microphone)
- [ ] Paste transcript into textarea
- [ ] Click "Generate Story" button
- [ ] See LOADING spinner
- [ ] Mock response appears (story, description, caption)
- [ ] Can see all three outputs in colored boxes
- [ ] Layout is clean and readable

#### Photo to Listing
- [ ] Drag-and-drop area visible
- [ ] Click to upload works
- [ ] Image preview shows after upload
- [ ] "Generate Listing" button becomes active
- [ ] Click button → shows loading
- [ ] Mock response: title, description, tags, category, materials
- [ ] All fields populated correctly

#### Fair Price Calculator
- [ ] Form has all inputs (craft, region, material cost, hours, rarity, GI tag)
- [ ] Click "Calculate Fair Price"
- [ ] Big number appears (suggested price)
- [ ] Price breakdown shows 4 components
- [ ] Colors distinguish each component
- [ ] Reasoning and comparison note display

#### Story Generator
- [ ] Form fields populated with defaults
- [ ] Click "Generate Emotional Story"
- [ ] Story appears in italic serif font
- [ ] Story is emotional and buyer-focused

### 12.2 Wire Up Gemini API (Voice to Story)

Edit `app/ai-tools/page.tsx`, find `async function generate()` in `VoiceStoryTool`:

**Before:** Uses mock story
**After:** Calls real API

```typescript
async function generate() {
  if (!transcript.trim()) return;
  setLoading(true);
  try {
    const res = await fetch("/api/voice-to-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artisanName, craftType, region, voiceTranscript: transcript }),
    });
    if (res.ok) {
      const data = await res.json();
      setResult(data);
    } else {
      // Fallback to mock
      setResult(mockStory);
    }
  } catch (error) {
    console.log("Using mock response");
    setResult(mockStory);
  }
  setLoading(false);
}
```

**Test:**
1. Enter text in transcript field
2. Click "Generate Story"
3. Watch Network tab → POST to /api/voice-to-story
4. Should see actual Gemini response (not mock)

### 12.3 Wire Up Photo to Listing

Similar pattern - the code already calls `/api/photo-to-listing`. Just test:
1. Upload an image
2. Click "Generate Listing"
3. Check Network tab
4. See real Gemini vision analysis

### 12.4 Test Fair Price API

Already wired. Test:
1. Fill in values
2. Click button
3. See real calculation or mock fallback

### 12.5 Test Story Generation

Already wired. Test:
1. Fill in product details
2. Click button
3. See real story or mock

### 12.6 Troubleshooting API Errors

**If you see 500 errors:**
```
POST /api/voice-to-story -> 500
```

**Check:**
1. Is `.env.local` set correctly?
   ```bash
   echo $env:GEMINI_API_KEY    # Should show your key
   ```

2. Is API key valid?
   - Go to https://aistudio.google.com/app/apikey
   - Check if limit reached
   - Regenerate key if needed

3. Check server logs:
   ```
   npm run dev
   # Look for error message in terminal
   ```

4. Test API directly with curl:
   ```bash
   curl -X POST http://localhost:3000/api/fair-price \
     -H "Content-Type: application/json" \
     -d '{"craftType":"test","materialCost":500,"laborHours":10,"region":"test","rarity":"rare","hasGITag":false}'
   ```

5. If still failing, use **mock mode**:
   - Comment out real API call
   - Always return mock data
   - Note in demo: "Showing sample response"

### ✅ Checkpoint 4
- [ ] AI Tools page loads
- [ ] All 4 tools have working demos (mock or real)
- [ ] Voice tool can record or type
- [ ] Photo tool accepts images
- [ ] Price calculator does math
- [ ] Story generator produces text
- [ ] API errors handled gracefully

---

## 📊 HOUR 12-18: Artisan Dashboard

### 18.1 Test Dashboard Overview
Visit http://localhost:3000/dashboard

- [ ] Sidebar appears on desktop (hidden on mobile)
- [ ] Tabs: Overview, Add Product, AI Tools, Settings
- [ ] Overview tab shows:
  - [ ] Welcome message with artisan name
  - [ ] 3 stat cards (products, views, revenue)
  - [ ] 4 AI quick action buttons
  - [ ] My Products section with real product list
- [ ] Clicking product card jumps to that product page

### 18.2 Test Add Product Tab
- [ ] Photo upload area visible
- [ ] Drag-and-drop works
- [ ] Form fields (title, price, description) appear
- [ ] "AI Generate Listing" button visible
- [ ] "Publish Product" button visible
- [ ] Publish button leads to confirmation (UI only, no backend)

### 18.3 Test AI Tools Tab
- [ ] Redirects to /ai-tools
- [ ] Can use tools from within dashboard

### 18.4 Test Settings Tab
- [ ] Shows artisan details (prefilled)
- [ ] Can edit name, craft, region, bio
- [ ] "Save Changes" button visible (UI only)

### 18.5 Mobile Dashboard
- [ ] Hamburger menu for tab selection (no sidebar)
- [ ] Layout stacks vertically
- [ ] All content readable
- [ ] Buttons are tap-friendly

### ✅ Checkpoint 5
- [ ] Dashboard fully functional
- [ ] All tabs work
- [ ] Product list displays
- [ ] Stats show correct data
- [ ] Mobile layout works

---

## 📚 HOUR 18-20: About & Edge Cases

### 20.1 Test About Page
Visit http://localhost:3000/about

- [ ] Hero section with mission statement
- [ ] Problem section with artisan photo
- [ ] Impact stats (4 cards)
- [ ] Principles section (4 cards)
- [ ] Tech stack section
- [ ] Call-to-action buttons work

### 20.2 Test 404 Page
Visit http://localhost:3000/this-does-not-exist

- [ ] Custom 404 message appears
- [ ] "Back to HASTAKALA" button works
- [ ] Styled consistent with site

### 20.3 Edge Cases
- [ ] Try searching for non-existent craft → "No crafts found" message
- [ ] Try empty search → all products show
- [ ] Try price slider to 0 → nothing shows → "No crafts found"
- [ ] Try mobile nav on all pages
- [ ] Test keyboard navigation (Tab key)
- [ ] Test at different zoom levels (75%, 100%, 150%)

### ✅ Checkpoint 6
- [ ] About page complete
- [ ] 404 page working
- [ ] Edge cases handled
- [ ] Site feels polished

---

## 🚀 HOUR 20-22: Deploy to Vercel

### 22.1 Prepare for Deployment
```bash
# Check everything builds
npm run build

# Should complete with "compiled client and server successfully"
```

### 22.2 Push to GitHub
```bash
git init
git add .
git commit -m "HASTAKALA hackathon prototype"
git remote add origin https://github.com/YOUR_USERNAME/hastakala.git
git push -u origin main
```

### 22.3 Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New → Project"
4. Select your `hastakala` repository
5. Framework: Next.js (auto-detected)
6. Build Command: `next build` (default)
7. Output Directory: `.next` (default)
8. Environment: Click "Environment Variables"
9. Add: `GEMINI_API_KEY` = your_actual_key
10. Click "Deploy"

**Wait for build** → Should see "✓ Production" when done

### 22.4 Test Live Preview
- [ ] Copy Vercel URL (something.vercel.app)
- [ ] Test home page
- [ ] Test explore/filters
- [ ] Test product pages
- [ ] Test artisan profiles
- [ ] Test AI tools (should work with API key)
- [ ] Test mobile responsiveness

### 22.5 Custom Domain (Optional)
1. In Vercel Dashboard: Settings → Domains
2. Add custom domain or skip (Vercel domain is fine)

### ✅ Checkpoint 7
- [ ] Build succeeds locally
- [ ] GitHub repo has code
- [ ] Deployed to Vercel
- [ ] Live site works
- [ ] Can share demo link

---

## 📹 HOUR 22-23: Demo & Documentation

### 23.1 Create Demo Script (3 minutes)
```
[0:00] - "This is HASTAKALA, an AI marketplace for Indian artisans"
[0:15] - Show home page, highlight hero + features
[0:45] - Explore crafts page, show filtering
[1:15] - Click a product, show story-first layout
[1:45] - Artisan profile, show background
[2:00] - Dashboard: upload product with AI
[2:30] - AI Tools: demo one tool (voice to story)
[2:50] - Call to action: artisan can build livelihood
[3:00] - END
```

### 23.2 Record Demo Video
- Use Loom or OBS
- Show cursor + browser
- Narrate clearly
- No background noise
- Keep it to exactly 3 minutes

### 23.3 Update README for Submission
Add to top of README.md:

```markdown
# HASTAKALA - 24-Hour Hackathon Prototype

**Live Demo:** https://your-vercel-app.vercel.app
**GitHub:** https://github.com/username/hastakala
**Demo Video:** [link to recording]

## Quick Start
1. Clone repo
2. `npm install`
3. Add GEMINI_API_KEY to .env.local
4. `npm run dev`
5. Open http://localhost:3000

## Key Features
- 4 AI tools (Voice→Story, Photo→Listing, Fair Price, Story Gen)
- Story-first product pages
- Artisan marketplace + dashboard
- Fully responsive design
- Built in 24 hours!
```

### ✅ Checkpoint 8
- [ ] 3-minute demo recorded
- [ ] Vercel live link shared
- [ ] README updated
- [ ] GitHub repo public

---

## 💬 HOUR 23-24: Pitch & Submission

### 24.1 Pitch Deck (10 slides)
1. **Problem** - Artisans can't market to world
2. **Market Size** - 7M artisans, ₹3.3L Cr market
3. **Solution** - AI marketplace + tools
4. **Demo** - Show live product
5. **Artisan Empowerment** - Voice/photo tools
6. **Fair Pricing** - AI algorithm
7. **Traction** - Any early numbers/feedback
8. **Tech Stack** - Next.js, Gemini, Vercel
9. **Roadmap** - What's next
10. **Impact** - Why it matters

### 24.2 Submission Checklist
- [ ] Live demo URL (Vercel)
- [ ] GitHub repo link (public)
- [ ] Demo video (YouTube link or uploaded)
- [ ] Pitch deck (Google Slides/PDF)
- [ ] README with setup instructions
- [ ] All code well-commented
- [ ] No API keys in repo
- [ ] Environment variables documented

### 24.3 Final Polish
- [ ] No console errors
- [ ] Mobile = desktop experience
- [ ] API gracefully falls back to mocks
- [ ] Links all work
- [ ] Spelling/grammar check

---

## 🎯 Success Criteria Checklist

- ✅ All pages built and deployed
- ✅ Navigation works end-to-end
- ✅ 4 AI tools functional (demo or real)
- ✅ Mobile responsive
- ✅ Live on Vercel
- ✅ GitHub public
- ✅ 3-min demo video
- ✅ Pitch deck ready
- ✅ Clear README
- ✅ No sensitive data exposed

---

## 🐛 Emergency Fixes (If Time Running Out)

### Image Not Loading?
Replace Unsplash URLs with placeholder:
```javascript
src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e0e0e0' width='400' height='300'/%3E%3C/svg%3E"
```

### API Not Working?
- Use mock mode (hardcode mock responses)
- Note in demo: "Sample data shown"
- Still impressive functionality

### Design Looks Off?
- Simplify colors (use only 2-3)
- Remove fancy animations
- Focus on readability
- Use semantic HTML

### Can't Deploy to Vercel?
- Use GitHub Pages + static export
- Or Netlify (similar to Vercel)
- Or ship as zip file with `npm run export`

---

## 📞 Debugging Quick Reference

```bash
# Clear cache
rm -r .next node_modules
npm install
npm run dev

# Check for type errors
npx tsc --noEmit

# Format code
npx prettier --write .

# Check unused imports
npx eslint . --fix

# Test build
npm run build
npm start
```

---

**You've got this! 24 hours to change the game for Indian artisans.** 🚀

Remember: Done is better than perfect. Focus on the core experience and AI magic ✨
