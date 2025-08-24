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
      <div className="max-w-5xl mx-auto px-4">
        {/* Logo and Brand */}
        <div className="flex justify-center items-center mb-4">
          <img
            src="/modbot-logo.png"
            alt="ModBot 911 Logo"
            className="h-12"
          />
        </div>
        
        {/* Navigation Buttons - Mobile Responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          <Link
            href="/favorites"
            className="relative px-3 sm:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">❤️</span>
            <span className="hidden sm:inline">Favorites</span>
            <span className="sm:hidden">Fav</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/compare"
            className="relative px-3 sm:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">⚖️</span>
            <span className="hidden sm:inline">Compare</span>
            <span className="sm:hidden">Comp</span>
            {compareProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {compareProducts.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/faq"
            className="px-3 sm:px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">❓</span>
            <span>FAQ</span>
          </Link>
          
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">📧</span>
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">Sub</span>
          </button>
          
          <Link
            href="/admin"
            className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <span className="text-sm sm:text-base">🛠️</span>
            <span className="hidden sm:inline">Admin</span>
            <span className="sm:hidden">Admin</span>
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
