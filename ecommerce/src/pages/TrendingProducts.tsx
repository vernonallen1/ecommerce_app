import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'
import { useQuery } from '@tanstack/react-query'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const TrendingProducts = () => {
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

    const {data: trendingProducts, isLoading, error} = useQuery({
        queryKey: ['trendingProducts'],
        queryFn: fetchTrendingProducts,
    });

    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-950 text-white">
            <Navbar />
            <div className='flex flex-col mx-10 my-5'>
                <span className='text-left font-bold text-xl text-gray-200 mb-5'>Trending Products</span>
                <ProductGrid items={trendingProducts}/>
            </div>
        </div>
    )
}

export default TrendingProducts