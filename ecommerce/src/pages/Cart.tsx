import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";

const Cart = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 text-white">
      <Navbar />

      {/* Header */}
      <div className="flex justify-center py-6">
        <div className="flex items-center gap-3 bg-slate-800 px-10 py-4 rounded-full shadow-lg">
          <ShoppingBag className="w-6 h-6 text-blue-400" />
          <h1 className="text-3xl font-bold tracking-widest">CART</h1>
        </div>
      </div>

      {/* Delivery Section */}
      <div className="flex justify-between items-center w-11/12 md:w-1/2 mx-auto mt-6 px-4 py-3 bg-slate-800 rounded-xl shadow-md">
        <p className="font-semibold text-lg">Delivery to:</p>
        <button className="rounded-md bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-2 px-4 text-sm">
          Set Address
        </button>
      </div>

      {/* Main Content */}
      <div className="flex justify-center w-full mt-6 pb-10">
        <div className="flex flex-col w-11/12 md:w-1/2 gap-5">
          <ProductList />

          {/* Voucher */}
          <div className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-md shadow-md">
            <div className="flex items-center gap-3 w-full">
              <span className="font-semibold text-sm text-gray-200">Voucher</span>
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 rounded-md px-2 py-1 text-black outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 hover:bg-blue-600 transition text-sm font-bold px-4 py-2 rounded-md">
                Apply
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-slate-800 px-5 py-4 rounded-md shadow-md font-bold text-lg">
            <span>Total</span>
            <span>$239.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductTile = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 0 && setQuantity(quantity - 1);

  return (
    <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <div className="h-[100px] w-[100px] rounded-md bg-white flex-shrink-0"></div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-white">Milk</p>
            <p className="text-sm text-gray-400">500g</p>
            <p className="text-xs text-gray-400 mt-1">Items Left: 2</p>
          </div>
          <p className="text-lg font-bold text-blue-400">$2.99</p>
        </div>

        <div className="flex justify-end items-center mt-3">
          <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
            <button
              onClick={decrement}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 font-bold text-white transition"
            >
              -
            </button>
            <input
              value={quantity}
              readOnly
              className="w-12 h-[36px] text-center bg-slate-900 text-white font-semibold border-x border-gray-700"
            />
            <button
              onClick={increment}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 font-bold text-white transition"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center p-4 bg-slate-700 hover:bg-slate-600 transition rounded-md cursor-pointer shadow-md"
      >
        <div>
          <p className="font-bold text-white">Nestle Corporation</p>
          <p className="text-sm text-gray-300">Total Items: 2</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-300">Subtotal</p>
          <p className="font-bold text-blue-400">$2.99</p>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3">
          <ProductTile />
          <ProductTile />
        </div>
      )}
    </div>
  );
};

export default Cart;
