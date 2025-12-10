import React from "react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import ProductGrid from "../components/ProductGrid";
import type { ProductItem } from "../models/Product";
import type { Store } from "../models/Store";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Marketplace = () => {
  const fetchTrendingProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'GET'
      });
      const data =  await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`Error fetching products: ${error}`);
    }
  }

  const {data: trendingProducts = [], isLoading, error} = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: fetchTrendingProducts,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <CategoryBar />

      <div className="flex-1 px-10 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-start text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Explore Products
            </h1>
            <p className="text-gray-400 mt-1">
              Discover top trending and featured products from various stores.
            </p>
          </div>

          {/* Optional Sort / Filter Controls */}
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition">
              Sort by: Popularity
            </button>
            <button className="px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition">
              Filter
            </button>
          </div>
        </div>

        {/* Product Grid Section */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            🔥 Just For You
          </h2>
          <ProductGrid items={trendingProducts} />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;
