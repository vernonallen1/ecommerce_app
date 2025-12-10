import './App.css'
import Store from './pages/Store'
import Cart from './pages/Cart';
import { Routes, Route } from "react-router-dom";
import StoresCollection from './pages/StoresCollection';
import Homepage from './pages/Homepage';
import Marketplace from './pages/Marketplace';
import TrendingProducts from './pages/TrendingProducts';
import Product from './pages/Product';

function App() {
  return (
    <Routes>
      <Route path="/store/:store" element={<Store />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/store" element={<StoresCollection />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/homepage/trending" element={<TrendingProducts />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}
 
export default App