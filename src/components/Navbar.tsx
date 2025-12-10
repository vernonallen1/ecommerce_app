import { ShoppingBasket, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-slate-900 text-white px-6 md:px-12 py-4 shadow-md">
      {/* Left Section - Logo + Links */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold tracking-wide cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate("/")}
        >
          E<span className="text-blue-500">Commerce</span>
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-semibold">
          <NavLink label="Marketplace" onClick={() => navigate("/marketplace")}/>
          <NavLink label="Stores" onClick={() => navigate("/store")} />
          <NavLink label="Personalized" />
        </div>
      </div>

      {/* Right Section - Search + Icons */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center bg-slate-800 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            className="bg-transparent outline-none px-2 text-sm placeholder-gray-400 w-40 md:w-60"
            placeholder="Search products..."
          />
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2 font-semibold hover:text-blue-400 transition">
          <User size={20} />
          <span className="hidden sm:inline">Profile</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 font-semibold hover:text-blue-400 transition"
        >
          <ShoppingBasket size={20} />
          <span className="hidden sm:inline">Cart</span>

          {/* Cart Item Count */}
          <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
            2
          </span>
        </button>
      </div>
    </nav>
  );
};

const NavLink = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="relative group hover:text-blue-400 transition font-medium"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
  </button>
);

export default Navbar;
