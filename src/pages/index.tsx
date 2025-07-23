import { useEffect, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Hero from '../components/sections/Hero';
import ChatBox from '../components/sections/ChatBox';
import Footer from '../components/sections/Footer';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('modbot-chat-history');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('modbot-chat-history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    setError(null);
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.status !== 200) {
        setError(`❌ Error: ${data.error}`);
        return;
      }

      setMessages([
        ...messages,
        `👤 You: ${input}`,
        `🚗 ModBot 911: ${data.reply}`,
      ]);
      setInput('');
    } catch (err: any) {
      setLoading(false);
      setError(`❌ Error: ${err.message || 'Something went wrong'}`);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('modbot-chat-history');
    setMessages([]);
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Hero />
      <ProductGrid />
      <ChatBox
        input={input}
        setInput={setInput}
        messages={messages}
        setMessages={setMessages}
        error={error}
        setError={setError}
        loading={loading}
        sendMessage={sendMessage}
        clearHistory={clearHistory}
      />
      <Footer />
    </main>
  );
}
