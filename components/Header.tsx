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
    <header className="p-4 bg-gray-800 text-white w-full relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
        {/* Top Row (Logo + Icons) */}
        <div className="w-full flex items-center justify-between lg:justify-start lg:gap-10">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ShoppingBag size={36} />
            <h1 className="text-xl lg:text-2xl font-bold">E-commerce</h1>
          </div>

          {/* Right Section (Cart + Profile) */}
          <div className="flex items-center gap-4 lg:ml-auto">
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

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex w-full sm:w-auto items-center bg-gray-700 rounded overflow-hidden
          lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-96"
        >
          <input
            name="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Only update local state here
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
      </div>
    </header>
  );
};

export default Header;
