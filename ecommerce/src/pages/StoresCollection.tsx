import {useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import CategoryBar from '../components/CategoryBar';
import type { Store } from '../models/Store';
import Footer from '../components/Footer';

const StoresCollection = () => {
  const stores: Store[] = [
    {
      name: "Executive Optical",
      images: [
        "https://picsum.photos/seed/eo1/300/200",
        "https://picsum.photos/seed/eo2/300/200",
        "https://picsum.photos/seed/eo3/300/200",
        "https://picsum.photos/seed/eo4/300/200",
        "https://picsum.photos/seed/eo5/300/200",
      ],
      productsCount: 48,
    },
    {
      name: "Watsons",
      images: [
        "https://picsum.photos/seed/watsons1/300/200",
        "https://picsum.photos/seed/watsons2/300/200",
        "https://picsum.photos/seed/watsons3/300/200",
        "https://picsum.photos/seed/watsons4/300/200",
        "https://picsum.photos/seed/watsons5/300/200",
      ],
      productsCount: 82,
    },
    {
      name: "Mercury Drug",
      images: [
        "https://picsum.photos/seed/mercury1/300/200",
        "https://picsum.photos/seed/mercury2/300/200",
        "https://picsum.photos/seed/mercury3/300/200",
        "https://picsum.photos/seed/mercury4/300/200",
        "https://picsum.photos/seed/mercury5/300/200",
      ],
      productsCount: 120,
    },
    {
      name: "SM Department Store",
      images: [
        "https://picsum.photos/seed/sm1/300/200",
        "https://picsum.photos/seed/sm2/300/200",
        "https://picsum.photos/seed/sm3/300/200",
        "https://picsum.photos/seed/sm4/300/200",
        "https://picsum.photos/seed/sm5/300/200",
      ],
      productsCount: 310,
    },
    {
      name: "7-Eleven",
      images: [
        "https://picsum.photos/seed/711-1/300/200",
        "https://picsum.photos/seed/711-2/300/200",
        "https://picsum.photos/seed/711-3/300/200",
        "https://picsum.photos/seed/711-4/300/200",
        "https://picsum.photos/seed/711-5/300/200",
      ],
      productsCount: 65,
    },
    {
      name: "Miniso",
      images: [
        "https://picsum.photos/seed/miniso1/300/200",
        "https://picsum.photos/seed/miniso2/300/200",
        "https://picsum.photos/seed/miniso3/300/200",
        "https://picsum.photos/seed/miniso4/300/200",
        "https://picsum.photos/seed/miniso5/300/200",
      ],
      productsCount: 95,
    },
    {
      name: "Unilever Store",
      images: [
        "https://picsum.photos/seed/unilever1/300/200",
        "https://picsum.photos/seed/unilever2/300/200",
        "https://picsum.photos/seed/unilever3/300/200",
        "https://picsum.photos/seed/unilever4/300/200",
        "https://picsum.photos/seed/unilever5/300/200",
      ],
      productsCount: 210,
    },
    {
      name: "National Bookstore",
      images: [
        "https://picsum.photos/seed/nbs1/300/200",
        "https://picsum.photos/seed/nbs2/300/200",
        "https://picsum.photos/seed/nbs3/300/200",
        "https://picsum.photos/seed/nbs4/300/200",
        "https://picsum.photos/seed/nbs5/300/200",
      ],
      productsCount: 134,
    },
    {
      name: "Puregold",
      images: [
        "https://picsum.photos/seed/puregold1/300/200",
        "https://picsum.photos/seed/puregold2/300/200",
        "https://picsum.photos/seed/puregold3/300/200",
        "https://picsum.photos/seed/puregold4/300/200",
        "https://picsum.photos/seed/puregold5/300/200",
      ],
      productsCount: 420,
    },
    {
      name: "Healthy Options",
      images: [
        "https://picsum.photos/seed/healthy1/300/200",
        "https://picsum.photos/seed/healthy2/300/200",
        "https://picsum.photos/seed/healthy3/300/200",
        "https://picsum.photos/seed/healthy4/300/200",
        "https://picsum.photos/seed/healthy5/300/200",
      ],
      productsCount: 160,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <CategoryBar />
      <section className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-md mx-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
          🏪 Top Stores
          </h2>
          <div className="grid grid-cols-5 gap-4">
          {stores.map((s, index) => (
              <div
              key={index}
              className="bg-slate-800 rounded-xl overflow-hidden shadow hover:shadow-blue-500/30 transition-all cursor-pointer"
              >
              <img
                  src={s.images[0]}
                  alt={s.name}
                  className="w-full h-32 object-cover"
              />
              <div className="p-3 text-center">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-gray-400 text-sm">
                  {s.productsCount} products
                  </p>
              </div>
              </div>
          ))}
          </div>
      </section>

      <div className="grid grid-cols-2 px-10 py-10 gap-x-5 gap-y-5 ">
        {stores.map((store) => {
          return <StoreTile store={store}/>
        })}
      </div>
      <Footer />
    </div>
  );
};

const StoreTile = ({store}: {store: Store}) => {
  const navigate = useNavigate();
  return (
    <div 
      className="flex flex-col justify-between items-center p-5 rounded-lg bg-slate-700 shadow-lg hover:shadow-blue-600/40 transition-all duration-300"
      onClick={() => navigate(store.name)}
    >
      <div className='flex w-full items-center justify-between'>
        <span className="text-xl font-bold">{store.name}</span>
        <span className="text-sm text-gray-300">{store.productsCount} products</span>
      </div>
      <div className='grid grid-cols-5 rounded-lg border overflow-hidden mt-3'>
        {store.images.map((image) => {
          return (
            <div>
              <img src={image} alt="" className='hover:scale-110 transition duration-300'/>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default StoresCollection;
