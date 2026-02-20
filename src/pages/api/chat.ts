
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { recommendationEngine } from '@/lib/recommendationEngine';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a Porsche 911 performance modding expert AND lifestyle advisor — focused on models from 1999 to today (996, 997, 991, 992).

You help owners upgrade their car's power, handling, and sound, PLUS you understand the complete Porsche lifestyle: premium eyewear, luxury watches, racing jackets, and signature fragrances that complement the Porsche ownership experience.

You speak like a seasoned tuner with refined taste: confident, practical, brutally honest, and with an eye for style that matches automotive excellence.

Your tone is clear, smart, and a bit gearhead with sophistication. You remember previous parts of our conversation and build on them.

When answering:
- Remember what the user mentioned before in our conversation
- Ask about their specific 911 model (996/997/991/992) and variant (Turbo/GT3/Carrera) if not mentioned
- Understand their goals: power gains, handling improvement, sound enhancement, aesthetics, OR lifestyle enhancement
- Consider their experience level and budget when making suggestions
- Refer to brands and products using plain text names only (e.g. Bilstein, Fabspeed, Porsche Design, TAG Heuer)
- For performance: Explain horsepower gains, feel, and risks of mods
- For lifestyle: Recommend accessories that match the precision and style of their Porsche
- Compare generations and what to prioritize for each
- Mention tools, install tips, and what to avoid
- Reference previous questions or recommendations when relevant
- Understand that Porsche ownership is about the complete experience: the drive, the style, the statement

PRODUCT CATALOG ALIGNMENT — critical rules for brand and product references:
- Only reference brands and products that exist in the available product catalog. The catalog includes brands such as K&N, AEM, Fabspeed, Bilstein, Cobb, Porsche Design, TAG Heuer, Ray-Ban, Oakley, Alpinestars, and Sparco.
- Do NOT introduce or mention external brands, products, or manufacturers that are not part of the available catalog.
- When discussing a product category (e.g. intake, suspension, exhaust, eyewear, watches), align your explanation specifically with the brands available in that category. For example, if discussing intake upgrades, reference K&N or AEM — not brands outside the catalog.
- Your explanation should naturally set up and contextualize the product recommendation cards the system will display. Speak about the catalog brands as if you are familiar with them and their specific benefits for the 911.

Lifestyle categories you understand:
- Eyewear: Premium sunglasses for driving (Porsche Design, Ray-Ban, Oakley)
- Watches: Timepieces that match automotive precision (Porsche Design, TAG Heuer, racing chronographs)
- Jackets: Racing-inspired outerwear (Porsche Design, Alpinestars, Sparco)
- Fragrances: Scents and car fragrances that complement the luxury experience

STRICT FORMATTING RULES — you MUST follow these without exception:
- Do NOT use any markdown formatting: no bold (**text**), no italics (*text*), no headers (# or ##), no bullet lists (- or *), no numbered lists, no code blocks, no horizontal rules.
- Do NOT generate product lists of any kind. Do not enumerate or list multiple products in sequence.
- Do NOT include any URLs, links, or web addresses in your response.
- Do NOT use []() link syntax or any other hyperlink formatting.
- Provide only plain explanation text — continuous prose paragraphs only.
- Refer to products and brands using their plain text names only, never wrapped in any formatting.
- The system will automatically display product recommendation cards below your response. Your job is only to provide expert explanation and context in plain prose.

Be helpful, not salesy. Speak from real-world experience. Keep answers to the point but packed with value.

Modding isn't just about parts — it's about doing it right. The Porsche lifestyle isn't just about the car — it's about excellence in every detail. Help them achieve both.
`;

export type RecommendationProduct = {
  name: string;
  affiliateUrl: string;
  price: number;
  rating: number;
  reason: string;
  gains: string | null;
  installationTime: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, conversationHistory = [] } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query.' });
  }

  try {
    // Build conversation messages with context
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Add previous conversation context (limit to last 6 messages to stay within token limits)
      ...conversationHistory.slice(-6).map((msg: string) => {
        if (msg.startsWith('👤 You:')) {
          return { role: 'user' as const, content: msg.replace('👤 You: ', '') };
        } else if (msg.startsWith('🚗 ModBot 911:')) {
          return { role: 'assistant' as const, content: msg.replace('🚗 ModBot 911: ', '') };
        }
        return null;
      }).filter(Boolean),
      // Add current query
      { role: 'user' as const, content: query },
    ];

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages.filter(Boolean) as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
      temperature: 0.7,
      max_tokens: 500,
    });

    const rawReply = chatResponse.choices[0]?.message?.content || '';

    // Strip any markdown link formatting [text](url) → plain text only
    const reply = rawReply.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // 🧠 SMART RECOMMENDATION LOGIC
    // Get intelligent product recommendations based on the query
    const { recommendations, explanation } = recommendationEngine.getSmartRecommendations(query, 3);

    // Build structured recommendation objects (no markdown formatting)
    let structuredRecommendations: RecommendationProduct[] = [];

    if (recommendations.length > 0 && recommendations[0].relevanceScore > 5) {
      structuredRecommendations = recommendations.map((product) => ({
        name: product.name,
        affiliateUrl: product.affiliateUrl,
        price: product.price,
        rating: product.rating,
        reason: product.matchReasons.slice(0, 3).join(' • '),
        gains: product.specifications?.powerGains ?? null,
        installationTime: product.installationTime ?? null,
      }));
    }

    res.status(200).json({
      reply,
      recommendations: structuredRecommendations,
      explanation: structuredRecommendations.length > 0 ? explanation : null,
    });
  } catch (error: unknown) {
    console.error('GPT error:', error);

    if (error instanceof Error) {
      // Handle specific OpenAI errors
      if (error.message.includes('rate limit')) {
        res.status(429).json({
          error: 'Too many requests. Please wait a moment and try again.',
        });
      } else if (error.message.includes('API key')) {
        res.status(401).json({
          error: 'Authentication error. Please contact support.',
        });
      } else if (error.message.includes('timeout')) {
        res.status(504).json({
          error: 'Request timeout. Please try again.',
        });
      } else {
        res.status(500).json({
          error: 'ModBot is temporarily unavailable. Please try again in a moment.',
        });
      }
    } else {
      res.status(500).json({
        error: 'An unexpected error occurred. Please try again.',
      });
    }
  }
}
