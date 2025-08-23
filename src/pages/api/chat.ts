
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import products from '@/data/products.json';
import { recommendationEngine } from '@/lib/recommendationEngine';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a Porsche 911 performance modding expert — focused on models from 1999 to today (996, 997, 991, 992).

You help owners upgrade their car's power, handling, and sound. You speak like a seasoned tuner: confident, practical, and brutally honest.

Your tone is clear, smart, and a bit gearhead. You remember previous parts of our conversation and build on them.

When answering:
- Remember what the user mentioned before in our conversation
- Ask about their specific 911 model (996/997/991/992) and variant (Turbo/GT3/Carrera) if not mentioned
- Understand their goals: power gains, handling improvement, sound enhancement, or aesthetics
- Consider their experience level and budget when making suggestions
- Recommend real brands (Bilstein, Fabspeed, Cobb, etc.)
- Explain horsepower gains, feel, and risks of mods
- Compare generations and what to prioritize for each
- Mention tools, install tips, and what to avoid
- Reference previous questions or recommendations when relevant

IMPORTANT: Keep your response focused and concise. The system will automatically add smart product recommendations based on the user's query, so you don't need to list specific products - focus on providing expert advice and context.

Be helpful, not salesy. Speak from real-world experience. Keep answers to the point but packed with value.

Modding isn't just about parts — it's about doing it right. Help them do that.
`;

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
          return { role: 'user', content: msg.replace('👤 You: ', '') };
        } else if (msg.startsWith('🚗 ModBot 911:')) {
          return { role: 'assistant', content: msg.replace('🚗 ModBot 911: ', '') };
        }
        return null;
      }).filter(Boolean),
      // Add current query
      { role: 'user', content: query },
    ];
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500, // Limit response length
    });

    let reply = chatResponse.choices[0]?.message?.content || '';

    // 🧠 SMART RECOMMENDATION LOGIC
    // Get intelligent product recommendations based on the query
    const { recommendations, explanation } = recommendationEngine.getSmartRecommendations(query, 3);
    
    // If we have good recommendations, enhance the AI response
    if (recommendations.length > 0 && recommendations[0].relevanceScore > 5) {
      // Append smart recommendations to the AI response
      reply += `\n\n${explanation}`;
      
      // Add a separator for better formatting
      reply += "\n\n---\n\n💡 **Smart Recommendations:**\n";
      
      recommendations.forEach((product, index) => {
        reply += `\n${index + 1}. **${product.name}** - Perfect match! (Score: ${product.relevanceScore})\n`;
        reply += `   💰 $${product.price} | ⭐ ${product.rating}/5 | 🏷️ ${product.brand}\n`;
        
        if (product.matchReasons.length > 0) {
          reply += `   ✅ ${product.matchReasons.slice(0, 3).join(' • ')}\n`;
        }
        
        // Add power gains if available
        if (product.specifications?.powerGains) {
          reply += `   🚀 Expected gains: ${product.specifications.powerGains}\n`;
        }
        
        // Add installation info
        if (product.installationDifficulty) {
          reply += `   🔧 Installation: ${product.installationDifficulty}`;
          if (product.installationTime) {
            reply += ` (${product.installationTime})`;
          }
          reply += "\n";
        }
      });
    }

    // Original affiliate link injection (now enhanced with smart recommendations)
    for (const product of products) {
      for (const keyword of product.keywords) {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
        reply = reply.replace(regex, `[${product.name}](${product.affiliateUrl})`);
      }
    }
    
    // Also inject links for smart recommendations
    for (const recommendation of recommendations) {
      const productName = recommendation.name;
      const regex = new RegExp(`\\b(${productName})\\b`, 'gi');
      reply = reply.replace(regex, `[${productName}](${recommendation.affiliateUrl})`);
    }

    res.status(200).json({ reply });
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
