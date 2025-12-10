import { useState } from "react";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import { useNavigate } from "react-router-dom";
import type { ProductItem } from "../models/Product";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Homepage = () => {
  const [selectedTab, setSelectedTab] = useState("Trending");
  const navigate = useNavigate();
  const topStores = [
    { storeName: "TechHaven" },
    { storeName: "UrbanThreads" },
    { storeName: "GreenLeaf Organics" },
    { storeName: "GadgetGalaxy" },
    { storeName: "HomeEssence" },
    { storeName: "PetPalace" },
    { storeName: "BookNook" },
    { storeName: "FitZone" },
    { storeName: "StyleSphere" },
    { storeName: "BeautyBloom" },
  ];
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="flex flex-col items-start ">
        <span className="text-2xl px-10 pt-3 font-bold text-amber-400">
          Featured
        </span>
        <ProductsCarousel />
      </div>

      <div className="flex">
        <div className="flex w-3/4 flex-col ml-5">
          <div className="flex  flex-col ml-5">
            <div className="flex justify-start space-x-8 border-b border-gray-700 pb-2 mr-5">
              {[
                { label: "Trending", path: "/homepage/trending" },
                { label: "Popular", path: "/homepage/popular" },
                { label: "New Arrivals", path: "/homepage/new-arrivals" },
              ].map((item, index) => (
                <span
                  key={index}
                  onClick={() => {
                    setSelectedTab(item.label);
                  }}
                  className={`cursor-pointer text-lg font-semibold transition-all duration-200 
                         hover:text-blue-400 hover:scale-105 relative group ${
                           selectedTab === item.label
                             ? "text-blue-400"
                             : "text-gray-300"
                         }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-[-6px] left-0 w-0 h-[2px] bg-blue-500 rounded-full transition-all duration-300 group-hover:w-full ${
                      selectedTab === item.label ? "w-full" : ""
                    }`}
                  ></span>
                </span>
              ))}
            </div>
          </div>
          <TrendingProducts />
        </div>
        <div className="flex flex-col w-1/4 mr-10">
          <span className="font-bold text-xl text-left text-blue-300">
            Top Stores
          </span>
          <div className="flex flex-col my-4 gap-y-2">
            {topStores.map((item) => {
              return (
                <div className="cursor-pointer bg-slate-700 rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-gray-200 font-semibold text-left px-4 py-3 flex items-center justify-between">
                  <span className="truncate">{item.storeName}</span>
                  <span className="text-sm text-gray-400 hover:text-gray-300">
                    →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProductsCarousel = () => {
  const featured_products = [
    {
      name: "Sunglasses",
      img: "https://picsum.photos/200?random=1",
      store: "Executive Optical",
    },
    {
      name: "Tumbler",
      img: "https://picsum.photos/200?random=2",
      store: "Aquaflask",
    },
    { name: "Jacket", img: "https://picsum.photos/200?random=3", store: "GAP" },
    {
      name: "Mattress",
      img: "https://picsum.photos/200?random=4",
      store: "Mandaue Mattress",
    },
    {
      name: "Coffee Maker",
      img: "https://picsum.photos/200?random=5",
      store: "Hanabishi",
    },
    {
      name: "Cologne",
      img: "https://picsum.photos/200?random=6",
      store: "Old Spice",
    },
    {
      name: "Whiskey",
      img: "https://picsum.photos/200?random=7",
      store: "San Miguel",
    },
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
      className="relative flex items-center w-full my-5 px-5 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left Button */}
      {hovered && (
        <button
          className="absolute left-3 z-10 bg-slate-800 text-gray-200 shadow-md hover:bg-blue-600 hover:text-white rounded-full p-2 transition-all duration-300"
          onClick={handlePrev}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Carousel Container */}
      <div className="w-full overflow-hidden mx-5 rounded-lg">
        <div
          className="flex gap-5 transition-transform duration-500"
          style={{
            transform: `translateX(-${current * 30}%)`,
          }}
        >
          {featured_products.map((item) => (
            <div
              key={item.name}
              className="flex-none w-1/4 bg-slate-700 rounded-xl shadow hover:shadow-xl transition-all overflow-hidden duration-300 cursor-pointer group"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-60 w-full object-cover rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-110 "
              />
              <div className="flex flex-col p-2 text-center">
                <span className="font-medium text-gray-200 group-hover:text-blue-600 transition-colors duration-300">
                  {item.name}
                </span>
                <span className="text-gray-200 text-xs">{item.store}</span>
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
  const fetchTrendingProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'GET'
      });
      const data =  await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching products: ${error}`);
    }
  }

  const {data: trendingProducts = [], isLoading, error} = useQuery<ProductItem[], Error>({
    queryKey: ['trendingProducts'],
    queryFn: fetchTrendingProducts,
  });

  return (
    <div className="mx-5 my-4">
      {/* Display first 10 products only */}
      <ProductGrid
        items={trendingProducts.slice(
          0,
          trendingProducts.length <= 10 ? trendingProducts.length : 10
        )}
      />
    </div>
  );
};

export default Homepage;
