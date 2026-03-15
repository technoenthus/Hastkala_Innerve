export type Artisan = {
  id: string;
  name: string;
  craft: string;
  region: string;
  state: string;
  bio: string;
  story: string;
  yearsOfExperience: number;
  image: string;
  coverImage: string;
  tags: string[];
  awards?: string[];
  productIds: string[];
};

export type Product = {
  id: string;
  artisanId: string;
  title: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  region: string;
  craftType: string;
  images: string[];
  tags: string[];
  laborHours: number;
  dimensions?: string;
  weight?: string;
  inStock: boolean;
  featured: boolean;
  process: string[];
};

export type Tutorial = {
  title: string;
  description: string;
  link: string;
};

export const artisans: Artisan[] = [
  {
    id: "meera-devi",
    name: "Meera Devi",
    craft: "Madhubani Painting",
    region: "Mithila",
    state: "Bihar",
    bio: "Third-generation Madhubani artist keeping 2,500-year-old tradition alive.",
    story:
      "Meera learned to paint before she learned to write. At age six, her grandmother guided her tiny fingers across mud walls, drawing the gods of Mithila with fingers dipped in natural pigment. Today, at 47, Meera's paintings hang in galleries from Tokyo to New York — yet every morning, she sits on the floor of her village home, just as her grandmother did, and begins again. Her work is not decoration. It is memory. It is prayer.",
    yearsOfExperience: 34,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200&h=600&fit=crop",
    tags: ["Madhubani", "Natural Pigments", "Bihar", "Heritage"],
    awards: ["National Award for Master Craftsperson 2019", "Shilp Guru 2021"],
    productIds: ["madhubani-fish-pair", "madhubani-tree-of-life", "madhubani-durga"],
  },
  {
    id: "raju-kumhar",
    name: "Raju Kumhar",
    craft: "Blue Pottery",
    region: "Jaipur",
    state: "Rajasthan",
    bio: "Jaipur's finest blue pottery master, blending Persian art with Rajasthani soul.",
    story:
      "The clay speaks when Raju touches it. His family has been making blue pottery for six generations, a craft that traveled to Rajasthan from Persia through the Mughal courts and found its truest home in Jaipur's pink dust. Raju mixes his own glazes from quartz, not clay — a secret alchemy passed mouth to ear, never written. Each piece takes three firings and seven days. He makes four hundred pieces a year. He could make thousands. He chooses not to.",
    yearsOfExperience: 28,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200&h=600&fit=crop",
    tags: ["Blue Pottery", "Quartz", "Jaipur", "Mughal"],
    awards: ["State Award Rajasthan 2017"],
    productIds: ["blue-pottery-vase", "blue-pottery-plate-set", "blue-pottery-bowl"],
  },
  {
    id: "lakshmi-weaver",
    name: "Lakshmi Bai",
    craft: "Banarasi Silk Weaving",
    region: "Varanasi",
    state: "Uttar Pradesh",
    bio: "Keeper of the jacquard loom, weaving stories in gold zari on Banarasi silk.",
    story:
      "Every sari that leaves Lakshmi's loom carries a map. Not a map of roads, but of stories — of temples, of rivers, of gods dancing at the edge of lotus ponds. She weaves on a pit loom inherited from her husband's family, its wood dark and smooth from sixty years of touch. The gold thread — real zari — comes from artisans in Surat. But the pattern lives only in Lakshmi's mind. She cannot draw it. She does not need to.",
    yearsOfExperience: 22,
    image:
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=400&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=600&fit=crop",
    tags: ["Banarasi", "Silk", "Zari", "Varanasi", "GI Tag"],
    awards: ["GI Certified Weaver", "National Crafts Award 2020"],
    productIds: ["banarasi-silk-sari", "banarasi-dupatta", "banarasi-table-runner"],
  },
  {
    id: "arjun-dhokra",
    name: "Arjun Shilpakar",
    craft: "Dhokra Metal Casting",
    region: "Bastar",
    state: "Chhattisgarh",
    bio: "Continuing 4,000-year-old lost-wax casting tradition of the Bastar tribal belt.",
    story:
      "The oldest metal casting tradition in the world survives in Arjun's hands. His tribe, the Ghadwa, have been casting bronze and brass figures using the lost-wax method since before writing existed. Each figure is made once — the wax model is destroyed in the casting. There are no two alike. Arjun's workshop is the jungle floor. His furnace is a clay pot. His masterpieces sell at Christie's.",
    yearsOfExperience: 19,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=600&fit=crop",
    tags: ["Dhokra", "Lost-Wax", "Tribal", "Bastar", "Bronze"],
    productIds: ["dhokra-elephant", "dhokra-goddess", "dhokra-tribal-horse"],
  },
];

