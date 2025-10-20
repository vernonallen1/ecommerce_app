import {useState} from 'react'

const ProductGrid = ({items, gridCols} : {items: Array<{name: string}>, gridCols: number}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
    <div className={`grid grid-cols-${gridCols} sm:grid-cols-${gridCols} lg:grid-cols-${gridCols} gap-6`}>
        {items.map((item, index) => (
            <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="bg-white rounded-xl shadow-md overflow-hidden relative group cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
            >
            <div className="h-60 bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
                {item.name}
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
  )
}

export default ProductGrid