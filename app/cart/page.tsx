"use client";
import React from "react";
import Header from "@/components/Header";
import useCart from "@/hooks/useCart";
import { Trash2 } from "lucide-react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Header onSearch={() => {}} />
      <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-16 text-lg italic">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cart.map(({ id, name, price, image, quantity }) => (
                <div
                  key={id}
                  className="flex items-center bg-gray-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-contain mr-6 rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {name}
                    </h3>
                    <p className="text-green-600 font-bold text-lg mt-1">
                      ₹{price.toLocaleString()}
                    </p>

                    <div className="flex items-center mt-4 gap-4">
                      <label
                        htmlFor={`qty-${id}`}
                        className="font-medium text-gray-700 select-none"
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${id}`}
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(
                            id,
                            Math.max(1, Number(e.target.value))
                          )
                        }
                        className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={`Change quantity for ${name}`}
                      />
                      <button
                        onClick={() => removeFromCart(id)}
                        className="ml-auto text-red-600 hover:text-red-800 transition-colors duration-200"
                        aria-label={`Remove ${name} from cart`}
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md h-fit flex flex-col">
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">
                Price Summary
              </h2>
              <div className="flex justify-between text-xl font-bold mb-8">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg shadow-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400"
                onClick={() => alert("Checkout feature coming soon!")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default CartPage;
