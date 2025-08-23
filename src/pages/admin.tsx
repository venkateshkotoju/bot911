import { useState, useEffect } from 'react';
import Link from 'next/link';
import productsData from '../data/products.json';

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  hotDeal: boolean;
  keywords: string[];
};

type Analytics = {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  averagePrice: number;
  averageRating: number;
  hotDealsCount: number;
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [products] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  // Calculate analytics
  const analytics: Analytics = {
    totalProducts: products.length,
    totalCategories: new Set(products.map(p => p.category)).size,
    totalBrands: new Set(products.map(p => p.brand)).size,
    averagePrice: Number((products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)),
    averageRating: Number((products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)),
    hotDealsCount: products.filter(p => p.hotDeal).length,
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-xl max-w-md w-full border border-zinc-700">
          <h1 className="text-2xl font-bold text-center mb-6">🔐 Admin Panel</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 text-white rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-red-400 hover:text-red-300 text-sm">
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛠️ Admin Panel</h1>
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              📊 Analytics
            </Link>
            <Link href="/" className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded">
              ← Back to Site
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-700">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'products', label: '📦 Products' },
            { id: 'analytics', label: '📈 Analytics' },
            { id: 'subscribers', label: '📧 Subscribers' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-red-400">{analytics.totalProducts}</div>
                <div className="text-sm text-zinc-400">Total Products</div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400">{analytics.totalCategories}</div>
                <div className="text-sm text-zinc-400">Categories</div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-400">{analytics.totalBrands}</div>
                <div className="text-sm text-zinc-400">Brands</div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-400">${analytics.averagePrice}</div>
                <div className="text-sm text-zinc-400">Avg Price</div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-400">{analytics.averageRating}</div>
                <div className="text-sm text-zinc-400">Avg Rating</div>
              </div>
              <div className="bg-zinc-900 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-400">{analytics.hotDealsCount}</div>
                <div className="text-sm text-zinc-400">Hot Deals</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">📋 System Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Product Database</span>
                  <span className="text-green-400">✅ Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chat API</span>
                  <span className="text-green-400">✅ Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Affiliate Tracking</span>
                  <span className="text-green-400">✅ Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Email Subscriptions</span>
                  <span className="text-green-400">✅ Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Product Filters */}
            <div className="bg-zinc-900 p-6 rounded-xl">
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-zinc-800 text-white border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
                  + Add Product
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-zinc-900 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Product</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Brand</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Category</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Price</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Rating</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Status</th>
                      <th className="px-6 py-4 text-sm font-medium text-zinc-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-zinc-800">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{product.name}</div>
                          <div className="text-sm text-zinc-400">{product.id}</div>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">{product.brand}</td>
                        <td className="px-6 py-4">
                          <span className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">${product.price}</td>
                        <td className="px-6 py-4 text-zinc-300">⭐ {product.rating}</td>
                        <td className="px-6 py-4">
                          {product.hotDeal ? (
                            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                              🔥 Hot Deal
                            </span>
                          ) : (
                            <span className="text-zinc-500">Regular</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              href={`/product/${product.id}`}
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              View
                            </Link>
                            <button className="text-yellow-400 hover:text-yellow-300 text-sm">
                              Edit
                            </button>
                            <button className="text-red-400 hover:text-red-300 text-sm">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Category Distribution */}
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">📊 Products by Category</h2>
              <div className="space-y-3">
                {categories.filter(cat => cat !== 'All').map(category => {
                  const count = products.filter(p => p.category === category).length;
                  const percentage = ((count / products.length) * 100).toFixed(1);
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-zinc-300">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-zinc-700 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-zinc-400 w-12">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brand Analysis */}
            <div className="bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">🏷️ Top Brands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...new Set(products.map(p => p.brand))]
                  .map(brand => ({
                    brand,
                    count: products.filter(p => p.brand === brand).length,
                    avgPrice: Number((products.filter(p => p.brand === brand).reduce((sum, p) => sum + p.price, 0) / products.filter(p => p.brand === brand).length).toFixed(2))
                  }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 6)
                  .map(({ brand, count, avgPrice }) => (
                    <div key={brand} className="bg-zinc-800 p-4 rounded-lg">
                      <div className="font-semibold text-white">{brand}</div>
                      <div className="text-sm text-zinc-400">{count} products</div>
                      <div className="text-sm text-zinc-400">Avg: ${avgPrice}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscribers' && (
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">📧 Email Subscribers</h2>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📬</div>
              <p className="text-zinc-400 mb-4">Subscriber management coming soon</p>
              <p className="text-sm text-zinc-500">
                This feature will show email subscribers, their interests, and allow sending newsletters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}