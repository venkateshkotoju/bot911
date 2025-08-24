import { useEffect, useState } from 'react';
import ProductGrid from '../components/sections/ProductGrid';
import HotDeals from '../components/sections/HotDeals';
import Hero from '../components/sections/Hero';
import ChatBox from '../components/sections/ChatBox';
import Footer from '../components/sections/Footer';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('modbot-chat-history');
    if (stored) {
      try {
        const parsedMessages = JSON.parse(stored);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error('Error parsing stored messages:', error);
        localStorage.removeItem('modbot-chat-history');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modbot-chat-history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    setError(null);
    if (!input.trim() || loading) return;

    const userMessage = `👤 You: ${input}`;
    const currentInput = input;
    
    // Immediately add user message and clear input
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: currentInput,
          conversationHistory: messages // Send conversation context
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status !== 200) {
        setError(`❌ Error: ${data.error}`);
        // Remove the user message if there was an error
        setMessages(prev => prev.slice(0, -1));
        setInput(currentInput); // Restore input
        return;
      }

      const botMessage = `🚗 ModBot 911: ${data.reply}`;
      setMessages(prev => [...prev, botMessage]);
      
    } catch (err: any) {
      setLoading(false);
      setError(`❌ Network Error: ${err.message || 'Connection failed. Please try again.'}`);
      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
      setInput(currentInput); // Restore input
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
        title="ModBot 911 - Expert Porsche 911 Modification Advice & AI-Powered Recommendations"
        description="Get expert AI-powered advice on Porsche 911 modifications for 996, 997, 991, and 992 models. Smart product recommendations, tuning guides, performance parts, installation tips, and comprehensive FAQ."
        keywords={[
          'Porsche 911 modifications',
          'Porsche tuning advice',
          'AI Porsche recommendations',
          'ModBot 911',
          'Porsche performance parts',
          '996 997 991 992 mods',
          'Cobb Accessport Porsche',
          'Porsche exhaust systems',
          'Porsche suspension upgrades',
          'Porsche FAQ',
          'mobile-friendly Porsche advice'
        ]}
        url="https://modbot911.com"
        canonicalUrl="https://modbot911.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "ModBot 911",
          "applicationCategory": "AutomotiveApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "AI-powered Porsche 911 modification advice",
            "Product recommendations with affiliate links",
            "Comprehensive FAQ system",
            "Mobile-optimized chat interface",
            "Expert tuning guidance"
          ]
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
