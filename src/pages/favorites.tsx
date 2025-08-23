import { useFavorites } from '../contexts/FavoritesContext';
import Link from 'next/link';

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ❤️ Your Favorites
            </h1>
            <p className="text-zinc-400">
              {favorites.length} {favorites.length === 1 ? 'product' : 'products'} in your wishlist
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
            >
              ← Back to Shop
            </Link>
            
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all favorites?')) {
                    clearFavorites();
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
            <p className="text-zinc-400 mb-6">
              Start adding products to your wishlist by clicking the heart icon on any product.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow hover:shadow-red-600/40 transition flex flex-col"
              >
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded mb-2 inline-block w-fit">
                  {product.category}
                </span>

                <div className="relative">
                  <div className="overflow-hidden rounded mb-4 border border-zinc-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover h-40 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                    title="Remove from favorites"
                  >
                    ❌
                  </button>
                </div>

                <h4 className="text-white font-semibold text-base sm:text-lg mb-1 flex items-center gap-2">
                  {product.name}
                </h4>

                <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                  ))}
                  <span className="text-zinc-400 ml-1">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm mb-3">
                  Brand: {product.brand} • ${product.price}
                </p>

                <div className="mt-auto flex gap-2">
                  <a
                    href={`/api/track?id=${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Buy ${product.name}`}
                    className="flex-1 text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Buy Now
                  </a>
                  
                  <button
                    onClick={() => removeFromFavorites(product.id)}
                    className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded text-sm"
                    title="Remove from favorites"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {favorites.length > 0 && (
          <div className="mt-12 p-6 bg-zinc-800 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">📊 Wishlist Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {favorites.length}
                </div>
                <div className="text-sm text-zinc-400">Total Items</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-red-400">
                  ${favorites.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
                </div>
                <div className="text-sm text-zinc-400">Total Value</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {(favorites.reduce((sum, product) => sum + product.rating, 0) / favorites.length).toFixed(1)}
                </div>
                <div className="text-sm text-zinc-400">Avg Rating</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {[...new Set(favorites.map(p => p.category))].length}
                </div>
                <div className="text-sm text-zinc-400">Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}