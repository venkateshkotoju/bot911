import { useEffect, useState } from 'react';
import ProductGrid from '../components/sections/ProductGrid';
import HotDeals from '../components/sections/HotDeals';
import Hero from '../components/sections/Hero';
import ChatBox from '../components/sections/ChatBox';
import Footer from '../components/sections/Footer';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';
import type { RecommendationProduct } from './api/chat';

export type ChatMessage = {
  role: 'user' | 'bot';
  text: string;
  recommendations?: RecommendationProduct[];
};

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('modbot-chat-history');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Support both old string[] format and new ChatMessage[] format
        if (Array.isArray(parsed)) {
          if (parsed.length > 0 && typeof parsed[0] === 'string') {
            // Migrate old string format to new object format
            const migrated: ChatMessage[] = (parsed as string[]).map((msg) => {
              if (msg.startsWith('👤 You:')) {
                return { role: 'user', text: msg.replace('👤 You: ', '') };
              }
              return { role: 'bot', text: msg.replace('🚗 ModBot 911: ', '') };
            });
            setMessages(migrated);
          } else {
            setMessages(parsed as ChatMessage[]);
          }
        }
      } catch (e) {
        console.error('Error parsing stored messages:', e);
        localStorage.removeItem('modbot-chat-history');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modbot-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Build legacy string array for conversation history sent to API
  const buildConversationHistory = (msgs: ChatMessage[]): string[] =>
    msgs.map((m) =>
      m.role === 'user' ? `👤 You: ${m.text}` : `🚗 ModBot 911: ${m.text}`
    );

  const sendMessage = async () => {
    setError(null);
    if (!input.trim() || loading) return;

    const currentInput = input;
    const userMsg: ChatMessage = { role: 'user', text: currentInput };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: currentInput,
          conversationHistory: buildConversationHistory(messages),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status !== 200) {
        setError(`❌ Error: ${data.error}`);
        setMessages((prev) => prev.slice(0, -1));
        setInput(currentInput);
        return;
      }

      const botMsg: ChatMessage = {
        role: 'bot',
        text: data.reply,
        recommendations: data.recommendations ?? [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : 'Connection failed. Please try again.';
      setError(`❌ Network Error: ${errorMessage}`);
      setMessages((prev) => prev.slice(0, -1));
      setInput(currentInput);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      localStorage.removeItem('modbot-chat-history');
      setMessages([]);
      setError(null);
    }
  };

  return (
    <>
      <SEO
        title="ModBot 911 - Expert AI-Powered Porsche 911 Modification Advice & Smart Product Recommendations"
        description="Get instant expert advice on Porsche 911 modifications. AI-powered recommendations for performance parts, tuning guides, installation tips, and comprehensive FAQ for 996, 997, 991, 992 models. Free, instant, and trusted by thousands of enthusiasts."
        keywords={[
          'Porsche 911 modifications',
          'AI Porsche tuning advice',
          'ModBot 911 expert recommendations',
          'Porsche performance parts guide',
          '996 997 991 992 modification tips',
          'Cobb Accessport Porsche tuning',
          'Porsche exhaust system reviews',
          '911 suspension upgrade guide',
          'Porsche modification FAQ',
          'instant Porsche modification advice',
          'mobile Porsche tuning consultant',
          'free Porsche modification help',
        ]}
        url="https://modbot911.com"
        canonicalUrl="https://modbot911.com"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'ModBot 911',
          applicationCategory: 'AutomotiveApplication',
          operatingSystem: 'All',
          description:
            'AI-powered Porsche 911 modification expert providing instant advice, smart product recommendations, and comprehensive tuning guidance.',
          url: 'https://modbot911.com',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free AI-powered Porsche modification advice',
          },
          featureList: [
            'AI-powered Porsche 911 modification advice',
            'Smart product recommendations with affiliate links',
            'Comprehensive FAQ system with 25+ expert answers',
            'Mobile-optimized chat interface with conversation memory',
            'Expert tuning guidance for all 911 generations',
            'Installation difficulty ratings and guides',
            'Budget-based modification planning',
            'Real-time product price comparisons',
          ],
          audience: {
            '@type': 'Audience',
            audienceType: 'Porsche 911 owners and enthusiasts',
          },
          creator: {
            '@type': 'Organization',
            name: 'ModBot 911',
            description: 'AI-powered automotive modification experts',
          },
        }}
      />
      <main className="min-h-screen bg-black text-white font-sans">
        <Hero />
        <ProductGrid />
        <HotDeals />
        <div id="chat-section">
          <ChatBox
            input={input}
            setInput={setInput}
            messages={messages}
            error={error}
            loading={loading}
            sendMessage={sendMessage}
            clearHistory={clearHistory}
          />
        </div>
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
