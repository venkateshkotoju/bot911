import products from '../../data/products.json';

type Product = {
  name: string;
  category: string;
  image: string;
  link: string;
};

// Group products by category
const grouped: Record<string, Product[]> = products.reduce((acc, product) => {
  const cat = product.category || 'Other';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(product);
  return acc;
}, {} as Record<string, Product[]>);

export default function HotDeals() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">🔥 Hot Deals</h2>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-red-400">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((product) => (
                <a
                  key={product.name}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-white">{product.name}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
