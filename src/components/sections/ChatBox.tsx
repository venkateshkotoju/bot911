import React, { useEffect, useRef } from 'react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <section id="chat" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
      <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold text-white">ModBot Live Chat</h2>

        {error && (
          <p className="bg-red-800 text-red-200 p-2 rounded">{error}</p>
        )}

        <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto px-2">
          {messages.length === 0 && (
            <div className="text-center text-zinc-400 py-8">
              <p className="text-lg mb-2">👋 Welcome to ModBot 911!</p>
              <p className="text-sm">Ask me anything about Porsche 911 modifications</p>
            </div>
          )}
          
          {messages.map((msg, idx) => {
            const isUser = msg.startsWith('👤');
            const cleanMsg = msg.replace(/^(👤 You: |🚗 ModBot 911: )/, '');
            
            return (
              <div
                key={idx}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    isUser
                      ? 'bg-red-600 text-white rounded-br-sm'
                      : 'bg-zinc-700 text-white rounded-bl-sm'
                  }`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2 mb-1 text-xs text-zinc-300">
                      <span>🚗</span>
                      <span className="font-semibold">ModBot 911</span>
                    </div>
                  )}
                  <div className={isUser ? 'text-right' : ''}>
                    {cleanMsg}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-700 text-white p-3 rounded-lg rounded-bl-sm max-w-[80%]">
                <div className="flex items-center gap-2 mb-1 text-xs text-zinc-300">
                  <span>🚗</span>
                  <span className="font-semibold">ModBot 911</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                  <span className="ml-2 text-xs">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading && input.trim()) {
                sendMessage();
              }
            }}
            placeholder="Ask something like: Best intake for a 991.1?"
            disabled={loading}
            className="flex-grow px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending
              </>
            ) : (
              <>
                <span>💬</span>
                Ask
              </>
            )}
          </button>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500">
            {messages.length > 0 && `${Math.ceil(messages.length / 2)} messages`}
          </span>
          <button
            onClick={clearHistory}
            className="text-zinc-400 hover:text-red-400 underline transition-colors"
          >
            🗑️ Clear History
          </button>
        </div>
      </div>
    </section>
  );
}
