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
    <>
      <Header onSearch={() => {}} />
      <div className="max-w-5xl mx-auto p-6 text-black bg-white min-h-screen">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cart.map(({ id, name, price, image, quantity }) => (
                <div
                  key={id}
                  className="flex items-center bg-gray-100 p-4 rounded shadow"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 object-contain mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-green-600 font-bold">₹{price}</p>

                    <div className="flex items-center mt-2 gap-3">
                      <label htmlFor={`qty-${id}`}>Qty:</label>
                      <input
                        id={`qty-${id}`}
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(id, Number(e.target.value))
                        }
                        className="w-16 p-1 border rounded"
                      />
                      <button
                        onClick={() => removeFromCart(id)}
                        className="ml-auto text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-gray-100 p-6 rounded shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
                onClick={() => alert("Checkout feature coming soon!")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
