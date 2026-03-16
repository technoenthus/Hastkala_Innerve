export interface CraftEntry {
  name: string
  state: string
  region: string
  gi_tag: string
  gi_registered: boolean
  age: string
  community: string
  materials: string[]
  colors: string
  cultural_story: string
  listing_keywords: string[]
  price_range: string
  typical_products: string[]
}

export const CRAFTS_DATABASE: Record<string, CraftEntry> = {
  "Warli painting": {
    name: "Warli Art", state: "Maharashtra", region: "Palghar district, Maharashtra",
    gi_tag: "GI Tag #15", gi_registered: true, age: "2500+ years",
    community: "Warli tribal community",
    materials: ["rice paste", "bamboo sticks", "mud walls", "natural pigments"],
    colors: "White geometric figures on red/ochre background",
    cultural_story: "Warli art is a tribal tradition over 2,500 years old from Maharashtra. Using circles, triangles and squares, artists depict daily life, harvests and ceremonies. Traditionally painted by women on mud walls during weddings and festivals.",
    listing_keywords: ["tribal art", "geometric painting", "Maharashtra craft", "folk art", "handmade", "wall art"],
    price_range: "₹500 – ₹15,000",
    typical_products: ["canvas paintings", "wall art", "sarees", "pottery"]
  },
  "Madhubani painting": {
    name: "Madhubani Painting", state: "Bihar", region: "Mithila region, Bihar",
    gi_tag: "GI Tag #40", gi_registered: true, age: "3000+ years",
    community: "Mithila women, Bihar",
    materials: ["natural dyes", "nib pens", "fingers", "twigs", "paper", "cloth"],
    colors: "Bright reds, yellows, greens, blues on white — no empty spaces",
    cultural_story: "Madhubani painting from Bihar's Mithila region is over 3,000 years old, first mentioned in the Ramayana. Traditionally painted by women during festivals and weddings, it features mythological scenes with vibrant colors and intricate geometric borders.",
    listing_keywords: ["Mithila art", "Bihar folk art", "traditional painting", "mythological art", "handmade", "vibrant"],
    price_range: "₹800 – ₹50,000",
    typical_products: ["paper paintings", "canvas art", "sarees", "wall hangings"]
  },
  "Gond art": {
    name: "Gond Art", state: "Madhya Pradesh", region: "Mandla, Dindori, Madhya Pradesh",
    gi_tag: "GI recognition pending", gi_registered: false, age: "1400+ years",
    community: "Gondi tribal people, Madhya Pradesh",
    materials: ["natural colors", "acrylic paints", "canvas", "paper"],
    colors: "Bright contrasting dots and lines on dark base — red, yellow, blue, white",
    cultural_story: "Gond art from central India is recognized by intricate patterns of dots and lines filling every element. Created by the Gondi people, these paintings depict animals, trees and birds believed to bring good luck, with each shape filled by detailed texture rather than solid color.",
    listing_keywords: ["tribal art", "Gond painting", "Madhya Pradesh craft", "dot art", "nature art", "indigenous"],
    price_range: "₹600 – ₹20,000",
    typical_products: ["paintings", "prints", "canvas art", "wall decor"]
  },
  "Kalamkari textile": {
    name: "Kalamkari", state: "Andhra Pradesh", region: "Srikalahasti & Machilipatnam, Andhra Pradesh",
    gi_tag: "GI Tag #44 & #45", gi_registered: true, age: "3000+ years",
    community: "Kalakar artists, Andhra Pradesh",
    materials: ["natural dyes", "bamboo pen (kalam)", "cotton fabric", "mordants"],
    colors: "Earthy tones — indigo, red, black, yellow, green from natural dyes",
    cultural_story: "Kalamkari meaning 'pen work' is an ancient hand-painted textile art from Andhra Pradesh over 3,000 years old. Using a bamboo pen and natural dyes, artists draw mythological narratives from the Ramayana and Mahabharata on cotton fabric.",
    listing_keywords: ["hand-painted fabric", "Andhra craft", "natural dyes", "mythological art", "cotton textile", "GI tagged"],
    price_range: "₹500 – ₹25,000",
    typical_products: ["sarees", "dupattas", "wall hangings", "kurtas", "home decor"]
  },
  "Pattachitra painting": {
    name: "Pattachitra", state: "Odisha", region: "Puri & Raghurajpur, Odisha",
    gi_tag: "GI Tag #139", gi_registered: true, age: "5000+ years",
    community: "Chitrakar artisan community, Odisha",
    materials: ["natural colors", "cloth canvas", "natural gum", "conch shell powder"],
    colors: "Red, yellow, white, black, blue — all natural, no metallic shades",
    cultural_story: "Pattachitra, meaning 'cloth picture', is one of India's oldest painting traditions at over 5,000 years old. Associated with Puri's Jagannath temple, these paintings use only natural colors derived from stones and plants to depict Hindu mythology with fine line work.",
    listing_keywords: ["Odisha craft", "temple art", "Jagannath", "natural colors", "traditional painting", "GI tagged"],
    price_range: "₹1,000 – ₹1,00,000",
    typical_products: ["cloth paintings", "palm leaf art", "wall hangings", "lamp shades"]
  },
  "Tanjore painting": {
    name: "Tanjore Painting", state: "Tamil Nadu", region: "Thanjavur, Tamil Nadu",
    gi_tag: "GI Tag #64", gi_registered: true, age: "1600+ years",
    community: "Tanjore artists, Tamil Nadu",
    materials: ["gold foil", "precious stones", "wood base", "natural colors"],
    colors: "Rich jewel tones with gold foil embellishment on devotional subjects",
    cultural_story: "Tanjore painting is a classical South Indian art form from Thanjavur, Tamil Nadu, over 1,600 years old. Distinguished by rich colors, gold foil work and embedded semi-precious stones, these paintings predominantly depict Hindu deities with intricate detail.",
    listing_keywords: ["South Indian art", "gold foil painting", "devotional art", "Tamil Nadu craft", "classical art", "GI tagged"],
    price_range: "₹2,000 – ₹2,00,000",
    typical_products: ["framed paintings", "wall art", "deity portraits", "gifts"]
  },
  "Phulkari embroidery": {
    name: "Phulkari Embroidery", state: "Punjab", region: "Punjab",
    gi_tag: "GI Tag — Punjab Phulkari", gi_registered: true, age: "500+ years",
    community: "Women of Punjab",
    materials: ["silk floss thread", "khadi fabric", "cotton base"],
    colors: "Vibrant geometric floral patterns — red, orange, yellow on dark fabric",
    cultural_story: "Phulkari meaning 'flower work' is a centuries-old embroidery tradition from Punjab. Traditionally crafted by women as bridal trousseau pieces, the darning stitch creates geometric floral patterns that cover the fabric completely in festival shawls called bagh.",
    listing_keywords: ["Punjab craft", "embroidery", "bridal wear", "floral work", "handmade", "festival wear"],
    price_range: "₹1,500 – ₹30,000",
    typical_products: ["dupattas", "shawls", "sarees", "wall hangings", "blouses"]
  },
  "Bidriware": {
    name: "Bidriware", state: "Karnataka", region: "Bidar, Karnataka",
    gi_tag: "GI Tag #55", gi_registered: true, age: "600+ years",
    community: "Bidri artisans, Bidar",
    materials: ["zinc alloy", "silver wire", "copper inlay", "soil from Bidar fort"],
    colors: "Silver/gold inlay on matte black zinc — no paint used",
    cultural_story: "Bidriware from Bidar, Karnataka is a 600-year-old craft of inlaying silver and gold into a black zinc-copper alloy. Developed under the Bahmani Sultanate with Persian influence, the signature black finish is achieved using soil from Bidar fort, unique to this craft worldwide.",
    listing_keywords: ["metal craft", "silver inlay", "Karnataka craft", "Bidriware", "luxury craft", "GI tagged"],
    price_range: "₹800 – ₹50,000",
    typical_products: ["vases", "bowls", "jewelry", "decorative items", "trays"]
  },
  "Blue Pottery": {
    name: "Blue Pottery", state: "Rajasthan", region: "Jaipur, Rajasthan",
    gi_tag: "GI Tag — Jaipur Blue Pottery", gi_registered: true, age: "400+ years",
    community: "Kashi artisans, Jaipur",
    materials: ["quartz powder", "glass powder", "Multani mitti", "no clay used"],
    colors: "Cobalt blue and white with floral motifs — Persian-Mughal influence",
    cultural_story: "Jaipur Blue Pottery is unique in the world — made without clay, using quartz powder and glass, making it non-porous and durable. Brought to Rajasthan from Persia via Afghanistan, the vivid cobalt blue glaze and floral patterns make each piece distinctly recognizable.",
    listing_keywords: ["Jaipur craft", "blue pottery", "quartz pottery", "Rajasthan art", "hand-painted", "GI tagged"],
    price_range: "₹300 – ₹10,000",
    typical_products: ["tiles", "bowls", "vases", "plates", "decorative items"]
  },
  "Pashmina shawl": {
    name: "Pashmina", state: "Jammu & Kashmir", region: "Kashmir Valley",
    gi_tag: "GI Tag — Kashmir Pashmina", gi_registered: true, age: "3000+ years",
    community: "Kashmiri weavers",
    materials: ["Changthangi goat underfur", "hand-spun yarn", "hand-loom"],
    colors: "Natural ivory, deep reds, saffron — with intricate Kani or Sozni embroidery",
    cultural_story: "Kashmir Pashmina is woven from the ultra-fine underfur of the Changthangi goat found at 14,000 feet in Ladakh. One shawl can take 3-6 months to hand-weave and uses wool so fine it passes through a finger ring — earning the name 'ring shawl'.",
    listing_keywords: ["Kashmir craft", "Pashmina", "luxury shawl", "hand-woven", "natural fiber", "GI tagged"],
    price_range: "₹5,000 – ₹5,00,000",
    typical_products: ["shawls", "stoles", "wraps", "scarves"]
  },
  "Dhokra craft": {
    name: "Dhokra Metal Craft", state: "West Bengal / Chhattisgarh",
    region: "Bankura, West Bengal & Bastar, Chhattisgarh",
    gi_tag: "GI recognition pending", gi_registered: false, age: "4000+ years",
    community: "Dhokra Damar tribes",
    materials: ["brass", "bronze", "beeswax", "clay", "lost-wax casting"],
    colors: "Warm golden brass finish — no paint, natural metal color",
    cultural_story: "Dhokra is one of the world's oldest non-ferrous metal casting traditions at 4,000+ years old, using the lost-wax technique. The Dhokra Damar tribes create tribal figurines, animals and utility objects — each piece is unique as the wax mold is destroyed in the process.",
    listing_keywords: ["lost-wax casting", "tribal metal craft", "brass figurine", "ancient craft", "handmade", "Bastar art"],
    price_range: "₹500 – ₹25,000",
    typical_products: ["figurines", "lamps", "jewelry", "decorative items", "animals"]
  },
  "Channapatna toys": {
    name: "Channapatna Toys", state: "Karnataka", region: "Channapatna, Karnataka",
    gi_tag: "GI Tag — Channapatna Toys", gi_registered: true, age: "200+ years",
    community: "Ivory craftsmen, Channapatna",
    materials: ["hale wood (Wrightia tinctoria)", "natural dyes", "lacquer"],
    colors: "Bright primary colors using vegetable and mineral dyes — non-toxic",
    cultural_story: "Channapatna toys from Karnataka, known as 'Gombegala Ooru' (Town of Toys), have been crafted for over 200 years using a special soft wood and non-toxic lacquer. Tipu Sultan invited Persian craftsmen to teach the lacquerware technique, creating this unique Indian craft tradition.",
    listing_keywords: ["wooden toys", "Karnataka craft", "lacquerware", "natural dyes", "children toys", "GI tagged"],
    price_range: "₹200 – ₹5,000",
    typical_products: ["toys", "dolls", "decorative items", "jewelry", "key chains"]
  },
  "Kantha embroidery": {
    name: "Kantha Embroidery", state: "West Bengal", region: "West Bengal & Bangladesh border region",
    gi_tag: "GI Tag — West Bengal Kantha", gi_registered: true, age: "500+ years",
    community: "Women of rural Bengal",
    materials: ["recycled cotton saris", "silk thread", "running stitch"],
    colors: "Colorful thread on white/off-white recycled fabric — dense floral and narrative patterns",
    cultural_story: "Kantha is a centuries-old embroidery from West Bengal, traditionally made by women using recycled old saris stitched together and embroidered with a simple running stitch. What began as quilts for the poor became an art form depicting nature, mythology and daily life.",
    listing_keywords: ["Bengal craft", "embroidery", "sustainable craft", "recycled fabric", "hand-stitched", "GI tagged"],
    price_range: "₹800 – ₹20,000",
    typical_products: ["sarees", "dupattas", "quilts", "kurtis", "wall hangings"]
  },
  "Phad painting": {
    name: "Phad Painting", state: "Rajasthan", region: "Bhilwara & Shahpura, Rajasthan",
    gi_tag: "GI Tag — Phad Painting", gi_registered: true, age: "700+ years",
    community: "Joshi family of painters, Rajasthan",
    materials: ["cloth canvas (phad)", "natural vegetable dyes", "squirrel hair brush"],
    colors: "Flat bright colors — yellow, red, green, blue — no shading",
    cultural_story: "Phad is a scroll painting tradition from Rajasthan over 700 years old, traditionally used as a portable temple by Bhopa priest-singers who use the scroll as a backdrop while singing folk epics of local deities Pabuji and Devnarayan.",
    listing_keywords: ["Rajasthan scroll art", "folk painting", "narrative art", "natural dyes", "Phad", "GI tagged"],
    price_range: "₹2,000 – ₹1,00,000",
    typical_products: ["scroll paintings", "wall hangings", "framed art", "canvas prints"]
  },
  "Kondapalli toys": {
    name: "Kondapalli Toys", state: "Andhra Pradesh", region: "Kondapalli village, Andhra Pradesh",
    gi_tag: "GI Tag — Kondapalli Toys", gi_registered: true, age: "400+ years",
    community: "Aryakshatriya craftsmen, Kondapalli",
    materials: ["tella poniki wood", "sawdust paste", "natural dyes", "lacquer"],
    colors: "Vivid primary colors on natural wood — mythological and village scenes",
    cultural_story: "Kondapalli toys from Andhra Pradesh are 400-year-old hand-carved wooden figurines made from a special soft tella poniki wood found only near Kondapalli. Depicting mythological characters, village scenes and animals, each toy is assembled from multiple carved pieces joined with sawdust paste.",
    listing_keywords: ["wooden toys", "Andhra Pradesh craft", "hand-carved", "mythological figurines", "GI tagged", "traditional toys"],
    price_range: "₹300 – ₹8,000",
    typical_products: ["toys", "figurines", "decorative sets", "nativity scenes", "animals"]
  }
}
