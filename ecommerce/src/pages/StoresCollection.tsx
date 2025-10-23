import {useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import CategoryBar from '../components/CategoryBar';

const StoresCollection = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <CategoryBar />

      <div className="flex flex-col h-full py-5 items-center space-y-4">
        <StoreTile name="Nestle" productsCount={32} path="nestle"/>
        <StoreTile name="Unilever" productsCount={20} path="unilever"/>
        <StoreTile name="Procter & Gamble" productsCount={15} path="procter_and_gamble"/>
      </div>
    </div>
  );
};

const StoreTile = ({
  name,
  productsCount,
  path
}: {
  name: string;
  productsCount: number;
  path: string;
}) => {
  const navigate = useNavigate();
  return (
    <div 
      className="flex justify-between items-center w-11/12 md:w-1/2 p-5 rounded-lg bg-slate-700 shadow-lg hover:shadow-blue-600/40 transition-all duration-300"
      onClick={() => navigate(path)}
    >
      <span className="text-xl font-bold">{name}</span>
      <span className="text-sm text-gray-300">{productsCount} products</span>
    </div>
  );
};

export default StoresCollection;
