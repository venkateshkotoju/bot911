import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import products from '@/data/products.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).send('Missing product ID');
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  // Click info to log
  const click = {
    id,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'] || '',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
  };

  // Save to clicks.json
  const filePath = path.resolve('./clicks.json');
  const fileData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
  fileData.push(click);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

  // Redirect to affiliate link
  const url = product.affiliateUrl;
  return res.redirect(url);
}
