import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import type { CartModel } from "../models/Cart";
import { getUserId } from "../utils/functions";
import AddressSelector from "../components/AddressSelector.tsx"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Cart = () => {
  const userId = localStorage.getItem('userId');
  const [categorizedData, setCategorizedData] = useState<Array<Record<any, any>>>([]);
  const [openDeliveryAddress, setOpenDeliveryAddress] = useState(true);
  if (!userId) return

  const getCart = async (userId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/${userId}`, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart data: ', error);
    }
  }

  const {data, isLoading, error} = useQuery<CartModel[], Error>({
    queryKey: ['cart'],
    queryFn: () => getCart(parseInt(userId!, 10)),
    enabled: !!userId
  });

  const getTotal = () => {
    let total = 0
    for (let store of categorizedData) {
      let storeTotal = 0
      for (let product of store.products) {
        storeTotal += product.quantity * product.price;
      }
      total += storeTotal;
    }
    return total
  }

  useEffect(() => {
    if (data) {
      setCategorizedData(
        data.reduce((acc: Array<Record<any, any>>, item: CartModel) => {
            const match = acc.find(i => i.store_id === item.store_id)
            if (match) {
              match.products.push(item);
            } else {
              acc.push({
                store_id: item.store_id,
                store_name: item.store_name,
                products: [item]
              })
            }
            return acc;
        }, [])
      )
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (data) {
  //   console.log(data);
  // }

  // useEffect(() => {
  //   console.log(categorizedData);
  // }, [categorizedData]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <AddressSelector />

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
          <ProductList categorizedData={categorizedData} setCategorizedData={setCategorizedData}/>

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
            <span>Php {getTotal()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductTile = ({product, setCategorizedData} : {product: CartModel, setCategorizedData: React.Dispatch<React.SetStateAction<Array<Record<any, any>>>>}) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const updateCategorizedData = (quantity: number) => {
    setCategorizedData((prev: Array<Record<any, any>>) =>
      prev.map((s) => {
        if (s.store_id !== product.store_id) return s;
        const products = (s.products ?? []).map((p: CartModel) =>
          p.product_id === product.product_id ? { ...p, quantity } : p
        );
        return { ...s, products };
      })
    );
  }

  const updateCart = async (product_id: string, product_variant: number, is_wishlisted: boolean, quantity: number) => {
    if (quantity === 0) return;
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: getUserId(),
                product_id: product_id,
                product_variant: product_variant,
                is_wishlisted: is_wishlisted,
                quantity: quantity
            })
        });
        const result = await response.json();
        if (result.success) {
          updateCategorizedData(quantity)
        }
        return result;
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
  }

  useEffect(() => {
    updateCart(product.product_id, product.variant_id, false, quantity);
  }, [quantity])

  const increment = async () => {
    setQuantity(quantity + 1 > product.quantity_left ? quantity : quantity + 1);
  };
  const decrement = async () => {
    quantity > 0 && setQuantity(quantity - 1);
  };


  return (
    <div className="flex items-center gap-4 bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <div className="h-[100px] w-[100px] rounded-md bg-white flex-shrink-0"></div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-white text-left">{product.product_name}</p>
            <p className="text-sm text-gray-400 text-left">{Object.entries(product.variant).map(([key, value]) => `${key}: ${value}`).join(", ")}</p>
            <p className="text-xs text-gray-400 mt-1 text-left">Items Left: {product.quantity_left}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-400">Php {product.price * product.quantity}</p>
            <p className="text-[10px] text-gray-400 text-right">Php {product.price} * {product.quantity}</p>
          </div>
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

const ProductList = ({categorizedData, setCategorizedData}: {categorizedData: Array<Record<any, any>>, setCategorizedData: React.Dispatch<React.SetStateAction<Array<Record<any, any>>>>}) => {
  const [expanded, setExpanded] = useState<Array<number>>([]);

  return (
    <div className="w-full flex flex-col gap-y-5">
      {categorizedData.map((store: Record<any, any>) => {
        return <>
          <div
            onClick={() => setExpanded((prev) => prev.includes(store.store_id) ? prev.filter((s) => s !== store.store_id) : [...prev, store.store_id])}
            className="flex justify-between items-center p-4 bg-slate-700 hover:bg-slate-600 transition rounded-md cursor-pointer shadow-md"
          >
            <div>
              <p className="font-bold text-white text-left">{store.store_name}</p>
              <p className="text-sm text-gray-300 text-left">Total Items: {store.products.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">Subtotal</p>
              <p className="font-bold text-blue-400">Php {store.products.reduce((total: number, item: CartModel) => {
                  total += (item.price * item.quantity);
                  return total;
                } , 0)}
              </p>
            </div>
          </div>

          {expanded.includes(store.store_id) && (
            <div className="mt-1 space-y-3">
              {store.products.map((p: CartModel) => {
                return <ProductTile product={p} setCategorizedData={setCategorizedData}/>
              })}
            </div>
          )}
        </>
      })}
    </div>
  );
};

export default Cart;
