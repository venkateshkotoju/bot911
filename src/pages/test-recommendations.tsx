import { useState } from 'react';
import Link from 'next/link';

type Recommendation = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  relevanceScore: number;
  matchReasons: string[];
};

export default function TestRecommendations() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);

  const testQueries = [
    "I want more power for my 997 Turbo",
    "Best suspension setup for 991 GT3 track use",
    "Affordable exhaust for 996 Carrera daily driver", 
    "Easy mods for beginner with 992 Carrera S",
    "Premium handling upgrades for experienced tuner"
  ];

  const testRecommendations = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 5 }),
      });

      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.recommendations);
        setExplanation(data.explanation);
        setMetadata(data.metadata);
      } else {
        console.error('Recommendation failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-red-400 hover:text-red-300">
            ← Back to ModBot 911
          </Link>
          <h1 className="text-3xl font-bold mt-4">🧠 Smart Recommendation Engine Test</h1>
          <p className="text-zinc-400 mt-2">
            Test the enhanced product recommendation logic with different queries
          </p>
        </div>

        {/* Query Input */}
        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Query</h2>
          
          {/* Sample Queries */}
          <div className="mb-4">
            <p className="text-sm text-zinc-400 mb-2">Try these sample queries:</p>
            <div className="flex flex-wrap gap-2">
              {testQueries.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sample)}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your Porsche 911 modding question..."
              className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onKeyDown={(e) => e.key === 'Enter' && testRecommendations()}
            />
            <button
              onClick={testRecommendations}
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 text-white rounded font-semibold transition-colors"
            >
              {loading ? 'Testing...' : 'Test 🧠'}
            </button>
          </div>
        </div>

        {/* Metadata */}
        {metadata && (
          <div className="bg-zinc-900 p-4 rounded-xl mb-6">
            <h3 className="font-semibold mb-2">📊 Analysis Metadata</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Total Found:</span>
                <span className="ml-2 text-white">{metadata.totalRecommendations}</span>
              </div>
              <div>
                <span className="text-zinc-400">Top Score:</span>
                <span className="ml-2 text-white">{metadata.topScore}</span>
              </div>
              <div>
                <span className="text-zinc-400">Avg Score:</span>
                <span className="ml-2 text-white">{metadata.averageScore.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}

        {/* AI Explanation */}
        {explanation && (
          <div className="bg-zinc-900 p-6 rounded-xl mb-6">
            <h3 className="text-lg font-semibold mb-3">🤖 AI Explanation</h3>
            <div className="text-zinc-300 whitespace-pre-wrap">{explanation}</div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">🎯 Smart Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((product, index) => (
                <div key={product.id} className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{product.name}</h4>
                      <p className="text-sm text-zinc-400">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-400">${product.price}</div>
                      <div className="text-sm text-yellow-400">⭐ {product.rating}/5</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-sm font-medium text-blue-400">
                      Relevance Score: {product.relevanceScore}
                    </span>
                  </div>
                  
                  {product.matchReasons.length > 0 && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Match Reasons:</p>
                      <ul className="text-xs text-zinc-300 space-y-1">
                        {product.matchReasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && recommendations.length === 0 && explanation && (
          <div className="bg-zinc-900 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-lg font-semibold mb-2">No Strong Matches Found</h3>
            <p className="text-zinc-400">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}