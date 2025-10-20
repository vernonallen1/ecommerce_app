import {useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import {Laptop, Shirt, Sofa, HeartPulse, Dumbbell, Apple, Book, Blocks, Wrench, Cat, type LucideIcon} from 'lucide-react';

interface Category {
  name: string;
  icon: LucideIcon; // ✅ This ensures type safety for icons
}

const StoresCollection = () => {
  const categories = [
    {name: 'Electronics & Gadgets', icon: Laptop},
    {name: 'Fashion & Apparel', icon: Shirt},
    {name: 'Home & Living', icon: Sofa},
    {name: 'Health & Beauty', icon: HeartPulse},
    {name: 'Sports & Outdoors', icon: Dumbbell},
    {name: 'Groceries & Essentials', icon: Apple},
    {name: 'Books & Stationery', icon: Book},
    {name: 'Toys & Hobbies', icon: Blocks},
    {name: 'Automotive & Tools', icon: Wrench},
    {name: 'Pets & Accessories', icon: Cat},
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex items-center w-full bg-slate-700">
        {categories.map((category, index) => (
          <CategoryBadge key={index} category={category} />
        ))}
      </div>

      <div className="flex flex-col h-full py-5 items-center space-y-4">
        <StoreTile name="Nestle" productsCount={32} path="nestle"/>
        <StoreTile name="Unilever" productsCount={20} path="unilever"/>
        <StoreTile name="Procter & Gamble" productsCount={15} path="procter_and_gamble"/>
      </div>
    </div>
  );
};

const CategoryBadge = ({ category }: { category: Category }) => {
  const [categoryClick, setCategoryClick] = useState(false);

  return (
    <div
      onClick={() => setCategoryClick(!categoryClick)}
      className={`flex items-center justify-center text-white font-semibold px-4 py-2 rounded-xl 
                  hover:bg-blue-600 cursor-pointer transition-all duration-200
                  ${categoryClick ? "bg-blue-700" : "bg-slate-700"}`}
      style={{ width: categoryClick ? "120px" : "100px", minWidth: "100px" }} // 👈 consistent width
    >
      <category.icon size={25} className={`mb-1 ${categoryClick ? 'mr-1' : ''}`} />
      {categoryClick && <span className="text-xs text-center leading-tight break-words line-clamp-2">
        {category.name}
      </span>}
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
      className="flex justify-between items-center w-11/12 md:w-1/2 p-5 rounded-lg bg-slate-800 shadow-lg hover:shadow-blue-600/40 transition-all duration-300"
      onClick={() => navigate(path)}
    >
      <span className="text-xl font-bold">{name}</span>
      <span className="text-sm text-gray-300">{productsCount} products</span>
    </div>
  );
};

export default StoresCollection;
