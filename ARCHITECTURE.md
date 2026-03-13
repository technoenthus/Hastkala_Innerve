# HASTAKALA System Architecture & Design Document

## 🏗️ System Overview

HASTAKALA is a **three-layer AI-powered marketplace** built for hackathon rapid deployment:

```
┌─────────────────────────────────────────────────────────────┐
│              Web Frontend (Next.js 14)                       │
│  - Home, Explore, Product detail, Artisan profiles          │
│  - Dashboard for artisans                                    │
│  - Interactive AI tool demos                                │
└──────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │                                        │
┌───────▼──────────────────────────┐  ┌────────▼──────────────────────┐
│   API Layer (Next.js Routes)      │  │  Client-Side Features         │
│ ┌────────────────────────────────┐│  │ ┌──────────────────────────┐  │
│ │ /api/voice-to-story            ││  │ │ Speech Recognition (Web) │  │
│ │ /api/photo-to-listing          ││  │ │ Image Upload & Preview   │  │
│ │ /api/fair-price                ││  │ │ Form State Management    │  │
│ │ /api/generate-story            ││  │ │ Loading states           │  │
│ └────────────────────────────────┘│  │ └──────────────────────────┘  │
└────────────┬──────────────────────┘  └────────────────────────────────┘
             │
    ┌────────▼──────────┐
    │  Google Gemini    │
    │  1.5 API          │
    │ ┌────────────────┐│
    │ │ Text gen       ││
    │ │ Vision/Image   ││
    │ │ Code gen       ││
    │ └────────────────┘│
    └───────────────────┘
```

---

## 📐 Component Architecture

### Page Layer

```
Home (/)
├── Hero section (story-driven)
├── Feature showcase (4 AI tools)
├── Featured products grid
├── Featured artisans
└── Call-to-action cards

Explore (/explore)
├── Search bar
├── Filter panel (category, region, craft, price)
├── Masonry product grid
└── No-results state

Product Detail (/product/[id])
├── Gallery + zoom
├── Story section (editorial)
├── Product specs
├── Artisan card (clickthrough)
├── Craft process (numbered steps)
├── Authenticity badges
└── Related products

Artisan Profile (/artisan/[id])
├── Cover image
├── Profile section
├── Story narrative
├── Stats (experience, location)
├── Awards section
├── Product grid (their works)
└── CTA to marketplace

Artisan Dashboard (/dashboard)
├── Welcome + stats
├── AI quick actions
├── My products list
├── Upload new product flow
└── Settings

AI Tools (/ai-tools)
├── Tool selector tabs
├── Interactive demos
│   ├── Voice to Story
│   ├── Photo to Listing
│   ├── Fair Price Calculator
│   └── Story Generator
└── API documentation
```

### Component Tree

```
Layout
├── Navigation
│   ├── Logo
│   ├── Nav Links
│   └── Mobile Menu
├── Main Content (Page Router)
│   └── Page-specific components
└── Footer
    ├── Brand section
    ├── Discovery links
    ├── Platform links
    └── Meta

ProductCard (reusable)
├── Image container
├── Overlay badges
├── Info section
└── Hover states

ArtisanCard (reusable)
├── Cover image
├── Avatar (overlap)
├── Info section
└── Awards badge
```

---

## 🗄️ Data Models & State

### Artisan Model
```typescript
interface Artisan {
  id: string;                    // Unique ID (slug)
  name: string;
  craft: string;                 // e.g., "Madhubani Painting"
  region: string;                // e.g., "Mithila"
  state: string;                 // e.g., "Bihar"
  bio: string;                   // Short 1-liner
  story: string;                 // Long narrative (2-3 paragraphs)
  yearsOfExperience: number;
  image: string;                 // Avatar URL
  coverImage: string;            // Hero image URL
  tags: string[];                // Craft tradition tags
  awards?: string[];             // List of recognitions
  productIds: string[];          // References to products
}
```

### Product Model
```typescript
interface Product {
  id: string;                    // Unique ID (slug)
  artisanId: string;             // FK → Artisan
  title: string;                 // Max 60 chars, SEO-friendly
  description: string;           // 80-200 words, AI-generated
  story: string;                 // Emotional narrative for page
  price: number;                 // In INR
  originalPrice?: number;        // For discounts
  category: string;              // e.g., "Paintings"
  material: string;              // e.g., "Natural pigments"
  region: string;                // Geographic origin
  craftType: string;             // e.g., "Madhubani"
  images: string[];              // Array of Image URLs
  tags: string[];                // 6+ searchable tags
  laborHours: number;            // For fair price display
  dimensions?: string;           // e.g., "24 × 18 inches"
  weight?: string;               // e.g., "120g"
  inStock: boolean;              // Availability
  featured: boolean;             // Show on homepage?
  process: string[];             // Step-by-step making process
}
```

