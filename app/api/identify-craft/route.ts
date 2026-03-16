import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { CRAFTS_DATABASE } from '@/lib/crafts-database'

const CRAFT_LABELS = [
  "Warli painting", "Madhubani painting", "Gond art", "Kalamkari textile",
  "Pattachitra painting", "Tanjore painting", "Phulkari embroidery",
  "Bidriware", "Blue Pottery", "Pashmina shawl", "Dhokra craft",
  "Channapatna toys", "Kantha embroidery", "Phad painting", "Kondapalli toys",
  "unknown craft"
]

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const imageFile = formData.get('image') as File
    if (!imageFile) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const imageBuffer = await imageFile.arrayBuffer()
    const base64Image = Buffer.from(imageBuffer).toString('base64')
    const mimeType = imageFile.type || 'image/jpeg'

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })

    const combinedResult = await model.generateContent([
      { inlineData: { mimeType, data: base64Image } },
      {
        text: `You are an expert on Indian traditional crafts.

TASK 1 — Identify the craft:
Look at this image and identify which craft it shows from this exact list:
Warli painting, Madhubani painting, Gond art, Kalamkari textile, Pattachitra painting,
Tanjore painting, Phulkari embroidery, Bidriware, Blue Pottery, Pashmina shawl,
Dhokra craft, Channapatna toys, Kantha embroidery, Phad painting, Kondapalli toys
If none match clearly, use: unknown craft

TASK 2 — Write a marketplace story (only if craft is identified):
Write a 3-sentence story for an artisan marketplace listing.
- Start with craft name and state
- Mention its age and making community
- End with why a buyer should value it
- Under 80 words, warm and authentic, no bullet points

Reply in this EXACT format with no extra text:
CRAFT: <exact craft name from list>
STORY: <your 3-sentence story>`
      }
    ])

    const responseText = combinedResult.response.text().trim()

    const craftMatch = responseText.match(/CRAFT:\s*(.+)/i)
    const storyMatch = responseText.match(/STORY:\s*([\s\S]+)/i)

    const geminiLabel = craftMatch?.[1]?.trim() ?? 'unknown craft'
    const geminiStory = storyMatch?.[1]?.trim() ?? ''

    const topLabel = CRAFT_LABELS.find(l => l.toLowerCase() === geminiLabel.toLowerCase()) ?? 'unknown craft'
    const topScore = 85
    const allPredictions = [{ label: topLabel, score: topScore }]

    if (topLabel === 'unknown craft') {
      return NextResponse.json({
        identified: false,
        message: "Could not identify the craft. Please try a clearer photo showing the craft patterns.",
        all_predictions: allPredictions
      })
    }

    const craftData = CRAFTS_DATABASE[topLabel]
    if (!craftData) {
      return NextResponse.json({
        identified: false,
        message: "Craft recognized but not in our database yet.",
        all_predictions: allPredictions
      })
    }

    return NextResponse.json({
      identified: true,
      fallback_used: false,
      craft: {
        name: craftData.name,
        state: craftData.state,
        region: craftData.region,
        gi_tag: craftData.gi_tag,
        gi_registered: craftData.gi_registered,
        age: craftData.age,
        community: craftData.community,
        confidence: topScore,
        cultural_story: geminiStory || craftData.cultural_story,
        listing_keywords: craftData.listing_keywords,
        price_range: craftData.price_range,
        typical_products: craftData.typical_products,
        all_predictions: allPredictions
      }
    })

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('identify-craft error:', msg)
    console.error('identify-craft stack:', error instanceof Error ? error.stack : '')
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.', details: msg },
      { status: 500 }
    )
  }
}