export const SKILL_TUTORIALS: Tutorial[] = [
  {
    title: "Introduction to Madhubani Painting",
    description: "Learn traditional patterns and symbolism.",
    link: "https://example.com",
  },
  {
    title: "Pottery Basics",
    description: "Clay preparation and shaping techniques.",
    link: "https://example.com",
  },
];

export const MARKETING_TUTORIALS: Tutorial[] = [
  {
    title: "Pricing Handmade Products",
    description: "Fair pricing strategies for artisans.",
    link: "https://example.com",
  },
];

export const products: Product[] = [
  {
    id: "madhubani-fish-pair",
    artisanId: "meera-devi",
    title: "Sacred Fish Pair — Madhubani on Handmade Paper",
    description:
      "A traditional Madhubani painting depicting the Matsya (fish) motif, symbol of fertility and good fortune in Mithila culture. Painted with natural pigments on handmade paper using a bamboo twig brush.",
    story:
      "In Mithila, the fish is never just a fish. It is the first avatar of Vishnu. It is the soul swimming through the waters of birth and rebirth. When a bride's family paints fish on the doorway, they are inviting prosperity into the marriage. Meera painted this pair the morning her granddaughter was born — a blessing folded into pigment, pressed into paper, sent into the world.",
    price: 4800,
    originalPrice: 6500,
    category: "Paintings",
    material: "Natural pigments, handmade paper",
    region: "Mithila, Bihar",
    craftType: "Madhubani",
    images: [
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    tags: ["Madhubani", "Fish", "Fertility", "Bihar", "Natural Pigments", "Ritual Art"],
    laborHours: 18,
    dimensions: "24 × 18 inches",
    weight: "120g",
    inStock: true,
    featured: true,
    process: [
      "Hand-ground natural pigments from turmeric, indigo, and lamp black",
      "Outline drawn freehand with bamboo twig dipped in black pigment",
      "Fill colors applied in thin washes, layer by layer",
      "Final borders drawn with traditional geometric patterns",
    ],
  },
  {
    id: "madhubani-tree-of-life",
    artisanId: "meera-devi",
    title: "Vriksha — Tree of Life, Large Format",
    description:
      "The cosmic tree connecting earth, sky, and the underworld. Birds nest in its branches, fish swim at its roots. A complete Madhubani universe in a single composition.",
    story:
      "The Vriksha Mandala is the oldest painting in Meera's family repertoire. Her great-grandmother painted it on the walls of the wedding chamber. Today Meera paints it on paper so it can travel. But the intention is unchanged: this tree is a home. Every creature that lives in it is protected.",
    price: 12500,
    category: "Paintings",
    material: "Natural pigments, handmade silk paper",
    region: "Mithila, Bihar",
    craftType: "Madhubani",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    ],
    tags: ["Madhubani", "Tree of Life", "Large Format", "Bihar"],
    laborHours: 40,
    dimensions: "36 × 48 inches",
    inStock: true,
    featured: true,
    process: [
      "Background washed with diluted cow-dung solution (traditional preparation)",
      "Composition sketched in soft charcoal",
      "Natural colors — turmeric yellow, indigo blue, pomegranate red — applied in sequence",
      "Fine line work done with single-hair brush made from mongoose hair",
    ],
  },
  {
    id: "blue-pottery-vase",
    artisanId: "raju-kumhar",
    title: "Jaipur Blue Lotus Vase",
    description:
      "Hand-thrown quartz-body vase with traditional blue floral motifs on white ground. Food-safe glaze, dishwasher safe.",
    story:
      "This vase was designed in the Mughal court of Akbar. Not this exact vase — but this pattern. The lotus, the vine, the stylized peacock feather that becomes the border. For five hundred years, the pattern has traveled, changed, survived. In Raju's version, the lotus petals have a barely-there crinkle at the edge — his own addition, made one afternoon when the kiln was slow and his mind was wandering.",
    price: 3200,
    category: "Pottery",
    material: "Quartz, glass, fuller's earth, borax",
    region: "Jaipur, Rajasthan",
    craftType: "Blue Pottery",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
    ],
    tags: ["Blue Pottery", "Vase", "Mughal", "Jaipur", "Quartz"],
    laborHours: 7,
    dimensions: "H: 22cm, D: 12cm",
    weight: "480g",
    inStock: true,
    featured: false,
    process: [
      "Body shaped from quartz paste (no clay — unique to this tradition)",
      "Air-dried for 48 hours, then bisque fired",
      "Hand-painted with cobalt oxide and copper oxide for blue and green",
      "Lead-free glaze applied and final fired at 850°C",
    ],
  },
  {
    id: "banarasi-silk-sari",
    artisanId: "lakshmi-weaver",
    title: "Kadwa Banarasi — Midnight Indigo with Gold Zari",
    description:
      "Pure Banarasi silk sari in deep midnight indigo with real gold zari brocade work. Kadwa weave technique — each motif woven individually without extra thread. GI certified.",
    story:
      "This sari took Lakshmi and her husband eleven days of continuous weaving — six hours each day, the loom clicking in its steady heartbeat rhythm. The design is called 'Meenakari' — the enameling pattern — borrowed from jewelers of old Varanasi who decorated gold with colored glass. On silk, the zari catches light the way a river catches sunset: differently at every angle.",
    price: 28000,
    originalPrice: 35000,
    category: "Textiles",
    material: "Pure Banarasi silk, real gold zari",
    region: "Varanasi, Uttar Pradesh",
    craftType: "Banarasi Weaving",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop",
    ],
    tags: ["Banarasi", "Silk", "Zari", "GI Certified", "Bridal", "Varanasi"],
    laborHours: 66,
    dimensions: "6.3 meters × 120cm",
    weight: "780g",
    inStock: true,
    featured: true,
    process: [
      "Pure silk yarn degummed and dyed with natural azo-free dyes",
      "Design punched on Jacquard cards — 600+ cards for a single sari",
      "Woven on traditional pit loom with shuttle thrown by hand",
      "Gold zari (real gold wire wrapped around silk core) woven simultaneously",
      "Quality check: 27-point inspection by master weaver",
    ],
  },
  {
    id: "dhokra-elephant",
    artisanId: "arjun-dhokra",
    title: "Gaja — Dhokra Bronze Elephant",
    description:
      "Lost-wax cast bronze elephant in classic Bastar tribal style. Each piece is unique — the wax original is destroyed in casting, making every sculpture one-of-a-kind.",
    story:
      "The elephant appears in every culture that has ever seen one. In Bastar's Dhokra tradition, Gaja is neither regal nor wild — it is simply present, patient, carrying the world on its broad back. Arjun's elephant has a slight lean to its head that was never planned. It happened when the wax softened in the midday heat. He kept it. The imperfection made it alive.",
    price: 8500,
    category: "Sculptures",
    material: "Bronze (copper-tin alloy), natural beeswax",
    region: "Bastar, Chhattisgarh",
    craftType: "Dhokra",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop",
    ],
    tags: ["Dhokra", "Bronze", "Elephant", "Tribal", "One-of-a-Kind", "Lost-Wax"],
    laborHours: 14,
    dimensions: "H: 15cm, L: 18cm",
    weight: "1.2kg",
    inStock: true,
    featured: true,
    process: [
      "Core modeled from rice husk mixed with river clay",
      "Wax overlay sculpted by hand — all surface details added at this stage",
      "Clay outer mold applied in three layers, sun-dried over two days",
      "Wax melted out by heat (the 'lost wax'), molten bronze poured in",
      "Mold broken open, piece cleaned with wire brush and acid wash",
    ],
  },
  {
    id: "dhokra-goddess",
    artisanId: "arjun-dhokra",
    title: "Danteshwari — Tribal Goddess in Bronze",
    description:
      "Patron goddess of Bastar, cast in pure bronze using ancient Dhokra technique. Standing figure with characteristic tribal detailing — spiral armlets, elaborate crown.",
    story:
      "Danteshwari is the mother of Bastar. When the tribal people were displaced, scattered, confused — they carried her with them. Arjun's grandmother kept a small Danteshwari figure through three famines and two floods. This casting is modeled on that very figure, worn smooth by decades of daily prayer.",
    price: 15500,
    category: "Sculptures",
    material: "Bronze alloy, beeswax",
    region: "Bastar, Chhattisgarh",
    craftType: "Dhokra",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop",
    ],
    tags: ["Dhokra", "Goddess", "Tribal", "One-of-a-Kind", "Sacred"],
    laborHours: 22,
    dimensions: "H: 28cm",
    weight: "2.1kg",
    inStock: true,
    featured: false,
    process: [
      "Sacred figure requires artisan to fast for one day before beginning",
      "Wax sourced from forest beehives, never commercial",
      "Face modeled last — the most sacred part",
      "Consecrated with smoke from sacred wood before delivery",
    ],
  },
];

export const categories = [
  "All",
  "Paintings",
  "Pottery",
  "Textiles",
  "Sculptures",
  "Jewelry",
  "Woodwork",
];

export const regions = [
  "All India",
  "Bihar",
  "Rajasthan",
  "Uttar Pradesh",
  "Chhattisgarh",
  "West Bengal",
  "Gujarat",
  "Odisha",
];

export const craftTypes = [
  "All Crafts",
  "Madhubani",
  "Blue Pottery",
  "Banarasi Weaving",
  "Dhokra",
  "Warli",
  "Pattachitra",
  "Kantha",
  "Phulkari",
];

export function getArtisanById(id: string) {
  return artisans.find((a) => a.id === id);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByArtisan(artisanId: string) {
  return products.filter((p) => p.artisanId === artisanId);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
