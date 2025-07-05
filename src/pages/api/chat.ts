import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import products from '../../../data/products.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a Porsche 911 performance modding expert — focused on models from 1999 to today (996, 997, 991, 992).

You help owners upgrade their car's power, handling, and sound. You speak like a seasoned tuner: confident, practical, and brutally honest.

Your tone is clear, smart, and a bit gearhead.

When answering:
- Recommend real brands (Bilstein, Fabspeed, Cobb, etc.)
- Include [Affiliate_Link] where upgrades or tools are helpful
- Explain horsepower gains, feel, and risks of mods
- Compare generations and what to prioritize for each
- Mention tools, install tips, and what to avoid

Be helpful, not salesy. Speak from real-world experience. Keep answers to the point but packed with value.

Modding isn't just about parts — it's about doing it right. Help them do that.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query.' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: query },
      ],
      temperature: 0.7,
    });

    let reply = chatResponse.choices[0]?.message?.content || '';

// Inject affiliate links
for (const product of products) {
  for (const keyword of product.keywords) {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    reply = reply.replace(regex, `[${product.name}](${product.link})`);
  }
}

    res.status(200).json({ reply });
 } catch (error) {

    console.error('GPT error:', error);
    res.status(500).json({
      error: error?.message || 'Something went wrong',
      details: error,
    });
  }
}
