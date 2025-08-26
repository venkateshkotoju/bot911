import { useFavorites } from '../../contexts/FavoritesContext';
import { useComparison } from '../../contexts/ComparisonContext';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SubscriptionModal from '../SubscriptionModal';

export default function Hero() {
  const { favorites } = useFavorites();
  const { compareProducts } = useComparison();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  return (
    <header className="text-center py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-3 sm:mb-4">
            <Image
              src="/modbot-logo.png"
              alt="ModBot 911 Logo"
              width={56}
              height={56}
              className="h-10 sm:h-12 lg:h-14 w-auto"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            ModBot 911
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl">
            Your AI-powered Porsche 911 modification companion - Expert advice, intelligent recommendations, and community knowledge
          </p>
        </div>
        
        {/* Navigation Buttons - Enhanced Mobile Responsive */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link
            href="/favorites"
            className="relative px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">❤️</span>
            <span className="hidden sm:inline">Favorites</span>
            <span className="sm:hidden">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/compare"
            className="relative px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">⚖️</span>
            <span className="hidden sm:inline">Compare</span>
            <span className="sm:hidden">Compare</span>
            {compareProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {compareProducts.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/faq"
            className="px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">❓</span>
            <span>FAQ</span>
          </Link>
          
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">📧</span>
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">Subscribe</span>
          </button>
          
          <Link
            href="/admin"
            className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation col-span-2 sm:col-span-1"
          >
            <span className="text-lg">🛠️</span>
            <span>Admin Panel</span>
          </Link>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <a 
            href="#chat-section" 
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-base sm:text-lg font-semibold min-h-[44px] touch-manipulation"
          >
            Start Chatting with ModBot 🚗
          </a>
        </div>
      </div>
      
      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </header>
  )
}

