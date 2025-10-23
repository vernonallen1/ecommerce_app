import React from 'react'
import Navbar from '../components/Navbar'
import ProductGrid from '../components/ProductGrid'

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
        <div className="flex flex-col min-h-screen w-full bg-slate-950 text-white">
            <Navbar />
            <div className='flex flex-col mx-10 my-5'>
                <span className='text-left font-bold text-xl text-gray-200 mb-5'>Trending Products</span>
                <ProductGrid items={trendingProducts} gridCols={5}/>
            </div>
        </div>
    )
}

export default TrendingProducts