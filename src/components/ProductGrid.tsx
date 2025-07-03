import { useState } from 'react';
import products from '../../data/products.json';

type Product = {
  name: string;
  brand: string;
  link: string;
  image: string;
  category: string;
};

const categories = ['All', 'Suspension', 'Exhaust', 'ECU', 'Tools'];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? (products as Product[])
      : (products as Product[]).filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Recommended Tools & Upgrades
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              activeCategory === cat
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-zinc-800 text-zinc-300 border-zinc-600 hover:border-red-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((product, idx) => (
          <div
            key={idx}
            className="bg-zinc-900 border border-zinc-700 p-4 rounded-2xl shadow hover:shadow-red-600/40 transition flex flex-col"
          >
            <div className="overflow-hidden rounded mb-4 border border-zinc-800">
             <img
             src={product.image}
             alt={product.name}
              className="object-cover h-40 w-full transform transition-transform duration-300 hover:scale-105"
              />
              </div>

            <h3 className="text-white font-semibold text-lg mb-1">
              {product.name}
            </h3>
            <p className="text-zinc-400 text-sm mb-2">Brand: {product.brand}</p>
            <span className="text-xs text-red-400 uppercase tracking-wide mb-4">
              {product.category}
            </span>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm text-center"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
