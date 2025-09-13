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
          <Link href="/" className="flex justify-center items-center mb-3 sm:mb-4 group">
            <div className="relative">
              <Image
                src="/modbot-logo.png"
                alt="ModBot 911 Logo"
                width={64}
                height={64}
                className="h-12 sm:h-14 lg:h-16 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                priority
              />
              <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </Link>
          <Link href="/" className="group">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
              ModBot 911
            </h1>
          </Link>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl text-center leading-relaxed">
            <span className="text-red-400 font-semibold">Unlock your 911's true potential.</span> Get instant expert advice on performance mods, proven product recommendations, and data-driven tuning guidance—all powered by AI and real Porsche expertise.
          </p>
        </div>
        
        {/* Navigation Buttons - Enhanced Mobile Responsive */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link
            href="/favorites"
            className="relative px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
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
            className="relative px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">⚖️</span>
            <span className="hidden sm:inline">Compare</span>
            <span className="sm:hidden">Compare</span>
            {compareProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {compareProducts.length}
              </span>
            )}
          </Link>
          
          <Link
            href="/faq"
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">❓</span>
            <span>FAQ</span>
          </Link>
          
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
          >
            <span className="text-lg">📧</span>
            <span className="hidden sm:inline">Subscribe</span>
            <span className="sm:hidden">Subscribe</span>
          </button>
          
          <Link
            href="/admin"
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation col-span-2 sm:col-span-1"
          >
            <span className="text-lg">🛠️</span>
            <span>Admin Panel</span>
          </Link>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <a 
            href="#chat-section" 
            className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 border border-red-500 hover:border-red-400 text-white rounded-lg transition-all text-base sm:text-lg font-semibold min-h-[44px] touch-manipulation shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Get Expert Mod Advice Now
          </a>
          <p className="text-xs sm:text-sm text-zinc-500 mt-3">
            Free • Instant Answers • No Sign-up Required
          </p>
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

