import productData from "@/data/products.json";

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
  soldProducts: number;
  totalEarnings: number;
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

export type Order = {
  id: string;
  productId: string;
  productTitle: string;
  craftType: string;
  artisanId: string;
  artisanName: string;
  price: number;
  createdAt: string;
};

export const productSoldCounts: Record<string, number> = {};

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
    soldProducts: 0,
    totalEarnings: 0,
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
    soldProducts: 0,
    totalEarnings: 0,
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
    soldProducts: 0,
    totalEarnings: 0,
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
    soldProducts: 0,
    totalEarnings: 0,
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
  {
    title: "Combining Natural Dyes",
    description: "Learn to create unique color palettes using natural materials.",
    link: "https://example.com",
  },
  {
    title: "Crochet for toy creations and basic structures",
    description: "Learn the fundamentals of crochet for creating toys and simple structures.",
    link: "https://example.com",
  },
];

export const MARKETING_TUTORIALS: Tutorial[] = [
  {
    title: "Pricing Handmade Products",
    description: "Fair pricing strategies for artisans.",
    link: "https://example.com",
  },
  {
    title: "Digital Marketing 101",
    description: "Learn how to levarage digital platforms for matcketing in a short crash course.",
    link: "https://example.com",
  },
  {
    title: "Social Media for Artisans",
    description: "Create engaging content and grow your audience.",
    link: "https://example.com",
  },
];

export const products: Product[] = productData as Product[];

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

// Order management
export let orders: Order[] = [];

export function createOrder(productId: string, price: number, productName?: string, artisanName?: string): Order {
  const product = getProductById(productId);
  const artisan = artisanName 
    ? artisans.find((a) => a.name === artisanName)
    : artisans.find((a) => a.id === product?.artisanId);
  
  if (!product || !artisan) {
    throw new Error("Product or artisan not found");
  }

  const newOrder: Order = {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    productId,
    productTitle: productName || product.title,
    craftType: product.craftType,
    artisanId: artisan.id,
    artisanName: artisan.name,
    price,
    createdAt: new Date().toISOString().split("T")[0],
  };

  orders.push(newOrder);

  // Update artisan stats
  artisan.soldProducts += 1;
  artisan.totalEarnings += price;

  // Update product sold counts
  productSoldCounts[productId] = (productSoldCounts[productId] || 0) + 1;

  return newOrder;
}

export function getOrders(): Order[] {
  return orders;
}