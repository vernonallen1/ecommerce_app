import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import type { ProductItem } from '../models/Product';

const ProductGrid = ({ items }: { items: ProductItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-6">
      {items.slice(0, 20).map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => navigate(`/product/${item.product_id}`)}
          className="bg-slate-800 group rounded-xl shadow-md overflow-hidden relative cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Product Image */}
          <div className="relative h-60 w-full overflow-hidden rounded-2xl shadow-lg group">
            {/* Product image */}
            <img
              src={`https://picsum.photos/400?random=${item.product_id}`}
              alt={item.product}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />

            {/* Top overlay — store name */}
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/60 to-transparent p-2">
              <h4 className="text-gray-100 text-xs font-bold truncate">
                {item.store}
              </h4>
            </div>

            <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 ${hoveredIndex === index ? 'bottom-10 transition-all duration-300' : ''}`}>
              <div className="flex flex-col">
                <h3 className="text-white text-sm font-semibold truncate">
                  {item.product}
                </h3>
                <p className="text-amber-300 text-xs font-semibold mt-1">
                  ₱{item.price?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Hover Add to Cart */}
          <div
            className={`absolute bottom-0 left-0 w-full bg-blue-600 text-white text-center font-semibold py-2 transition-all duration-300 ${
              hoveredIndex === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }`}
          >
            Add to Cart
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid