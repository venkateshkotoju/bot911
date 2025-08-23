import { useState } from 'react';
import productsData from '../../data/products.json';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useComparison } from '../../contexts/ComparisonContext';

type Product = {
  id: string;
  name: string;
  keywords: string[];
  affiliateUrl: string;
  brand: string;
  image: string;
  category: string;
  hotDeal: boolean;
  rating: number;
  price: number;
};


const ProductGrid = () => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { compareProducts, addToCompare, removeFromCompare, isInComparison, canAddMore } = useComparison();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filtered = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesBrand =
      selectedBrand === 'All' || product.brand === selectedBrand;

    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // Sort filtered products
  const sorted = filtered.sort((a, b) => {
    let compareValue = 0;
    
    switch (sortBy) {
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'price':
        compareValue = a.price - b.price;
        break;
      case 'rating':
        compareValue = a.rating - b.rating;
        break;
      case 'brand':
        compareValue = a.brand.localeCompare(b.brand);
        break;
      default:
        compareValue = 0;
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const grouped = sorted.reduce((acc: Record<string, Product[]>, product) => {
  const cat = product.category || "Uncategorized";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(product);
  return acc;
}, {});


  const categories = ['All', ...new Set(productsData.map((p) => p.category))];
  const brands = ['All', ...new Set(productsData.map((p) => p.brand))];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recommended Tools & Upgrades
        <span className="text-sm font-normal text-zinc-400 ml-2">
          ({sorted.length} {sorted.length === 1 ? 'product' : 'products'})
        </span>
      </h2>

      {/* Enhanced Search + Filters */}
      <div className="bg-zinc-800 p-6 rounded-xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-white text-sm font-medium mb-2">
              🔍 Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name, brand, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              📦 Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              🏷️ Brand
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              💰 Price Range: ${priceRange.min} - ${priceRange.max}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full bg-zinc-700 text-white px-3 py-2 rounded border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              📊 Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="brand">Brand</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              🔄 Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full bg-zinc-700 text-white border border-zinc-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedBrand('All');
              setPriceRange({ min: 0, max: 1000 });
              setSortBy('name');
              setSortOrder('asc');
            }}
            className="text-red-400 hover:text-red-300 text-sm underline"
          >
            🗑️ Clear All Filters
          </button>
        </div>
      </div>

      {/* No Results State */}
      {sorted.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
          <p className="text-zinc-400 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedBrand('All');
              setPriceRange({ min: 0, max: 1000 });
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Grouped Product Cards */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-bold text-white uppercase border-b border-zinc-700 pb-2 mb-6">
            {category}
          </h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {items.map((product, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl shadow hover:shadow-red-600/40 transition flex flex-col"
              >
                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded mb-2 inline-block w-fit">
                  {product.category}
                </span>

                <div className="relative">
                  <div className="overflow-hidden rounded mb-4 border border-zinc-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover h-40 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  
                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => {
                      if (isFavorite(product.id)) {
                        removeFromFavorites(product.id);
                      } else {
                        addToFavorites(product);
                      }
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                      isFavorite(product.id)
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-red-400'
                    }`}
                    title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <h4 className="text-white font-semibold text-base sm:text-lg mb-1 flex items-center gap-2">
                  {product.name}
                  {product.hotDeal && (
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                      🔥 Hot Deal
                    </span>
                  )}
                </h4>

                {typeof product.rating === 'number' && (
                  <div className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                    ))}
                    <span className="text-zinc-400 ml-1">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                )}

                <p className="text-zinc-400 text-xs sm:text-sm mb-3">
                  Brand: {product.brand} • ${product.price}
                </p>

                <div className="mt-auto flex gap-2">
                  <a
                    href={`/api/track?id=${product.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Buy ${product.name}`}
                    className="flex-1 text-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Buy Now
                  </a>
                  
                  {/* Compare Button */}
                  <button
                    onClick={() => {
                      if (isInComparison(product.id)) {
                        removeFromCompare(product.id);
                      } else {
                        addToCompare(product);
                      }
                    }}
                    disabled={!canAddMore && !isInComparison(product.id)}
                    className={`px-3 py-2 rounded text-sm transition-colors ${
                      isInComparison(product.id)
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : canAddMore
                        ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                    title={isInComparison(product.id) ? 'Remove from comparison' : 'Add to comparison'}
                  >
                    {isInComparison(product.id) ? '✓' : '⚖️'}
                  </button>
                </div>


              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductGrid;
