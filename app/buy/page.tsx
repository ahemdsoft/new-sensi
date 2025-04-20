'use client';


import Image from 'next/image';
import { useState } from "react";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BuyNowPage() {
 
 const params = useParams();
  const { buyid } = params;
  console.log(buyid); 
 
  const product = {
    name: "Cool Sneakers",
    price: "1200৳",
    discountPrice: "999৳",
    image: "/sneakers.jpg",
    stock: 'true',
  };

  const [quantity, setQuantity] = useState(1);



  return (
    <div className='w-full h-full flex flex-col gap-12 text-black mb-8 justify-evenly items-center'>
      
      <div className="flex justify-center flex-col gap-8 mt-3 mb-3.5 items-center">
        <div className="container w-[60%] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product Image */}
          <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="space-y-2"> 
            <p className="text-xl line-through text-gray-500">{product.price}</p>
            <h2 className="text-2xl font-semibold text-green-600">{product.discountPrice}</h2>
            <p className="text-green-600">{product.stock ? "In Stock" : "Out of Stock"}</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">Quantity</label>
            <div className="flex gap-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border rounded-md p-1"
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <Link href={`/CheckOut?&quantity=${quantity}`}>
            <button 
              className="w-full bg-[#3C1630] text-white font-bold py-3 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
            >
              Buy Now
            </button>
            </Link>
            <Image src="/call.png" alt="phone" width={20} height={20} />
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
