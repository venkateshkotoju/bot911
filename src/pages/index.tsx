import { useEffect, useState } from 'react';
import ProductGrid from '../components/sections/ProductGrid';
import HotDeals from '../components/sections/HotDeals';

import Hero from '../components/sections/Hero';
import ChatBox from '../components/sections/ChatBox';
import Footer from '../components/sections/Footer';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
    <main className="min-h-screen bg-black text-white font-sans">
      <Hero />
      <ProductGrid />
      <HotDeals />
      <ChatBox
        input={input}
        setInput={setInput}
        messages={messages}
        
        error={error}
        
        loading={loading}
        sendMessage={sendMessage}
        clearHistory={clearHistory}
      />
      <Footer />
    </main>
  );
}
