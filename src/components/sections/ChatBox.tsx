import React, { useEffect, useRef, useState } from 'react';
import SocialShare from '../SocialShare';

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const previousMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom only when new messages are added, not on initial load
  useEffect(() => {
    // Skip auto-scroll on initial load to prevent page from scrolling down
    if (isInitialLoad) {
      setIsInitialLoad(false);
      previousMessagesLength.current = messages.length;
      return;
    }

    // Only scroll if messages were actually added (not just loaded from localStorage)
    if (messages.length > previousMessagesLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    previousMessagesLength.current = messages.length;
  }, [messages, loading, isInitialLoad]);

  return (
    <section id="chat" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="bg-zinc-900 p-4 sm:p-6 lg:p-8 rounded-xl space-y-4 sm:space-y-6 shadow-xl border border-zinc-700">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            💬 Chat with ModBot 911
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Get expert AI-powered advice on your Porsche 911 modifications
          </p>
        </div>

        {error && (
          <div className="bg-red-800/50 border border-red-600 text-red-200 p-3 sm:p-4 rounded-lg">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4 min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] max-h-[400px] sm:max-h-[500px] overflow-y-auto px-2 sm:px-3">
          {messages.length === 0 && (
            <div className="text-center text-zinc-400 py-8 sm:py-12">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">👋</div>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">Welcome to ModBot 911!</p>
              <p className="text-sm sm:text-base lg:text-lg text-zinc-500 max-w-md mx-auto">
                Ask me anything about Porsche 911 modifications, performance upgrades, or installation advice
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  &quot;Best intake for 991.1?&quot;
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  &quot;Exhaust recommendations?&quot;
                </span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  &quot;Turbo upgrade options?&quot;
                </span>
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => {
            const isUser = msg.startsWith('👤');
            const cleanMsg = msg.replace(/^(👤 You: |🚗 ModBot 911: )/, '');
            
            // Check if bot message contains product recommendations (contains links)
            const hasProductLinks = !isUser && cleanMsg.includes('[') && cleanMsg.includes('](');
            
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
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-300">
                        <span>🚗</span>
                        <span className="font-semibold">ModBot 911</span>
                      </div>
                      
                      {/* Social Share for product recommendations */}
                      {hasProductLinks && (
                        <SocialShare
                          productName="Porsche 911 Mod Recommendation"
                          productUrl={`${window.location.origin}/#chat`}
                          recommendationText={cleanMsg.substring(0, 100) + (cleanMsg.length > 100 ? '...' : '')}
                        />
                      )}
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

        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
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
              className="flex-grow px-4 py-4 rounded-lg bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base min-h-[44px] touch-manipulation"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px] touch-manipulation text-base"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Sending</span>
                </>
              ) : (
                <>
                  <span className="text-lg">💬</span>
                  <span className="hidden sm:inline">Ask ModBot</span>
                  <span className="sm:hidden">Ask</span>
                </>
              )}
            </button>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-zinc-500">
              {messages.length > 0 && `${Math.ceil(messages.length / 2)} messages`}
            </span>
            <button
              onClick={clearHistory}
              className="text-zinc-400 hover:text-red-400 underline transition-colors p-2 min-h-[44px] touch-manipulation"
            >
              🗑️ <span className="hidden sm:inline">Clear History</span><span className="sm:hidden">Clear</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
