import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

interface ProductItem {
  name: string;
  image: string;
}

const ProductGrid = ({ items }: { items: ProductItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => navigate(`/product/${item.name}`)}
          className="bg-slate-800 group rounded-xl shadow-md overflow-hidden relative cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Product Image */}
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay gradient for readability */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 to-transparent p-3">
              <h3 className="text-gray-100 text-sm font-semibold truncate">
                {item.name}
              </h3>
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