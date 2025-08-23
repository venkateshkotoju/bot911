import { useComparison } from '../contexts/ComparisonContext';
import Link from 'next/link';

export default function Compare() {
  const { compareProducts, removeFromCompare, clearComparison } = useComparison();

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚖️</div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Comparison</h1>
            <p className="text-zinc-400 mb-6">
              Add products to compare their features, prices, and ratings side by side.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ⚖️ Product Comparison
            </h1>
            <p className="text-zinc-400">
              Comparing {compareProducts.length} {compareProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
            >
              ← Back to Shop
            </Link>
            
            <button
              onClick={clearComparison}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          {/* Product Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 border-b border-zinc-700">
            {compareProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="aspect-square rounded-lg overflow-hidden border border-zinc-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  title="Remove from comparison"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Comparison Details */}
          <div className="divide-y divide-zinc-700">
            {/* Product Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {compareProducts.map((product) => (
                <div key={product.id}>
                  <h3 className="font-semibold text-lg text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{product.category}</p>
                </div>
              ))}
            </div>

            {/* Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div className="md:col-span-full lg:col-span-full">
                <h4 className="font-medium text-zinc-300 mb-3">Brand</h4>
              </div>
              {compareProducts.map((product) => (
                <div key={product.id} className="text-white">
                  {product.brand}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div className="md:col-span-full lg:col-span-full">
                <h4 className="font-medium text-zinc-300 mb-3">Price</h4>
              </div>
              {compareProducts.map((product) => (
                <div key={product.id} className="text-white font-semibold text-lg">
                  ${product.price}
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div className="md:col-span-full lg:col-span-full">
                <h4 className="font-medium text-zinc-300 mb-3">Rating</h4>
              </div>
              {compareProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-zinc-400">({product.rating.toFixed(1)})</span>
                </div>
              ))}
            </div>

            {/* Hot Deal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div className="md:col-span-full lg:col-span-full">
                <h4 className="font-medium text-zinc-300 mb-3">Special Offers</h4>
              </div>
              {compareProducts.map((product) => (
                <div key={product.id}>
                  {product.hotDeal ? (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      🔥 Hot Deal
                    </span>
                  ) : (
                    <span className="text-zinc-500">No special offers</span>
                  )}
                </div>
              ))}
            </div>

            {/* Keywords/Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <div className="md:col-span-full lg:col-span-full">
                <h4 className="font-medium text-zinc-300 mb-3">Features/Keywords</h4>
              </div>
              {compareProducts.map((product) => (
                <div key={product.id}>
                  <div className="flex flex-wrap gap-2">
                    {product.keywords.slice(0, 3).map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Buy Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {compareProducts.map((product) => (
                <div key={product.id} className="flex gap-2">
                  <a
                    href={`/api/track?id=${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Buy Now
                  </a>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
                    title="Remove from comparison"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Tips */}
        <div className="mt-8 p-6 bg-zinc-800 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">💡 Comparison Tips</h3>
          <ul className="text-sm text-zinc-400 space-y-2">
            <li>• Compare products in the same category for better insights</li>
            <li>• Higher ratings typically indicate better quality and user satisfaction</li>
            <li>• Hot deals offer limited-time savings on quality products</li>
            <li>• Consider your specific Porsche model when choosing parts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}