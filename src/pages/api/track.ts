import { NextRequest } from 'next/server';
import products from '@/data/products.json';

type Product = {
  id: string;
  affiliateUrl: string;
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing product ID', { status: 400 });
  }

  const product = products.find(p => p.id === id) as Product | undefined;

  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  return Response.redirect(product.affiliateUrl, 302);
}
