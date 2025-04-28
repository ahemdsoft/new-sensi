'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { useCart } from '../context/CartContext';
import FadeInOnScroll from './animation/fadeinscrool';

export default function CaseCard3({
  image,
  name,
  href,
  onBuyNow,
  price,
  discountPrice,
  quantity,
}: {
  image: string;
  name: string;
  href: string;
  onBuyNow?: () => void;
  price: number;
  discountPrice: number;
  quantity: number;
}) {
  const params = useParams();
  const type = params.type as string;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: Math.floor(Math.random() * 1000000),
      name,
      price: discountPrice,
      image,
      type,
      brand: '',
      mobile: '',
      quantity,
    };
    addToCart(cartItem);
  };

  return (
    <FadeInOnScroll delay={0.1}>
    <div className="group w-[337px] h-[500px] bg-white rounded-[10.5px] flex flex-col justify-between border-2 border-gray-200 shadow-2xl">
      {/* Existing content here */}
    
    
      
      {/* Case Image */}
      <div className="flex justify-center items-center p-4">
        <Link href={href}>
          <div className="perspective-[1000px] mt-2">
            <div className="relative w-[220px] h-[320px] transform-gpu transition-transform duration-500 group-hover:scale-110 group-hover:z-20">
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center px-2">
        <h3 className="text-[16px] font-bold leading-tight text-black uppercase">
          {name}
        </h3>
      </div>

      {/* Price Section */}
      <div className="mt-2 text-center">
        <span className="line-through text-gray-500 text-sm mr-2">
          ৳ {price}
        </span>
        <span className="text-black font-semibold text-lg">
          ৳ {discountPrice}
        </span>
      </div>

      {/* Bottom Panel */}
      <div className="bg-[#D0ECFE] mt-4 px-4 py-3 rounded-b-[10.5px] flex justify-between items-center">
        {/* Wishlist Icon */}
        <FiHeart className="text-black text-[20px] cursor-pointer" />

        {/* Buy Now Button */}
        {onBuyNow ? (
          <button
            onClick={onBuyNow}
            className="bg-[#3C1630] text-white font-bold px-6 cursor-pointer py-2 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
          >
            BUY NOW
          </button>
        ) : (
          <Link
            href={href}
            className="bg-[#3C1630] text-white font-bold px-6 py-2 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
          >
            BUY NOW
          </Link>
        )}

        {/* Cart Icon */}
        <FiShoppingBag
          className="text-black text-[20px] cursor-pointer"
          onClick={handleAddToCart}
        />
      </div>
    </div> </FadeInOnScroll>
  );
}
