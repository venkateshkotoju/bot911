import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useComparison } from '../../contexts/ComparisonContext';
import SocialShare from '../../components/SocialShare';
import productsData from '../../data/products.json';

type Product = {
  id: string;
  name: string;
  keywords: string[];
  affiliateUrl: string;
  brand: string;
  image: string;
  category: string;
  hotDeal: boolean;
  rating: number;
  price: number;
  description?: string;
  specifications?: {
    compatibility?: string;
    powerGains?: string;
    features?: string[];
  };
  installationDifficulty?: string;
  installationTime?: string;
  installationGuide?: string;
  pros?: string[];
  cons?: string[];
};

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInComparison, canAddMore } = useComparison();

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-red-400 hover:text-red-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/" className="text-red-400 hover:text-red-300 flex items-center gap-2">
            ← Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => {
                  if (isFavorite(product.id)) {
                    removeFromFavorites(product.id);
                  } else {
                    addToFavorites(product);
                  }
                }}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isFavorite(product.id)
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-red-400'
                }`}
                title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(product.id) ? '❤️' : '🤍'}
              </button>
              
              <button
                onClick={() => {
                  if (isInComparison(product.id)) {
                    removeFromCompare(product.id);
                  } else {
                    addToCompare(product);
                  }
                }}
                disabled={!canAddMore && !isInComparison(product.id)}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isInComparison(product.id)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : canAddMore
                    ? 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-blue-400'
                    : 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                }`}
                title={isInComparison(product.id) ? 'Remove from comparison' : 'Add to comparison'}
              >
                ⚖️
              </button>
            </div>
            
            {/* Hot Deal Badge */}
            {product.hotDeal && (
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  🔥 Hot Deal
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              <span className="inline-block bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-zinc-400">By {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-lg">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-zinc-400">({product.rating.toFixed(1)} out of 5)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-red-400">${product.price}</div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-zinc-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Installation Info */}
            {(product.installationDifficulty || product.installationTime) && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-800 rounded-lg">
                {product.installationDifficulty && (
                  <div>
                    <span className="text-zinc-400 text-sm">Installation Difficulty</span>
                    <p className="text-white font-semibold">{product.installationDifficulty}</p>
                  </div>
                )}
                {product.installationTime && (
                  <div>
                    <span className="text-zinc-400 text-sm">Installation Time</span>
                    <p className="text-white font-semibold">{product.installationTime}</p>
                  </div>
                )}
              </div>
            )}

            {/* Buy Button */}
            <div className="flex gap-4">
              <a
                href={`/api/track?id=${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                🛒 Buy Now - ${product.price}
              </a>
              
              <Link
                href="/compare"
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
              >
                Compare
              </Link>
            </div>
            
            {/* Social Share */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-zinc-400 text-sm">Share this product:</span>
              <SocialShare
                productName={product.name}
                productUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/product/${product.id}`}
                recommendationText={product.description || `Check out this amazing ${product.category.toLowerCase()} for your Porsche 911!`}
              />
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          {product.specifications && (
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-4">📋 Specifications</h2>
              <div className="space-y-3">
                {product.specifications.compatibility && (
                  <div>
                    <span className="text-zinc-400 text-sm">Compatibility:</span>
                    <p className="text-white">{product.specifications.compatibility}</p>
                  </div>
                )}
                {product.specifications.powerGains && (
                  <div>
                    <span className="text-zinc-400 text-sm">Power Gains:</span>
                    <p className="text-white font-semibold">{product.specifications.powerGains}</p>
                  </div>
                )}
                {product.specifications.features && (
                  <div>
                    <span className="text-zinc-400 text-sm">Features:</span>
                    <ul className="text-white mt-1 space-y-1">
                      {product.specifications.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-green-400">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Installation Guide */}
          {product.installationGuide && (
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-4">🔧 Installation Guide</h2>
              <div className="space-y-2">
                {product.installationGuide.split('\\n').map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-zinc-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          {(product.pros || product.cons) && (
            <div className="bg-zinc-900 p-6 rounded-xl lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">⚖️ Pros & Cons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.pros && (
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">✅ Pros</h3>
                    <ul className="space-y-2">
                      {product.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2 text-zinc-300">
                          <span className="text-green-400">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {product.cons && (
                  <div>
                    <h3 className="text-red-400 font-semibold mb-3">❌ Cons</h3>
                    <ul className="space-y-2">
                      {product.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2 text-zinc-300">
                          <span className="text-red-400">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">🔗 Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl hover:border-red-600 transition-colors"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold text-white mb-1">{relatedProduct.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{relatedProduct.brand}</p>
                  <p className="text-red-400 font-semibold">${relatedProduct.price}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const product = productsData.find(p => p.id === id) || null;

  return {
    props: {
      product,
    },
  };
};