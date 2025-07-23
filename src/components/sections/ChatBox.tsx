import React from 'react';

interface ChatBoxProps {
  input: string;
  setInput: (value: string) => void;
  messages: string[];
  error: string | null;
  loading: boolean;
  sendMessage: () => void;
  clearHistory: () => void;
}

export default function ChatBox({
  input,
  setInput,
  messages,
  error,
  loading,
  sendMessage,
  clearHistory,
}: ChatBoxProps) {
  return (
    <section id="chat" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
      <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl space-y-4 shadow-lg">
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
    </section>
  );
}
