
export interface CraftStory {
  productTitle: string
  productDescription: string
  craftStory: string
}

export const CRAFT_STORIES_DB: Record<string, CraftStory> = {
  "warli": {
    productTitle: "Handpainted Warli Art by {name}",
    productDescription: "This piece of Warli art is painted by hand using natural white pigment on a warm earthy base — just as it has been done for over 2,500 years in the forests of Maharashtra. Every circle, every triangle, every tiny human figure is placed with intention. The dancing figures, the harvest scenes, the wedding processions — they are not decoration. They are memory. Each stroke carries the quiet rhythm of a community that has always found beauty in the ordinary moments of life.",
    craftStory: "My name is {name}, and I learned to paint Warli on the walls of our home as a child in {region}. My mother's hand guided mine before I could write my own name. Warli is not just art — it is how our community has recorded its joys, its prayers, its harvests for generations. When you hold this piece, you are holding a story that was never written in books — only on walls, on cloth, and now, in your hands. Please keep it with love."
  },
  "madhubani": {
    productTitle: "Madhubani Painting Handcrafted by {name}",
    productDescription: "This Madhubani painting is drawn entirely by hand using natural dyes and fine brushwork on handmade paper. No two pieces are ever the same — the slight variations in line, the places where color deepens or softens, are the fingerprints of the artist. The motifs — fish for fertility, lotus for purity, peacocks for love — have been passed down through the women of Mithila for over 3,000 years. This is not mass-produced art. This is a conversation between an artisan and a tradition older than most nations.",
    craftStory: "I am {name} from {region}, and Madhubani painting was the first language I learned before Hindi, before English. My grandmother painted at dawn before the house woke up — I would sit beside her and watch the gods appear from her fingers. When I paint, I feel her beside me still. Mithila women carried this art through famines, through floods, through decades when nobody cared. It survived because we refused to let it die. Every painting I make is my way of saying — we are still here."
  },
  "gond": {
    productTitle: "Gond Tribal Painting by {name}",
    productDescription: "This Gond painting is filled entirely by hand — every shape packed with tiny dots, dashes and patterns that give the artwork its unmistakable breathing texture. The trees, animals and birds depicted here are not just images — in Gond belief, everything in nature holds a spirit, and to paint it is to honor it. Made using natural and earth-based colors on canvas, this piece carries the forest worldview of the Gondi people of central India — a worldview that sees humans not above nature, but woven into it.",
    craftStory: "My name is {name} and I am from the Gondi community in {region}. We have painted our world for over a thousand years — not to sell, but to remember who we are. The tiger in my paintings is not just an animal. The tree is not just a tree. Everything is alive, everything is connected — that is what Gond art teaches. When the forests around us shrink, I paint them larger on canvas so they cannot disappear. I hope when you look at this, you feel what I feel — that this world is worth protecting."
  },
  "kalamkari": {
    productTitle: "Hand-drawn Kalamkari Textile by {name}",
    productDescription: "This Kalamkari textile is drawn entirely by hand using a bamboo pen called a kalam, with natural dyes made from plants, minerals and mordants. The process is slow — the fabric must be treated, drawn, dyed, treated again — sometimes over weeks. The scenes depicted here come from the Ramayana and Mahabharata, stories that have shaped the soul of India for millennia. No machine can replicate the slight tremor of a hand-held pen, the way natural indigo bleeds softly at the edges, or the smell of the earth in the dye.",
    craftStory: "I am {name} from {region}, and I learned Kalamkari from my father who learned it from his father. Our family has been drawing with the kalam for generations. There was a time when Kalamkari cloth was traded across the world — Persian merchants, European traders, all wanted it. Then machines came and our work was forgotten. But the kalam never left our hands. I draw every morning before the heat comes, and every line I make is a quiet argument that handmade things still matter — that human hands still have something machines never will."
  },
  "pattachitra": {
    productTitle: "Odisha Pattachitra Painting by {name}",
    productDescription: "This Pattachitra is painted on cloth canvas prepared by hand using natural gum and chalk powder — a surface that has been used in Odisha for over 5,000 years. The colors are ground from stones, conch shells, and plants. The scenes depicted are from the life of Lord Jagannath, protector of Puri, whose temple has stood for centuries as the heart of Odisha's faith. In Pattachitra, there are no empty spaces — every corner is filled, because in this tradition, emptiness is absence, and presence is devotion.",
    craftStory: "My name is {name} and I belong to the Chitrakar community of {region} — a family of painters whose identity is inseparable from Pattachitra. We do not just paint for a living. We paint as an offering. Each painting I complete, I first say a prayer — because this art was born in devotion, not in commerce. My children are learning now, tracing the same borders my hands trace, learning the same stories my hands tell. If they carry it forward, this art will outlive all of us. That is enough."
  },
  "tanjore": {
    productTitle: "Tanjore Gold Leaf Painting by {name}",
    productDescription: "This Tanjore painting is built layer by layer — chalk powder and gum form the base relief, real gold foil is applied by hand, semi-precious stones are embedded one by one, and natural colors are added with fine brushes. The result is not flat art — it has depth, texture, presence. The deity at its center has been rendered this way in Thanjavur for over 1,600 years. In a world of digital prints and mass reproductions, this piece took weeks of patient, devoted work by a single pair of hands.",
    craftStory: "I am {name} from {region}, and in our family, Tanjore painting is not a profession — it is a calling. My father told me that when you apply the gold leaf, you must breathe slowly, because even your breath can disturb it. That kind of attention — that reverence for the work — is what Tanjore teaches. Every painting I make is a meditation. The gold you see is real. The devotion behind it is even more real. I hope this painting brings the same stillness to your home that it brings to me while making it."
  },
  "phulkari": {
    productTitle: "Punjab Phulkari Embroidery by {name}",
    productDescription: "This Phulkari is embroidered entirely by hand using silk floss thread on hand-woven khadi fabric. The word Phulkari means flower work — and every geometric petal, every diamond, every border is placed stitch by stitch with no pattern to follow except what lives in the embroiderer's memory. Phulkari was traditionally made by mothers for their daughters' weddings — stitched over months and years, folded into trousseau trunks, carrying prayers inside every thread. What you hold was made with that same love.",
    craftStory: "My name is {name} and I learned Phulkari from my mother in {region} the way all Punjab girls once learned — sitting beside her in the evening, watching her hands move faster than I could follow. She told me that a girl who could embroider well would never be alone in the world — her hands would always speak for her. I have been speaking with my hands ever since. Each piece I make, I think of all the women before me who made this — through partition, through loss, through everything — and kept stitching anyway."
  },
  "bidriware": {
    productTitle: "Bidriware Silver Inlay Craft by {name}",
    productDescription: "This Bidriware piece is cast from a zinc and copper alloy, then hand-engraved with intricate patterns, and finally inlaid with pure silver wire pressed in by hand. The signature black finish comes from a paste made from soil taken specifically from the Bidar fort — a soil so uniquely mineral-rich that no other place in the world produces the same effect. This craft was brought to India 600 years ago by Persian artisans under the Bahmani Sultanate. It never left Bidar. It never needed to.",
    craftStory: "I am {name} from Bidar, {region}, and I am one of fewer than a hundred craftsmen still practicing traditional Bidriware. My hands carry the memory of Persian artisans who sailed across oceans to build something beautiful here. When I press silver into the black metal, I think of them — strangers who became ancestors. This craft nearly died when machines made cheaper imitations. We survived because real Bidriware cannot be faked — the soil that blackens the metal exists only in one place on earth. This piece is proof that some things cannot be copied."
  },
  "blue pottery": {
    productTitle: "Jaipur Blue Pottery by {name}",
    productDescription: "This Blue Pottery piece is made entirely without clay — the body is formed from quartz powder, glass powder and Multani mitti, a composition that comes from Persia and arrived in Rajasthan through the Mughal courts. It is shaped, painted by hand with cobalt blue and natural pigments, then fired at low heat. Because of its composition, no two pieces fire exactly the same. The slight variations in glaze, the places where blue deepens unexpectedly — these are not flaws. They are the signature of the kiln.",
    craftStory: "My name is {name} and I make Blue Pottery in {region} the same way my ustad taught me — by hand, with patience, with no shortcuts. Jaipur Blue Pottery was dying twenty years ago. There were almost no buyers, almost no students. A few families refused to stop. We kept making it in small workshops with no electricity, no machines — just the wheel, the brush, and the kiln. Today people call it rare and beautiful. It was always beautiful. It just needed people to look."
  },
  "pashmina": {
    productTitle: "Handwoven Kashmir Pashmina by {name}",
    productDescription: "This Pashmina shawl is woven from the hand-spun wool of the Changthangi goat, which grazes at 14,000 feet in the mountains of Ladakh. The fiber is so fine it can pass through a finger ring — which is why these shawls were once called ring shawls by Mughal emperors. Every thread is spun by hand. Every row of the weave is set by hand on a wooden loom. A single shawl can take three to six months to complete. The weight you feel when you hold it is not heaviness — it is time.",
    craftStory: "I am {name} from {region}, and my family has woven Pashmina for four generations. The goats that give us this wool live in a cold so extreme that the fiber grows dense to protect them — and from that protection, we make warmth for others. My father used to say that Pashmina is a gift passed from mountain to animal to human hands. I am just the last pair of hands in a long chain. When machine-made imitations flooded the market, many weavers stopped. I could not stop. These hands do not know how to do anything else."
  },
  "dhokra": {
    productTitle: "Dhokra Lost-Wax Metal Craft by {name}",
    productDescription: "This Dhokra piece is made using the lost-wax casting method — one of the oldest metal casting techniques on earth, used continuously for over 4,000 years without change. A wax model is built by hand, wrapped in clay, and heated until the wax melts away. Molten brass is poured into the void left behind. When the clay is broken, what emerges is unique — because the mold is destroyed in the process, no two Dhokra pieces are ever identical. This is not a limitation. It is the point.",
    craftStory: "My name is {name} and I belong to the Dhokra Damar tribe of {region}. We have been casting metal since before recorded history — not because someone taught us to, but because this knowledge lives in our community like blood. When I pour the brass, I feel every generation that poured before me. My grandfather made figures of horses and elephants that people still keep on their shelves. I make them too, with the same fire, the same clay, the same breath held at the moment of the pour. Some things should not change."
  },
  "channapatna": {
    productTitle: "Channapatna Lacquered Wood Toy by {name}",
    productDescription: "This Channapatna toy is turned on a hand-operated lathe from hale wood — a soft, odorless wood found in Karnataka that absorbs natural lacquer perfectly. The colors come from vegetable and mineral dyes, making every piece completely safe for children. The craft arrived in Channapatna over 200 years ago when Tipu Sultan invited Persian craftsmen to teach his people lacquerware. What began as a royal commission became a town's identity. Today Channapatna is known across Karnataka as Gombegala Ooru — the Town of Toys.",
    craftStory: "I am {name} from {region}, and I have been working the lathe since I was tall enough to reach it. My father stood behind me and held my hands on the wood — and slowly, the wood started to listen. Channapatna toys are not just for children. They carry the laughter of every child who ever held one, the pride of every craftsman who ever made one. There are workshops here now with machines that can produce a hundred toys an hour. I still make mine one at a time. I cannot explain why except that it feels wrong any other way."
  },
  "kantha": {
    productTitle: "Bengal Kantha Embroidery by {name}",
    productDescription: "This Kantha piece is embroidered entirely by hand using a simple running stitch — the same stitch that Bengali women have used for centuries to turn worn saris into quilts, into stories, into art. The thread traces landscapes, mythological figures, birds and flowers across fabric that has already lived one life and is now living another. Kantha began as a craft of necessity — poor women stitching together old cloth to make something warm. Necessity became beauty. Beauty became heritage.",
    craftStory: "My name is {name} and I learned Kantha from my dida — my grandmother — in {region}. She would stitch by the window in the afternoon light, her needle moving so fast it seemed to think for itself. She said every stitch is a prayer, and if you stitch with worry in your heart the cloth will feel it. I believe her. Kantha was made from things that were old, things that were worn out, things other people would throw away. My grandmother made them beautiful. That is what I try to do too — find what has been overlooked, and make it matter."
  },
  "phad": {
    productTitle: "Rajasthan Phad Scroll Painting by {name}",
    productDescription: "This Phad painting is made on cloth using natural vegetable dyes and squirrel-hair brushes — a tradition from Rajasthan over 700 years old. Phad scrolls were never made to hang on walls. They were portable temples — carried on the backs of Bhopa singer-priests who traveled from village to village, unrolling the scroll at night and singing the epic stories of folk deities Pabuji and Devnarayan by lamplight. This painting carries that same energy — it was made to be looked at slowly, story by story.",
    craftStory: "I am {name} from {region}, and in my community the Joshi family has painted Phad for over thirty generations. My ancestors painted for priests who had no temple — so they carried the temple on their shoulders. I paint in that same spirit. When I begin a Phad, I do not know exactly how it will end — the story guides the hand. There are fewer Bhopa priests now, fewer people who know the epics by heart. But as long as I paint, the stories stay alive. I am not just an artist. I am a keeper."
  },
  "kondapalli": {
    productTitle: "Kondapalli Wooden Toy by {name}",
    productDescription: "This Kondapalli toy is hand-carved from tella poniki — a light, easily worked wood found only near Kondapalli village in Andhra Pradesh. The pieces are carved separately and joined with a paste made from sawdust and tamarind seed powder, then painted with natural dyes in the bright, flat colors traditional to this craft. Kondapalli toys have been made here for over 400 years, depicting gods, village scenes, animals and mythological characters with a directness and charm that no machine has ever replicated.",
    craftStory: "My name is {name} from {region}, and I carve Kondapalli toys the way my father taught me and his mother taught him. The wood we use comes from one specific tree — if that tree stops growing here, this craft stops too. That is how specific, how rooted this art is to this one place on earth. I make gods and animals and farmers and dancers — small figures that fit in a child's hand. But each one took years to learn to make correctly. When you hold one, please hold it knowing that."
  },
  "chikankari": {
    productTitle: "Lucknow Chikankari Embroidery by {name}",
    productDescription: "This Chikankari piece is embroidered entirely by hand on fine cotton fabric using white thread — the traditional style that has defined Lucknow's craft identity for over 400 years. The stitches — shadow work, jaali, murri, bakhiya — are each distinct techniques that take years to master. Chikankari was the embroidery of Nawabs, refined in the courts of Awadh to a level of delicacy that has never been surpassed. Today it is made in narrow lanes by women whose fingers know every stitch by touch.",
    craftStory: "I am {name} and I have been doing Chikankari in {region} since I was a girl. In our lane, every woman embroiders — it is how families have survived here for generations. People see the finished kurta in a shop and do not think about the hands that made it. Each piece takes days. The jaali work alone — the lattice that lets light through like lace — can take a week for a single panel. I do not mind. When I hold the cloth up to light and see it glow, I know why I learned this. Some things are worth the time they take."
  },
  "dokra": {
    productTitle: "Bastar Dokra Brass Craft by {name}",
    productDescription: "This Dokra piece from Bastar is made using the same lost-wax casting method practiced continuously in this region for over 4,000 years. Tribal artisans build each figure from beeswax, wrap it in clay from the riverbed, and fire it until the wax runs out and brass fills its place. What remains when the clay is broken is unique — raw, powerful, irreplaceable. Bastar Dokra carries the worldview of the Gondi and Muriha tribes — horses that carry ancestors, elephants that guard villages, goddesses that protect the harvest.",
    craftStory: "My name is {name} from the forests of {region}. My people have made metal figures since before the kings came and went. We do not make art — we make objects that carry meaning. The horse I cast is not decoration. It is protection. The goddess I pour is not mythology. She is real to us. When the markets came and wanted cheaper, faster versions, some craftsmen left. I stayed. The old way takes longer. The old way is harder. But what comes out of the fire this way has a life in it that no shortcut can give."
  },
  "brass craft": {
    productTitle: "Handcrafted Brass Work by {name}",
    productDescription: "This brass piece is shaped, hammered and finished entirely by hand by an artisan who learned the craft through years of apprenticeship, not instruction manuals. Brass craftsmanship in India is one of the oldest continuous metal traditions in the world — temple bells, oil lamps, water vessels, decorative objects — all made with the same techniques passed down through generations of karigars. The warmth of brass, the weight of it in the hand, the way it catches light — these are things that only come from metal worked slowly, with care.",
    craftStory: "I am {name} from {region}, and I have spent my life working with brass. My father's hands smelled of metal. My hands smell of metal. My children's hands will probably smell of metal too — and I hope they do. There is something about shaping metal by hand that connects you to every person who ever did it before you. I do not make luxury items. I make objects that last. Things you can pass down. In a world full of things made to be thrown away, I still make things made to stay."
  },
  "pottery": {
    productTitle: "Handthrown Indian Pottery by {name}",
    productDescription: "This pottery piece is thrown entirely by hand on a kick wheel, shaped by the pressure of palms and fingers, then dried slowly and fired in a kiln. The slight asymmetry you may notice — the places where the wall thins or thickens unexpectedly — are not imperfections. They are the record of the hands that made it. Indian pottery traditions stretch back to the Indus Valley civilization. This piece stands in that line — made from earth, shaped by hand, hardened by fire, and made to be used and loved.",
    craftStory: "My name is {name} and I throw pots in {region} the way my community has done for as long as anyone can remember. Clay is the most honest material there is — it remembers everything your hands do to it. On a good day, the pot seems to shape itself. On a hard day, the clay teaches you patience. I have been taught by both. Every piece I make goes out into the world and lives a life I will never see — holding water, holding flowers, holding someone's morning tea. That feels like enough."
  },
  "block printing": {
    productTitle: "Hand Block Printed Textile by {name}",
    productDescription: "This textile is printed entirely by hand using carved wooden blocks and natural dyes — a process that requires the printer to align every impression by eye, feel the resistance of the fabric, and judge the ink load by touch. No two hand block printed pieces are identical. The slight variations in impression, the places where the dye bleeds softly at the edges — these are what distinguish hand from machine. This fabric was made in the tradition of Rajasthan and Gujarat's great printing communities, where entire villages once lived by the block and the dye vat.",
    craftStory: "I am {name} from {region}, and I learned block printing by watching, not by being taught. My father never explained what he did — he just did it, and expected me to understand. Eventually I did. There is a rhythm to block printing that takes years to find — the way your body moves, the pressure of the stamp, the count between impressions. When I am in that rhythm, time disappears. Screen printing can copy our patterns. Machines can copy our colors. But no machine has found that rhythm yet. That is still ours."
  }
}

