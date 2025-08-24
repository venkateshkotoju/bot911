import { useFavorites } from '../../contexts/FavoritesContext';
import { useComparison } from '../../contexts/ComparisonContext';
import { useState } from 'react';
import Link from 'next/link';
import SubscriptionModal from '../SubscriptionModal';

export default function Hero() {
  const { favorites } = useFavorites();
  const { compareProducts } = useComparison();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <header className="text-center py-8">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
        <img
          src="/modbot-logo.png"
          alt="ModBot 911 Logo"
          className="h-12"
        />
        
        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Link
            href="/favorites"
            className="relative px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            ❤️ Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/compare"
            className="relative px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            ⚖️ Compare
            {compareProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {compareProducts.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/faq"
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            ❓ FAQ
          </Link>
          
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            📧 Subscribe
          </button>
          
          <Link
            href="/admin"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            🛠️ Admin
          </Link>
        </div>
      </div>
      <p className="text-sm sm:text-base text-zinc-400 mt-2">
        Your Porsche 911 mod companion
      </p>
      
      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </header>
  )
}
