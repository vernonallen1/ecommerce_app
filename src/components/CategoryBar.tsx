import {useState} from 'react'
import {Shapes, Laptop, Shirt, Sofa, HeartPulse, Dumbbell, Apple, Book, Blocks, Wrench, Cat, type LucideIcon} from 'lucide-react';

interface Category {
  name: string;
  icon: LucideIcon; // ✅ This ensures type safety for icons
}

const CategoryBar = () => {
    const categories = [
        {name: 'All Products', icon: Shapes},
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
        <div className="flex items-center w-full bg-slate-800">
            {categories.map((category, index) => (
                <CategoryBadge key={index} category={category} />
            ))}
        </div>
    )
}

const CategoryBadge = ({ category }: { category: Category }) => {
  const [categoryClick, setCategoryClick] = useState(false);

  return (
    <div
      onClick={() => setCategoryClick(!categoryClick)}
      className={`flex items-center justify-center text-white font-semibold px-4 py-2 rounded-xl 
                  hover:bg-blue-600 cursor-pointer transition-all duration-200
                  ${categoryClick ? "bg-blue-700" : "bg-slate-800"}`}
      style={{ width: categoryClick ? "120px" : "100px", minWidth: "100px" }} // 👈 consistent width
    >
      <category.icon size={25} className={`mb-1 ${categoryClick ? 'mr-1' : ''}`} />
      {categoryClick && <span className="text-xs text-center leading-tight break-words line-clamp-2">
        {category.name}
      </span>}
    </div>
  );
};

export default CategoryBar