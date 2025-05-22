"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import productsData from "@/data/products.json";
import Header from "@/components/Header";
import useCart from "@/hooks/useCart";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const productId = parseInt(id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const selected = productsData.find((item) => item.id === productId);
    setProduct(selected || null);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      toast.success(`${product.name} added to cart`);
    }
  };

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header onSearch={() => {}} />
      <div className="p-8 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 h-96 relative rounded-lg overflow-hidden mt-20 mr-10 ">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 md:w-1/2">
          <h2 className="text-4xl font-extrabold leading-tight">
            {product.name}
          </h2>

          <p className="text-2xl text-green-600 font-semibold tracking-wide">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            Category: {product.category}
          </p>

          <p className="text-gray-700 leading-relaxed min-h-[4rem]">
            {product.description || "No description available."}
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="qty"
              className="font-medium text-gray-700 cursor-pointer select-none"
            >
              Quantity:
            </label>
            <input
              id="qty"
              type="number"
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 1) setQuantity(val);
              }}
              className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select quantity"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 inline-flex items-center gap-2 justify-center px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Add product to cart"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-lg">Customer Reviews</h3>
            <p className="text-yellow-500 mt-1 text-xl tracking-wider">
              ★★★★☆ (Rating: {product.rating})
            </p>
            <p className="text-sm italic mt-2 text-gray-600">
              "Excellent product!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ProductPage;
