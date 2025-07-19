import { useEffect, useState } from 'react';
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

  // Load chat history on first render
  useEffect(() => {
    const stored = localStorage.getItem('modbot-chat-history');
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  // Save chat history after every message update
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
      {/* ... HERO and FEATURES sections ... */}

      <ProductGrid />

      {/* CHAT SECTION */}
      <section id="chat" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl space-y-4 shadow-lg">
          <h2 className="text-xl font-semibold text-white">ModBot Live Chat</h2>

          {error && <p className="bg-red-800 text-red-200 p-2 rounded">{error}</p>}

          <div className="space-y-2 min-h-[200px] max-h-[300px] overflow-y-auto">
  {messages.map((msg, idx) => (
    <p
      key={idx}
      className={`p-2 rounded text-sm whitespace-pre-wrap ${
        msg.startsWith('👤')
          ? 'bg-zinc-800 text-white text-right'
          : 'bg-zinc-700 text-left'
      }`}
    >
      {msg}
    </p>
  ))}

  {/* 👇 Add loading message here */}
  {loading && (
    <p className="p-2 rounded text-sm bg-zinc-800 text-left text-zinc-400 animate-pulse">
      ModBot 911 is thinking...
    </p>
  )}
</div>


          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something like: Best intake for a 991.1?"
              className="flex-grow px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Ask
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={clearHistory}
              className="text-xs text-zinc-400 hover:text-red-400 underline"
            >
              Clear Chat History
            </button>
          </div>
        </div>

        <footer className="text-center text-xs text-zinc-500 pt-10">
          © {new Date().getFullYear()} ModBot 911 • Powered by ChatGPT + Porsche mod culture
        </footer>
      </section>
    </main>
  );
}