export function getCraftStory(
  craftType: string,
  artisanName: string,
  region: string
): { productTitle: string; productDescription: string; craftStory: string } {
  const craftKey = craftType.toLowerCase().trim()

  const matchedKey = Object.keys(CRAFT_STORIES_DB).find(
    key => craftKey.includes(key) || key.includes(craftKey)
  )

  const base = matchedKey
    ? CRAFT_STORIES_DB[matchedKey]
    : {
        productTitle: "Handcrafted {craftType} by {name}",
        productDescription: `This piece of ${craftType} is made entirely by hand by ${artisanName} from ${region}. Every element of this work carries the skill of years of practice and the knowledge passed down through generations of artisans in this tradition. In a world of mass production, this object was made slowly, carefully, and with complete attention — one piece, one pair of hands, one unbroken tradition.`,
        craftStory: `My name is {name} and I have practiced ${craftType} in {region} for as long as I can remember. This craft was taught to me by those who came before me, and I hope to pass it forward to those who come after. When you hold this piece, you are holding something that cannot be made by a machine — not because machines are not clever enough, but because what is in this object is not just skill. It is memory, identity, and love. Please take care of it.`
      }

  const replace = (text: string) =>
    text
      .replace(/\{name\}/g, artisanName)
      .replace(/\{region\}/g, region)
      .replace(/\{craftType\}/g, craftType)

  return {
    productTitle: replace(base.productTitle),
    productDescription: replace(base.productDescription),
    craftStory: replace(base.craftStory)
  }
}