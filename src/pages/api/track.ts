import type { NextApiRequest, NextApiResponse } from 'next';
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

  // Create click log
  const click = {
  id,
  name: product.name,
  image: product.image,
  brand: product.brand,
  timestamp: new Date().toISOString(),
  userAgent: req.headers['user-agent'] || '',
  ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
};


  // ✅ Write to file only in development
  if (process.env.NODE_ENV === 'development') {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.resolve('./clicks.json');

    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];

    fileData.push(click);

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  }

  // ✅ Redirect to affiliate link
  const url = product.affiliateUrl;
  return res.redirect(url);
}
