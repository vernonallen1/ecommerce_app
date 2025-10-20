import {useState} from 'react'
import Navbar from '../components/Navbar'
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductGrid from '../components/ProductGrid';

const Homepage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />
            <div className='flex flex-col p-5'>
                <span className='text-left text-xl font-bold mx-5'>Featured</span>
                <ProductsCarousel />

                <span className='text-left text-xl font-bold mx-5'>Trending</span>
                <TrendingProducts />
            </div>
        </div>
    )
}

const ProductsCarousel = () => {
  const featured_products = [
    { name: "Sunglasses", img: "https://picsum.photos/200?random=1", store: "Executive Optical" },
    { name: "Tumbler", img: "https://picsum.photos/200?random=2", store: "Aquaflask" },
    { name: "Jacket", img: "https://picsum.photos/200?random=3", store: "GAP" },
    { name: "Mattress", img: "https://picsum.photos/200?random=4", store: "Mandaue Mattress" },
    { name: "Coffee Maker", img: "https://picsum.photos/200?random=5", store: "Hanabishi" },
    { name: "Cologne", img: "https://picsum.photos/200?random=6", store: "Old Spice" },
    { name: "Whiskey", img: "https://picsum.photos/200?random=7", store: "San Miguel" },
  ];

  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current < featured_products.length - 4) setCurrent(current + 1);
  };

  return (
    <div
      className="relative flex items-center w-full my-5 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left Button */}
      {hovered && (
        <button
          className="absolute left-3 z-10 bg-white text-gray-700 shadow-md hover:bg-blue-600 hover:text-white rounded-full p-2 transition-all duration-300"
          onClick={handlePrev}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Carousel Container */}
      <div className="w-full overflow-hidden mx-5">
        <div
          className="flex gap-5 transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 30}%)`, 
          }}
        >
          {featured_products.map((item) => (
            <div
              key={item.name}
              className="flex-none w-1/4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-60 w-full object-cover rounded-t-xl transition-transform duration-300"
              />
              <div className="flex flex-col p-2 text-center">
                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {item.name}
                </span>
                <span className='text-gray-800 text-xs'>
                    {item.store}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      {hovered && (
        <button
          className="absolute right-3 z-10 bg-white text-gray-700 shadow-md hover:bg-blue-600 hover:text-white rounded-full p-2 transition-all duration-300"
          onClick={handleNext}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

const TrendingProducts = () => {
  const trendingProducts = [
    { name: "Sunglasses", img: "https://picsum.photos/200?random=1", store: "Executive Optical" },
    { name: "Tumbler", img: "https://picsum.photos/200?random=2", store: "HydroFlask" },
    { name: "Jacket", img: "https://picsum.photos/200?random=3", store: "The North Face" },
    { name: "Mattress", img: "https://picsum.photos/200?random=4", store: "Uratex" },
    { name: "Coffee Maker", img: "https://picsum.photos/200?random=5", store: "De'Longhi" },
    { name: "Cologne", img: "https://picsum.photos/200?random=6", store: "Bench" },
    { name: "Whiskey", img: "https://picsum.photos/200?random=7", store: "Jack Daniel’s" },
    { name: "Smartwatch", img: "https://picsum.photos/200?random=8", store: "Samsung" },
    { name: "Bluetooth Speaker", img: "https://picsum.photos/200?random=9", store: "JBL" },
    { name: "Running Shoes", img: "https://picsum.photos/200?random=10", store: "Nike" },
    { name: "Laptop Bag", img: "https://picsum.photos/200?random=11", store: "Samsonite" },
    { name: "Power Bank", img: "https://picsum.photos/200?random=12", store: "Anker" },
    { name: "Wireless Mouse", img: "https://picsum.photos/200?random=13", store: "Logitech" },
    { name: "Gaming Keyboard", img: "https://picsum.photos/200?random=14", store: "Razer" },
    { name: "Perfume", img: "https://picsum.photos/200?random=15", store: "Dior" },
    { name: "Tablet", img: "https://picsum.photos/200?random=16", store: "Apple" },
    { name: "Headphones", img: "https://picsum.photos/200?random=17", store: "Sony" },
    { name: "Wristwatch", img: "https://picsum.photos/200?random=18", store: "Casio" },
    { name: "Backpack", img: "https://picsum.photos/200?random=19", store: "Herschel" },
    { name: "Camera", img: "https://picsum.photos/200?random=20", store: "Canon" },
  ];


  return (
    <div className='mx-5 my-4'>
      {/* Display first 10 products only */}
      <ProductGrid items={trendingProducts.slice(0, trendingProducts.length <= 10 ? trendingProducts.length : 10)} gridCols={5}/>
    </div>
    
  )
}

export default Homepage