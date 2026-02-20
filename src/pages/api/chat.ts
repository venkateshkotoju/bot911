
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { recommendationEngine } from '@/lib/recommendationEngine';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `You are ModBot 911, a performance automotive advisor.

Explain why the selected products match the user's request.

Rules:
Plain prose only
No markdown
No URLs
Do not mention products not provided
Do not invent variations`;

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
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query.' });
  }

  try {
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

    // Build product context — names only, no descriptions, no JSON, no full objects
    const productNames = structuredRecommendations.map((p) => p.name).join(', ');
    const productContext = productNames.length > 0
      ? `Selected Products: ${productNames}`
      : '';

    // Compose the full system message
    const fullSystemMessage = productContext
      ? `${SYSTEM_PROMPT}\n\n${productContext}`
      : SYSTEM_PROMPT;

    // ── Prompt size diagnostics ──────────────────────────────────────────────
    const systemPromptChars = SYSTEM_PROMPT.length;
    const productContextChars = productContext.length;
    const userQueryChars = query.length;
    const combinedSystemChars = fullSystemMessage.length;
    const totalChars = combinedSystemChars + userQueryChars;
    const estimatedTokens = Math.ceil(totalChars / 4);

    console.log('[chat.ts] Prompt diagnostics:');
    console.log(`  SYSTEM_PROMPT chars       : ${systemPromptChars}`);
    console.log(`  productContext chars       : ${productContextChars}`);
    console.log(`  user query chars          : ${userQueryChars}`);
    console.log(`  combined system msg chars : ${combinedSystemChars}`);
    console.log(`  total chars sent          : ${totalChars}`);
    console.log(`  estimated tokens (~÷4)    : ${estimatedTokens}`);
    // ────────────────────────────────────────────────────────────────────────

    // Messages array: ONLY one system message + one user message
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: fullSystemMessage },
      { role: 'user', content: query },
    ];

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.4,
      max_tokens: 300,
    });

    const rawReply = chatResponse.choices[0]?.message?.content || '';

    // Strip any markdown link formatting [text](url) → plain text only
    const reply = rawReply.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

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
