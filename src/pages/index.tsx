
import { useState } from 'react';
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';


export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    setError(null);
    if (!input.trim()) return;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        setError(`\u274C Error: ${data.error}`);
        return;
      }

      setMessages([...messages, `\u{1F464} You: ${input}`, `\u{1F697} ModBot 911: ${data.reply}`]);
      setInput('');
    } catch (err: any) {
      setError(`\u274C Error: ${err.message || 'Something went wrong'}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-black to-zinc-900">
        <h1 className="text-4xl font-extrabold mb-4 text-red-600 uppercase tracking-widest">
          ModBot 911
        </h1>
        <p className="text-xl max-w-xl mx-auto text-zinc-300 mb-6">
          Ask a Porsche 911 tuning expert anything — mods, tools, performance tips.
        </p>
        <button
          onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg inline-flex items-center gap-2"
        >
          Ask the Expert <ArrowRightIcon size={18} />
        </button>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-2">Why ModBot 911?</h2>
          <ul className="text-zinc-300 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircleIcon size={16} className="text-green-400 mt-1" />
              Recommends real parts and brands — Fabspeed, Bilstein, Cobb, and more.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon size={16} className="text-green-400 mt-1" />
              Explains horsepower gains, ride feel, and installation risks.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon size={16} className="text-green-400 mt-1" />
              Provides mod tips for 996, 997, 991, and 992 owners.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon size={16} className="text-green-400 mt-1" />
              Suggests tools and [Affiliate_Links] to help you build smarter.
            </li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-6 shadow">
          <p className="text-sm text-zinc-400 mb-2">Sample question:</p>
          <p className="bg-zinc-800 p-4 rounded text-sm">
            “What suspension upgrades are best for a 997.2 used on track and daily?”
          </p>
        </div>
      </section>
<ProductGrid />

      {/* CHAT SECTION */}
      <section id="chat" className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-zinc-900 p-6 rounded-xl space-y-4 shadow-lg">
          <h2 className="text-xl font-semibold text-white">ModBot Live Chat</h2>

          {error && (
            <p className="bg-red-800 text-red-200 p-2 rounded">{error}</p>
          )}

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
        </div>

        <footer className="text-center text-xs text-zinc-500 pt-10">
          © {new Date().getFullYear()} ModBot 911 • Powered by ChatGPT + Porsche mod culture
        </footer>
      </section>
    </main>
  );
}