### UI State Example (Dashboard)
```typescript
interface DashboardState {
  activeTab: 'overview' | 'upload' | 'ai' | 'settings';
  isLoading: boolean;
  selectedProduct?: Product;
  formData: {
    title: string;
    description: string;
    price: number;
    images: File[];
  };
}
```

---

## 🤖 AI Integration Architecture

### Vector Flow: Voice to Story

```
Artisan speaks → Browser Audio API → Transcription
        ↓
   Raw text → POST /api/voice-to-story
        ↓
   Gemini Receives: artisanName + craft + region + transcript
        ↓
   Gemini Prompt: "Transform this into 3 marketing outputs"
        ↓
   Gemini Returns:
   ├── Story (2-3 para, first person)
   ├── Product Description (80-120 words)
   └── Marketing Caption (Instagram-ready)
        ↓
   Frontend renders with mock fallback if API key missing
```

### Vector Flow: Photo to Listing

```
Artisan uploads photo → Browser FileReader → Base64 encoding
        ↓
   Base64 image → POST /api/photo-to-listing
        ↓
   Gemini Receives: Image + Craft context
        ↓
   Gemini Vision analyzes:
   ├── Item type
   ├── Materials visible
   ├── Color palette
   └── Craft tradition markers
        ↓
   Gemini Generates:
   ├── Product title (5-10 words)
   ├── Description (80-120 words)
   ├── 6+ relevant tags
   ├── Category suggestion
   └── Materials list
        ↓
   Frontend displays in form for artisan to review/edit
```

### Fair Price Calculation

```
Artisan inputs:
├── Material cost (₹)
├── Labor hours
├── Craft rarity (common/rare/endangered)
└── GI tag (yes/no)
        ↓
POST /api/fair-price
        ↓
Algorithm:
├── Base labor rate = 200-350 ₹/hour (by rarity)
│   └── endangered: 350, rare: 280, common: 200
├── Labor cost = hours × rate
├── Craft premium = 30% of material cost (if GI-tagged)
├── Subtotal = materials + labor + premium
├── Platform fee = 15% of subtotal
└── Suggested price = subtotal + fee
        ↓
Returns breakdown + reasoning + market comparison
```

### Emotional Story Generation

```
Product details → POST /api/generate-story
        ↓
Gemini Prompt: "Write 2-paragraph story from buyer's POV"
        ↓
Gemini considers:
├── Artisan background
├── Material sourcing story
├── Craft process
├── Regional cultural context
└── Impact of purchase on artisan
        ↓
Returns: Emotional narrative (150-200 words, italicized on page)
```

---

## 🔄 User Flows

### Flow 1: First-time Buyer

```
1. Land on Home (/) 
   → Hero captures attention
   → Scroll through featured crafts
   
2. Click "Explore Crafts"
   → See masonry grid
   → Filter by region/craft/price
   
3. Click product
   → Read full story
   → See artisan info
   → Click "Add to Cart"
   
4. View artisan profile
   → Learn their tradition
   → See awards
   → Browse other works
```

### Flow 2: Returning Buyer

```
1. Home page
   → New products section
   → Personalized recommendations
   
2. Wishlist/Cart
   → Review saved items
   → Checkout
```

### Flow 3: Artisan Onboarding

```
1. Visit /dashboard
2. Welcome screen
3. Choose action:
   a) Record voice → Voice to Story AI
   b) Upload photo → Photo to Listing AI
   c) Manual pricing → Fair Price Calculator
   
4. Review AI outputs
5. Edit & customize
6. Publish product
7. See stats in dashboard
```

### Flow 4: AI Tool Usage (Standalone)

```
1. Visit /ai-tools
2. Switch between 4 tools
3. Each has live demo
4. Can test without API key (mock responses)
5. See pricing breakdown
6. Copy/paste results
```

---

## 🎨 Design System Implementation

### Color Usage by Component

