export interface SampleListing {
  sampleImagePath: string
  craftType: string
  artisanName: string
  region: string
  productTitle: string
  productDescription: string
  tags: string[]
  materials: string[]
  careInstructions: string
  shippingNote: string
  seoKeywords: string[]
  priceRange: string
}

export const SAMPLE_LISTINGS: SampleListing[] = [
  {
    sampleImagePath: "/assets/samples/warli-1.jpeg",
    craftType: "Warli Painting",
    artisanName: "Rajan Warli",
    region: "Palghar, Maharashtra",
    productTitle: "Original Handpainted Warli Art — 12x16 inches",
    productDescription: `This original Warli painting is handcrafted by a traditional artisan from Palghar, Maharashtra. Painted using natural white pigment on a warm earthy ochre base — exactly as it has been done for over 2,500 years in the forests of Maharashtra.

Every circle, triangle and dancing human figure is painted freehand with no stencil, no guide, no machine. The scenes depicted — harvest celebrations, wedding processions, the tarpa dance — are not decoration. They are living memory, encoded in geometric form by a community that has always found beauty in the rhythms of daily life.

This is an original painting. Not a print. Not a reproduction. It was made by one pair of hands, in one sitting, carrying 2,500 years of unbroken tradition.`,
    tags: ["warli art", "tribal painting", "Maharashtra craft", "handmade wall art", "folk art India", "original painting", "GI tagged craft", "earthy decor"],
    materials: ["Natural white rice paste pigment", "Earthy ochre cotton canvas", "Bamboo brush"],
    careInstructions: "Frame under UV-protective glass. Keep away from direct sunlight and moisture. Do not fold or roll.",
    shippingNote: "Rolled in acid-free tissue, shipped in hard cardboard tube. Delivered in 5-7 business days.",
    seoKeywords: ["buy warli painting online", "original tribal art Maharashtra", "handpainted warli art India", "traditional folk wall decor"],
    priceRange: "₹1,200 – ₹8,000"
  },
  {
    sampleImagePath: "/assets/samples/madhubani-1.jpeg",
    craftType: "Madhubani Painting",
    artisanName: "Sunita Devi",
    region: "Madhubani, Bihar",
    productTitle: "Handpainted Madhubani Painting — 14x18 inches",
    productDescription: `This Madhubani painting is an original work from the Mithila region of Bihar — birthplace of a tradition over 3,000 years old. Drawn entirely by hand using natural dyes on handmade paper, every motif here carries meaning: fish for fertility, lotus for purity, peacocks for love, the sun and moon as eternal witnesses.

In Madhubani art, no space is ever left empty. Every border, every corner, every background is filled with pattern — because in the Mithila tradition, fullness is auspiciousness. This is not decorative art. It is devotional art, made by women who have carried this tradition through floods, through famines, through decades when nobody was watching.

This painting is an original. It will age beautifully. It will grow more valuable with time.`,
    tags: ["madhubani painting", "mithila art", "Bihar folk art", "natural dyes painting", "handmade India", "original artwork", "GI tagged", "mythological art"],
    materials: ["Natural vegetable dyes", "Handmade paper", "Fine nib pen and bamboo brush"],
    careInstructions: "Frame under UV-protective glass. Avoid humidity. Colors deepen with age — this is natural and beautiful.",
    shippingNote: "Packed flat between acid-free boards in rigid mailer. Delivered in 5-7 business days.",
    seoKeywords: ["buy madhubani painting online", "original mithila art Bihar", "handpainted folk art India", "traditional madhubani wall art"],
    priceRange: "₹1,500 – ₹12,000"
  },
  {
    sampleImagePath: "/assets/samples/gond-1.jpeg",
    craftType: "Gond Art",
    artisanName: "Dhruv Gond",
    region: "Mandla, Madhya Pradesh",
    productTitle: "Original Gond Tribal Painting — 12x16 inches",
    productDescription: `This Gond painting is created by an artisan from the Gondi community of Mandla, Madhya Pradesh. Every shape in this painting — the trees, the animals, the birds — is filled by hand with intricate patterns of dots, dashes and fine lines that give Gond art its unmistakable, breathing texture.

In Gond belief, every living thing holds a spirit. To paint a tiger is to honor it. To paint a tree is to remember it. This is not decorative art in the ordinary sense — it is a devotional act, a way of recording a worldview that sees humans not above nature, but woven into it.

This painting carries the forest of central India onto your wall. Hang it where you need energy, color, and a reminder that the natural world is sacred.`,
    tags: ["gond art", "tribal painting", "Madhya Pradesh craft", "dot pattern art", "nature painting India", "indigenous art", "handmade", "original artwork"],
    materials: ["Acrylic colors on canvas", "Fine detailing brushes"],
    careInstructions: "Frame under glass. Keep away from direct sunlight. Wipe frame only — do not touch the painted surface.",
    shippingNote: "Rolled in protective tissue, shipped in hard tube. Delivered in 5-7 business days.",
    seoKeywords: ["buy gond painting online", "tribal art Madhya Pradesh", "original Gondi artwork India", "handpainted nature folk art"],
    priceRange: "₹800 – ₹10,000"
  },
  {
    sampleImagePath: "/assets/samples/phulkari-1.jpeg",
    craftType: "Phulkari Embroidery",
    artisanName: "Gurpreet Kaur",
    region: "Patiala, Punjab",
    productTitle: "Handembroidered Punjab Phulkari Dupatta",
    productDescription: `This Phulkari dupatta is handembroidered by an artisan from Patiala, Punjab, using pure silk floss thread on hand-woven khadi fabric. Every geometric flower, every diamond, every border is placed stitch by stitch — no machine, no pattern sheet, no shortcut. The design lives entirely in the embroiderer's hands and memory.

Phulkari means flower work. For centuries, Punjab mothers made Phulkari for their daughters' weddings — stitching prayers into every thread over months and years. These pieces were folded into trousseau trunks as some of the most precious things a family owned.

When you wear this, you carry the unbroken line of Punjab women who kept stitching through partition, through loss, through everything. They kept going. So do we.`,
    tags: ["phulkari dupatta", "Punjab embroidery", "silk thread work", "bridal dupatta", "handembroidered", "GI tagged", "festival wear", "folk textile India"],
    materials: ["Pure silk floss thread", "Hand-woven khadi fabric", "Traditional darning stitch"],
    careInstructions: "Dry clean recommended. If hand washing, cold water with mild soap only. Do not wring. Dry flat in shade. Store in cotton cloth, never plastic.",
    shippingNote: "Folded in tissue inside cloth pouch, packed in secure box. Delivered in 5-7 business days.",
    seoKeywords: ["buy phulkari dupatta online", "handmade Punjab embroidery", "original silk phulkari", "bridal folk textile India"],
    priceRange: "₹2,000 – ₹18,000"
  },
  {
    sampleImagePath: "/assets/samples/pattachitra-1.jpeg",
    craftType: "Pattachitra",
    artisanName: "Suresh Chitrakar",
    region: "Raghurajpur, Odisha",
    productTitle: "Odisha Pattachitra Original Painting — 12x18 inches",
    productDescription: `This Pattachitra is an original painting from a Chitrakar artisan of Raghurajpur, Odisha — one of the oldest painting villages in India. The canvas is hand-prepared: layers of cloth glued with natural gum, coated with chalk and tamarind seed powder, polished smooth. Every color — red, yellow, white, black, blue — is ground from stones, conch shells, and plants. No synthetic color is used.

In Pattachitra tradition, there are no empty spaces. Every corner is filled — because emptiness is absence, and presence is devotion. The scenes depicted here come from the life of Lord Jagannath, whose temple in Puri has stood at the heart of Odisha's faith for centuries.

This painting was begun with a prayer. It ends in your hands.`,
    tags: ["pattachitra painting", "Odisha craft", "Jagannath art", "natural pigments", "Chitrakar tradition", "GI tagged", "temple art India", "original painting"],
    materials: ["Natural stone and plant pigments", "Hand-prepared cloth canvas", "Natural gum binder", "Conch shell white"],
    careInstructions: "Frame under glass. Keep away from humidity. Never roll — the cloth canvas can crack.",
    shippingNote: "Packed flat between protective boards in rigid mailer. Delivered in 5-7 business days.",
    seoKeywords: ["buy pattachitra painting", "Odisha traditional art online", "Chitrakar handmade painting", "Jagannath pattachitra original"],
    priceRange: "₹2,000 – ₹25,000"
  },
  {
    sampleImagePath: "/assets/samples/tanjore-1.jpeg",
    craftType: "Tanjore Painting",
    artisanName: "Venkatesh Sharma",
    region: "Thanjavur, Tamil Nadu",
    productTitle: "Tanjore Gold Leaf Painting — 10x12 inches",
    productDescription: `This Tanjore painting is built layer by patient layer by an artisan from Thanjavur, Tamil Nadu. Chalk relief work forms the base. Real 22-karat gold foil is applied by hand — breathing slowly, because even a breath can disturb it. Semi-precious stones are set one by one. Natural colors are built up in translucent layers with fine brushes.

The result has depth, weight, and presence that no reproduction can capture. The deity at the center has been painted this way in Thanjavur for over 1,600 years. The gold will not tarnish. The colors will not fade.

This is not a decoration. It is an heirloom. It will outlast everything else in your home.`,
    tags: ["tanjore painting", "gold leaf art", "South Indian painting", "devotional art", "Tamil Nadu craft", "GI tagged", "22k gold foil", "classical Indian art"],
    materials: ["22-karat gold foil", "Semi-precious stones", "Natural pigments", "Chalk and gum relief base", "Wooden board"],
    careInstructions: "Wipe gently with soft dry cloth only. No water or chemicals near gold foil. Keep away from moisture.",
    shippingNote: "Wrapped in bubble wrap, packed in wooden crate. Insured shipping. Delivered in 7-10 business days.",
    seoKeywords: ["buy tanjore painting online", "original gold leaf painting India", "Thanjavur painting handmade", "South Indian classical art"],
    priceRange: "₹3,500 – ₹50,000"
  },
  {
    sampleImagePath: "/assets/samples/kalamkari-1.jpeg",
    craftType: "Kalamkari",
    artisanName: "Ramaiah Reddy",
    region: "Srikalahasti, Andhra Pradesh",
    productTitle: "Hand-drawn Kalamkari Wall Hanging — 18x24 inches",
    productDescription: `This Kalamkari piece is drawn entirely by hand by an artisan from Srikalahasti, Andhra Pradesh, using a bamboo pen — the kalam — dipped in natural dyes made from plants, minerals and mordants. The process takes weeks: the fabric is treated, drawn, dyed, treated again, washed in the river, dried in the sun.

The scenes here come from the Ramayana — stories that generations of Kalamkari artists have told on cloth, sending them along trade routes to Persia, Europe, and beyond. This piece continues that 3,000-year-old tradition.

No two Kalamkari pieces are identical. The slight tremor of the hand-held pen, the soft bleed of natural indigo at the edges — these are evidence of the human hand at work, and they cannot be replicated.`,
    tags: ["kalamkari", "hand-drawn fabric", "Andhra Pradesh craft", "natural dye textile", "mythological art", "bamboo pen art", "GI tagged", "cotton wall hanging"],
    materials: ["Natural vegetable and mineral dyes", "Cotton fabric", "Bamboo kalam pen", "Mordants for color fixing"],
    careInstructions: "Hand wash separately in cold water. Dry in shade. Iron on reverse side only. Natural colors soften beautifully with washing.",
    shippingNote: "Folded in tissue, packed in cloth bag. Delivered in 5-7 business days.",
    seoKeywords: ["buy kalamkari online", "hand drawn kalamkari fabric", "Srikalahasti natural dye art", "Andhra Pradesh textile craft"],
    priceRange: "₹1,000 – ₹15,000"
  },
  {
    sampleImagePath: "/assets/samples/blue-pottery-1.jpeg",
    craftType: "Blue Pottery",
    artisanName: "Gopal Khaateek",
    region: "Jaipur, Rajasthan",
    productTitle: "Jaipur Blue Pottery Decorative Bowl",
    productDescription: `This Blue Pottery bowl is handmade in Jaipur, Rajasthan — one of the few remaining workshops keeping this 400-year-old Mughal-Persian tradition alive. Unusually, it contains no clay. The body is formed from quartz powder, glass powder and Multani mitti — a Persian recipe that arrived in India through the Mughal courts.

Shaped by hand, painted with natural cobalt blue and mineral pigments, fired at low temperature — because of its unique composition, no two pieces fire identically. The slight variations in glaze, the places where blue deepens unexpectedly — these are not flaws. They are the chemistry of the kiln signing its name.

Twenty years ago this craft was nearly extinct. A handful of Jaipur families refused to stop. This bowl is their work.`,
    tags: ["blue pottery", "Jaipur craft", "Rajasthan pottery", "quartz pottery", "GI tagged", "hand-painted ceramic", "Mughal craft", "cobalt blue decor"],
    materials: ["Quartz powder", "Glass powder", "Multani mitti", "Natural cobalt and mineral glazes"],
    careInstructions: "Hand wash only with mild soap and cold water. Do not microwave or dishwasher. Handle with care.",
    shippingNote: "Individually bubble-wrapped in double-walled box with foam inserts. Delivered in 5-7 business days.",
    seoKeywords: ["buy blue pottery Jaipur", "original Rajasthan blue pottery", "handmade quartz pottery India", "GI tagged Indian ceramic"],
    priceRange: "₹400 – ₹5,000"
  },
  {
    sampleImagePath: "/assets/samples/channapatna-1.jpeg",
    craftType: "Channapatna Toys",
    artisanName: "Manjunath B",
    region: "Channapatna, Karnataka",
    productTitle: "Channapatna Handturned Lacquered Wooden Toy Set",
    productDescription: `These Channapatna toys are turned on a hand-operated lathe by an artisan from Channapatna, Karnataka — the town known as Gombegala Ooru, the Town of Toys. The wood is hale wood, a soft odorless variety found in Karnataka that absorbs natural lacquer perfectly. Every color comes from vegetable and mineral dyes — completely non-toxic and safe for the smallest children.

The lacquerware technique was brought here over 200 years ago by craftsmen invited by Tipu Sultan. It never left. Today this town is home to thousands of craftsmen who spend their lives at the lathe, turning wood and color into things that make people smile.

Each toy was made one at a time, by one pair of hands, on one lathe. That is the only way it is made here.`,
    tags: ["channapatna toys", "Karnataka craft", "lacquered wooden toy", "GI tagged", "natural dye toy", "safe for children", "handturned wood", "Tipu Sultan craft"],
    materials: ["Hale wood (Wrightia tinctoria)", "Natural vegetable and mineral dyes", "Natural lacquer finish"],
    careInstructions: "Wipe with dry cloth only. Do not soak in water. Keep away from extreme heat. Lacquer finish is durable but avoid sharp impacts.",
    shippingNote: "Bubble-wrapped and packed securely. Delivered in 5-7 business days.",
    seoKeywords: ["buy channapatna toys online", "Karnataka lacquered wood toy", "GI tagged wooden toy India", "natural dye children toy"],
    priceRange: "₹300 – ₹3,000"
  },
  {
    sampleImagePath: "/assets/samples/kantha-1.jpeg",
    craftType: "Kantha Embroidery",
    artisanName: "Parvati Das",
    region: "Murshidabad, West Bengal",
    productTitle: "Handstitched Bengal Kantha Stole",
    productDescription: `This Kantha stole is handstitched by an artisan from Murshidabad, West Bengal, using the traditional running stitch that Bengali women have used for centuries. Every flower, every bird, every figure is drawn freehand and stitched entirely without a machine — needle moving through fabric in the rhythm that the women of Bengal have kept alive through everything.

Kantha began as an act of making do — old saris stitched together for warmth. The women who did this refused to make something merely functional. They made something beautiful. That refusal is the spirit of Kantha, and it lives in every stitch of this piece.

As they say in Bengal — every stitch is a prayer. We believe them.`,
    tags: ["kantha embroidery", "Bengal craft", "hand stitched stole", "GI tagged", "running stitch art", "sustainable textile", "handmade India", "folk embroidery"],
    materials: ["Cotton fabric", "Colored cotton thread", "Traditional kantha running stitch"],
    careInstructions: "Hand wash gently in cold water. Do not wring. Dry flat in shade. Iron on medium heat on reverse side.",
    shippingNote: "Folded in tissue, packed in cloth bag. Delivered in 5-7 business days.",
    seoKeywords: ["buy kantha embroidery online", "Bengal kantha handstitched stole", "original kantha textile India", "GI tagged West Bengal craft"],
    priceRange: "₹1,200 – ₹8,000"
  }
]

// Helper: find sample by image filename
export function getSampleByFilename(filename: string): SampleListing | null {
  return SAMPLE_LISTINGS.find(s =>
    s.sampleImagePath.includes(filename.replace(/\.(jpg|png|webp)$/, ""))
  ) ?? null
}

// Helper: find sample by craft type
export function getSampleByCraftType(craftType: string): SampleListing | null {
  const key = craftType.toLowerCase().trim()
  return SAMPLE_LISTINGS.find(s =>
    s.craftType.toLowerCase().includes(key) || key.includes(s.craftType.toLowerCase())
  ) ?? null
}

// All craft types available for dropdown
export const AVAILABLE_CRAFT_TYPES = SAMPLE_LISTINGS.map(s => s.craftType)