"use client";

import { CircleUser, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const items = savedCart ? JSON.parse(savedCart) : [];
    setCartItems(items);
  }, []);

  return (
    <header className="w-full p-4 bg-gray-800 text-white relative">
      <div className="mx-auto flex items-center justify-between w-full relative">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <ShoppingBag size={36} />
          <h1 className="text-xl lg:text-2xl font-bold">E-Store</h1>
        </div>

        {/* Search Bar - Centered for large screens */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-gray-700 rounded overflow-hidden absolute left-1/2 transform -translate-x-1/2 w-96"
        >
          <input
            name="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            aria-label="Search"
            className="w-full p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600"
            aria-label="Search Button"
          >
            <Search className="text-white" />
          </button>
        </form>

        {/* Cart & Profile */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCart
              className="text-gray-400 hover:text-white"
              size={28}
              aria-label="Shopping cart"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Profile Icon */}
          <CircleUser
            className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer"
            aria-label="User Profile"
          />
        </div>
      </div>

      {/* Search bar for small screens */}
      <form
        onSubmit={handleSearch}
        className="flex lg:hidden mt-4 items-center bg-gray-700 rounded overflow-hidden w-full"
      >
        <input
          name="search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          aria-label="Search"
          className="w-full p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600"
          aria-label="Search Button"
        >
          <Search className="text-white" />
        </button>
      </form>
    </header>
  );
};

export default Header;
