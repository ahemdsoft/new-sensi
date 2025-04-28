'use client';

import { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartOption() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, removeFromCart, cartCount } = useCart();

  // ✅ Updated total calculation using quantity
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);

  return (
    <>
      <button onClick={() => setCartOpen(true)} className="p-2  hover:bg-gray-600 rounded-full transition-colors cursor-pointer relative">
        <svg
          className="w-6 h-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <div
        className={`fixed top-0 right-0 w-full md:w-1/4 h-full bg-white text-black shadow-xl transform transition-transform duration-300 z-[100] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 flex-grow overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col p-2 border rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">৳{item.price.toFixed(2)} × {item.quantity || 1}</p>
                          <p className="text-sm font-medium text-pink-600">৳{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Link
                        href={`/CheckOut`}
                        className="bg-[#3C1630] text-white font-bold px-4 py-1 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200 text-sm"
                        onClick={() => setCartOpen(false)}
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">৳{totalPrice.toFixed(2)}</span>
                </div>

                <Link
                  href="/CheckOut"
                  className="w-full bg-[#3C1630] text-white font-bold py-2 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200 text-center block"
                  onClick={() => setCartOpen(false)}
                >
                  Buy All Items
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
