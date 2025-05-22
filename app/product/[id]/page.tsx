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
    <>
      <Header onSearch={() => {}} />
      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10 bg-white text-black">
        <div className="w-full h-96 relative">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-green-600 font-semibold">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="qty">Quantity:</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 bg-gray-100 rounded"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>

          <div className="mt-6">
            <h3 className="font-semibold">Customer Reviews</h3>
            <p className="text-yellow-500 mt-1">
              ★★★★☆ (Rating: {product.rating})
            </p>
            <p className="text-sm italic mt-1">"Excellent product!"</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
