import { useState } from 'react';

interface SocialShareProps {
  productName: string;
  productUrl: string;
  recommendationText: string;
}

export default function SocialShare({ productName, productUrl, recommendationText }: SocialShareProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const shareText = `🚗 ModBot 911 recommended: ${productName}\n\n"${recommendationText}"\n\nCheck it out: ${productUrl}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(productUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(`ModBot 911 recommended: ${productName}`)}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    window.open(link, '_blank', 'noopener,noreferrer');
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="text-zinc-400 hover:text-blue-400 transition-colors text-sm"
        title="Share this recommendation"
      >
        🔗 Share
      </button>

      {showShareMenu && (
        <div className="absolute right-0 top-8 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg z-10 p-3 min-w-[200px]">
          <div className="text-white text-sm font-semibold mb-3">Share Recommendation</div>
          
          <div className="space-y-2">
            {/* Social Platforms */}
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-blue-400">🐦</span>
              Twitter
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-blue-600">📘</span>
              Facebook
            </button>
            
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-blue-500">💼</span>
              LinkedIn
            </button>
            
            <button
              onClick={() => handleShare('reddit')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-orange-500">🔴</span>
              Reddit
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-green-500">💬</span>
              WhatsApp
            </button>
            
            <button
              onClick={() => handleShare('telegram')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-blue-400">✈️</span>
              Telegram
            </button>
            
            <hr className="border-zinc-600 my-2" />
            
            {/* Copy to Clipboard */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700 rounded transition-colors"
            >
              <span className="text-zinc-400">📋</span>
              {copySuccess ? '✅ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setShowShareMenu(false)}
            className="w-full mt-2 px-3 py-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}