import products from '../../data/products.json';

type Product = {
  name: string;
  brand: string;
  link: string;
  image: string;
  category: string;
  hotDeal?: boolean;
  rating?: number;
};

export default function ProductGrid() {
  const grouped: Record<string, Product[]> = {};

  (products as Product[]).forEach((product) => {
    if (!grouped[product.category]) grouped[product.category] = [];
    grouped[product.category].push(product);
  });

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Recommended Tools & Upgrades</h2>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-white uppercase border-b border-zinc-700 pb-2 mb-6">
            {category}
          </h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {items.map((product, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-700 p-4 sm:p-5 rounded-xl shadow hover:shadow-red-600/40 transition flex flex-col"
              >
                <span className="text-xs sm:text-sm bg-zinc-800 text-zinc-400 px-2 py-1 rounded mb-2 inline-block w-fit">
                  {product.category}
                </span>

                <div className="overflow-hidden rounded mb-4 border border-zinc-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-40 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>

                <h4 className="text-base sm:text-lg text-white font-semibold mb-1 flex items-center gap-2">
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
                      <span key={i}>
                        {i < Math.floor(product.rating) ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="text-zinc-400 ml-1">({product.rating.toFixed(1)})</span>
                  </div>
                )}

                <p className="text-zinc-400 text-xs sm:text-sm mb-2">Brand: {product.brand}</p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Buy ${product.name}`}
                  className="mt-auto inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm sm:text-base"
                >
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
