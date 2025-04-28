'use client';

import Image from 'next/image';
import { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import  Fullslide  from '@/app/components/animation/fullslide';

export default function BuyNowPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  console.log(id);
  const product = {
    id: 1,
    name: "Cool Sneakers",
    price: 1200,
    discountPrice: 999,
    image: "/Component 7.png",
    stock: 10,
    productdetails: 'This is a premium pair of sneakers designed for comfort and style. Perfect for all occasions.',
    mobile: 'redminote 9',
    brand: 'realme'
  };

  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image,
      type: 'product',
      brand: product.brand,
      mobile: product.mobile,
      quantity: quantity // Send quantity here
    };

    addToCart(cartItem);

    router.push('/CheckOut');
  };

  return (
    <Fullslide delay={0.1}>
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        
        {/* Product Image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
            <div className="mt-3 space-y-1">
              <p className="text-xl line-through text-gray-400">{product.price}৳</p>
              <p className="text-3xl font-bold text-pink-600">{product.discountPrice}৳</p>
              <p className="text-sm font-medium text-green-600">{product.stock ? "In Stock" : "Out of Stock"}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Select Quantity:</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
              >−</button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border border-gray-300 rounded-md p-1 shadow-sm"
              />
              <button 
                onClick={() => setQuantity(prev => Math.min(Number(product.stock), prev + 1))}
                disabled={quantity >= Number(product.stock)}
                className={`w-8 h-8 rounded-full text-lg font-bold transition 
                  ${quantity >= Number(product.stock) ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}>+</button>
            </div>
          </div>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
          >
            Buy Now
          </button>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <Image src="/call.png" alt="Call" width={20} height={20} />
            <span>Need Help? Call Now!</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12 max-w-4xl bg-white rounded-xl p-6 shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product Details</h2>
        <p className="text-gray-600 leading-relaxed">{product.productdetails}</p>
      </div>
    </div></Fullslide>
  );
}