| Component | Primary | Secondary | Background |
|-----------|---------|-----------|------------|
| Hero/Header | Deep Indigo | Gold | — |
| Cards | White | Terracotta | Cream |
| Buttons (CTA) | Indigo/Terra | Gold | — |
| Tags/Badges | Indigo | Terra | Cream |
| Alerts | Green/Red/Gold | — | Soft BG |
| Text | Ink (#1a1612) | Ink/50 | — |

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Typography Hierarchy

```
Hero Title (H1)     → Serif 56-80px   | Bold     | Iterative
Section Title (H2)  → Serif 32-48px   | Bold 600 | Regular
Card Title (H3)     → Serif 20-24px   | Medium   | Regular
Button/Nav (Body)   → Sans 14-16px    | Medium   | Regular
Meta/Helper (Small) → Sans 12px       | Regular  | Gray
```

---

## ⚙️ Technical Implementation

### Next.js App Router Structure

```
Each page folder has:
├── page.tsx         (Main component)
├── layout.tsx       (optional - nested layouts)
└── error.tsx        (optional - boundary)

API routes:
├── route.ts         (handles POST/GET)
```

### Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| next | Framework | 14.2.5 |
| react | UI library | 18+ |
| tailwindcss | Styling | 3.4.1 |
| @google/generative-ai | Gemini API | 0.21.0 |
| lucide-react | Icons | 0.446.0 |
| framer-motion | Animations | 11.3.19 |

### Image Optimization

- Next.js `Image` component (auto resize/format)
- Unsplash for demo images (free, fast CDN)
- srcSet for responsive images
- Lazy loading on scroll
- WebP format where supported

### SEO Strategy

- Meta tags in `layout.tsx`
- Open Graph for social sharing
- Semantic HTML (heading hierarchy)
- Dynamic meta based on product/artisan data
- Sitemap generation (optional)

---

## 🔐 Security & Performance

### Security Notes
- No user authentication in MVP (stateless)
- API key stored in `.env.local` (NOT committed)
- CORS handling (API routes same-origin)
- Input validation on all API endpoints
- Rate limiting on Gemini API calls

### Performance Optimizations
- Static HTML generation (ISR with fallback)
- Image optimization (Next.js Image)
- CSS-in-JS with Tailwind (tree-shaking)
- Code splitting per route
- Service Worker support (optional PWA)

### Caching Strategy
- Browser cache: Images (1 year), CSS (1 month)
- API responses: Cache control headers
- Gemini API: No caching (always fresh)

---

## 🚀 Deployment Architecture

### Vercel (Recommended for Hackathon)

```
Git Push → Vercel detects Next.js
        → Automatic build
        → Deploy to CDN
        → Environment vars: GEMINI_API_KEY
        → Custom domain (optional)
```

### Alternative: Docker + Cloud

```
Dockerfile → Build image
          → Push to registry
          → Cloud Run / Heroku / Render
          → Environment: PORT=3000
```

---

## 📊 Analytics (Optional)

```javascript
// lib/analytics.ts
export function trackProductView(productId: string) {
  // Google Analytics / Mixpanel / Plausible
}

export function trackAIToolUsage(tool: string) {
  // Track which AI features are used
}
```

---

## 🔄 Future Extensions

### Phase 2 (Post-hackathon)
- User authentication (Google/GitHub)
- Shopping cart + checkout
- Payment gateway (Razorpay)
- Wishlist & favorites
- User reviews & ratings
- Email notifications

### Phase 3
- Artisan inventory management
- Order fulfillment dashboard
- Shipping integration
- Analytics for artisans
- Performance recommendations

### Phase 4
- Mobile app (React Native)
- Video integration
- Live sessions with artisans
- Community features
- NFT certificates

---

## 📝 File-by-File Breakdown

### `lib/data.ts` (Mock Data)
- 4 sample artisans
- 6 sample products
- Category/region enums
- Helper functions (getArtisanById, etc.)

### `lib/gemini.ts` (AI Integration)
- `generateCraftStory()` - Voice→Story
- `generateListingFromPhoto()` - Photo→Listing
- `calculateFairPrice()` - Price calculation
- `generateEmotionalProductStory()` - Product narrative
- Mock fallbacks for all features

### `app/globals.css` (Design System)
- Color variables
- Font imports (Google Fonts)
- Utility classes (masonry grid, animations, etc.)
- Custom scrollbar, selection colors
- Gradient & overlay utilities

### `components/Navigation.tsx`
- Fixed header with logo
- Desktop/mobile nav
- CTA button for artisan portal
- Mobile hamburger toggle
- Sticky with blur effect

### `components/Footer.tsx`
- 4-column layout
- Brand story
- Link categories
- API status indicator
- Copyright

### `app/page.tsx` (Home)
- Hero with background images
- Stats section
- 4 AI feature cards
- Featured products section
- Featured artisans section
- Pull quote
- Dual CTAs (buyer vs. artisan)

### `app/explore/page.tsx` (Catalog)
- Search bar with icon
- Filter panel (collapsible)
- Masonry grid display
- No-results state
- Filter state management

---

## 💡 Design Thinking Notes

### Problem: Digital Barrier
Artisans have skill, not English. Marketing, not code.

### Solution: AI as Translator
- Voice→ Marketing copy
- Photo→ Listing
- Details→ Fair price
- Stats→ Analytics

### UX Principle
Every page should feel like a premium magazine, not a transaction portal.

### Cultural Sensitivity
- Respect traditions (ask permission to tell stories)
- No stereotyping ("mystical" vs. "master")
- Celebrate skill, not poverty
- Show artisan agency (they own their narrative)

---

## 🎯 Hackathon Success Criteria

- ✅ All pages functional
- ✅ AI tools wired (mock or real)
- ✅ Mobile responsive
- ✅ Deployed & shareable link
- ✅ 3-minute demo video
- ✅ Pitch deck highlighting:
  - Problem statement
  - AI solution
  - Social impact
  - Technical implementation
  - Path to monetization

---

**This architecture enables a complete, production-ready MVP in 24 hours.**
