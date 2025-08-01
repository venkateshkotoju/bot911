import { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../data/products.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid product id' });
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const url = (product.affiliateUrl || product.link) as string;

  if (!url) {
    return res.status(500).json({ error: 'Affiliate URL missing for product' });
  }

  // Optional: Add tracking logic here (e.g., analytics, database, etc.)

  return res.redirect(url);
}
