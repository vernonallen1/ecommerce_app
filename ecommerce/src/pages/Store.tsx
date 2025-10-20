import Navbar from "../components/Navbar";
import {
  ChevronDown,
  ChevronUp,
  Bookmark,
  List,
  LayoutGrid,
  Star,
} from "lucide-react";
import { useState } from "react";
import ProductGrid from "../components/ProductGrid";

const Store = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <StoreBanner />
      <div className="flex flex-col md:flex-row py-10 px-6 md:px-12 gap-8">
        <Filter />
        <Products />
      </div>
    </div>
  );
};

/* -------------------- Store Banner -------------------- */
const StoreBanner = () => {
  const [bookmarked, setBookMarked] = useState(false);

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-8 py-6 md:flex md:items-center md:gap-8">
      <div className="w-40 h-40 bg-white rounded-xl shadow-md flex-shrink-0"></div>

      <div className="flex flex-col mt-6 md:mt-0 md:flex-1 justify-between">
        {/* Store Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">
              Nestle Corporation
            </h1>
            <Bookmark
              size={22}
              className="cursor-pointer"
              fill={bookmarked ? "blue" : "none"}
              stroke={bookmarked ? "blue" : "white"}
              onClick={() => setBookMarked(!bookmarked)}
            />
          </div>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            asperiores eum sint repellat ex, fugiat eveniet quibusdam soluta
            placeat incidunt molestiae.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center bg-slate-800 rounded-xl p-4 mt-6 text-center">
          <Stat label="Products" value="200" />
          <Stat label="Ratings" value="4.8" icon={<Star size={14} className="inline text-yellow-400 ml-1" />} />
          <Stat label="24-hour Sales" value="120" />
          <Stat label="Total Sales" value="5,200" />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div className="flex flex-col">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">
      {value} {icon}
    </p>
  </div>
);

/* -------------------- Filter Sidebar -------------------- */
const Filter = () => {
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [itemExpanded, setItemExpanded] = useState(false);

  return (
    <aside className="w-full md:w-1/4 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2">
        Filters
      </h2>

      <div className="space-y-6">
        {/* Price Filter */}
        <div>
          <FilterHeader
            label="Price"
            expanded={priceExpanded}
            onToggle={() => setPriceExpanded(!priceExpanded)}
          />
          {priceExpanded && (
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <InputWithLabel label="Min" />
                <span className="text-gray-400 mx-3">–</span>
                <InputWithLabel label="Max" />
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 transition w-full py-2 rounded-md font-semibold text-white">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Item Filter */}
        <div>
          <FilterHeader
            label="Items"
            expanded={itemExpanded}
            onToggle={() => setItemExpanded(!itemExpanded)}
          />
          {itemExpanded && <CheckboxFilters />}
        </div>
      </div>
    </aside>
  );
};

const FilterHeader = ({
  label,
  expanded,
  onToggle,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <div
    className="flex justify-between items-center cursor-pointer select-none font-semibold"
    onClick={onToggle}
  >
    {label}
    {expanded ? <ChevronUp /> : <ChevronDown />}
  </div>
);

const InputWithLabel = ({ label }: { label: string }) => (
  <div className="flex flex-col items-start">
    <span className="text-sm text-gray-300 mb-1">{label}</span>
    <input
      type="number"
      className="rounded-lg px-2 py-1 w-20 text-black outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

/* -------------------- Checkbox Filters -------------------- */
const CheckboxFilters = () => {
  const filters = [
    { id: "discounted", label: "Discounted" },
    { id: "in-stock", label: "In Stock" },
    { id: "new-arrival", label: "New Arrival" },
    { id: "top-rated", label: "Top Rated" },
  ];

  return (
    <div className="mt-3 space-y-3">
      {filters.map((filter) => (
        <label
          key={filter.id}
          htmlFor={filter.id}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 rounded-lg p-2 transition"
        >
          <input
            type="checkbox"
            id={filter.id}
            className="w-5 h-5 accent-blue-500"
          />
          <span className="font-medium text-gray-200">{filter.label}</span>
        </label>
      ))}
    </div>
  );
};

/* -------------------- Products Grid -------------------- */
const Products = () => {
  const items = [
    { name: "Shampoo" },
    { name: "Soap" },
    { name: "Tissue" },
    { name: "Cologne" },
    { name: "Milk" },
    { name: "Sugar" },
  ];

  return (
    <section className="flex-1">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex">
          <button className="p-2 border border-slate-700 rounded-l-md hover:bg-slate-800 transition">
            <List size={24} />
          </button>
          <button className="p-2 border border-slate-700 rounded-r-md hover:bg-slate-800 transition">
            <LayoutGrid size={24} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          className="rounded-md text-black px-3 py-2 flex-1 md:flex-initial md:w-64 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select className="text-black rounded-md px-3 py-2 outline-none">
          <option value="">Sort</option>
          <option value="price-asc">Price Ascending</option>
          <option value="price-desc">Price Descending</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
          <option value="reviewed">Best Reviewed</option>
        </select>
      </div>

      {/* Product Grid */}
      <ProductGrid items={items} gridCols={4}/>
    </section>
  );
};

export default Store;
