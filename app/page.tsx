"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import productsData from "@/data/products.json";
import Link from "next/link";
import toast from "react-hot-toast";
import useCart, { CartItem } from "@/hooks/useCart";

// Product Type
interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
}

export default function Home() {
  const [price, setPrice] = useState(100000);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { cart, addToCart } = useCart();

  const allCategories = ["Clothing", "Electronics", "Shoes", "Accessories"];
  const allBrands = ["Nike", "Apple", "Samsung", "Zara"];

  const handleCheckboxChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    selected: string[]
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const handleAddToCart = (product: Product) => {
    // Check if already in cart
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.error("Product already in cart!");
      return;
    }
    // Add with quantity 1
    const itemToAdd: CartItem = { ...product, quantity: 1 };
    addToCart(itemToAdd);
    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    const filtered = productsData.filter((product) => {
      const matchesCategory =
        categories.length === 0 || categories.includes(product.category);
      const matchesBrand =
        brands.length === 0 || brands.includes(product.brand);
      const matchesPrice = product.price <= price;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [price, categories, brands, searchQuery]);

  return (
    <>
      <Header onSearch={(query: string) => setSearchQuery(query)} />

      {/* Sidebar Toggle Button for Mobile */}
      <div className="md:hidden bg-gray-800 text-white px-4 py-3">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen bg-white">
        {/* Sidebar */}
        <aside
          className={`w-full md:w-64 bg-gray-800 text-white p-4 z-10 transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block md:sticky top-0 h-screen overflow-y-auto`}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Categories</h2>
              {allCategories.map((category) => (
                <label key={category} className="block mb-1">
                  <input
                    type="checkbox"
                    checked={categories.includes(category)}
                    onChange={() =>
                      handleCheckboxChange(category, setCategories, categories)
                    }
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Price Range</h2>
              <input
                type="range"
                min={100}
                max={100000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-300 mt-1">Up to ₹{price}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Brands</h2>
              {allBrands.map((brand) => (
                <label key={brand} className="block mb-1">
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() =>
                      handleCheckboxChange(brand, setBrands, brands)
                    }
                    className="mr-2"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-4 md:mt-0">
          <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 object-contain bg-white mx-auto"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-medium truncate">
                          {product.name}
                        </h3>
                        <p className="text-green-600 font-bold text-sm sm:text-base md:text-lg">
                          ₹{product.price}
                        </p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } text-sm`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.rating})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm sm:text-base transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h2 className="text-lg font-semibold">
                  No products found for the selected filters.
                </h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
