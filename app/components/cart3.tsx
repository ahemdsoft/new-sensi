/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import FadeInOnScroll from "./animation/fadeinscrool";
import Image from "next/image";

export default function CaseCard3({
  image,
  name,
  href,
  price,
  discountPrice,
  quantity,
}: {
  image: string;
  name: string;
  href: string;
 
  price: number;
  discountPrice: number;
  quantity: number;
}) {
  const params = useParams();
  const type = params.type as string;
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent bubbling up to Link
    const cartItem = {
      name,
      price: discountPrice,
      image,
      type,
      brand: "",
      mobile: "",
      quantity,
    };
    addToCart(cartItem);
  };
  

  return (
    <FadeInOnScroll delay={0.1}>
      <Link
        href={href}
        className="group relative block 
        md:w-[300px] md:h-[450px]
        bg-white border border-gray-300 shadow-sm rounded-md 
        p-3 cursor-pointer hover:shadow-lg hover:shadow-gray-500 transition duration-300"
      
      >
        {/* SALE Badge */}
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 z-20 rounded">
          Sale
        </div>

        {/* Product Image */}
        <div className="w-full flex justify-center">
          <div className="relative hover:scale-105 transition-transform duration-300
            w-[90px] h-[90px] 
            sm:w-[110px] sm:h-[110px] 
            md:w-[160px] md:h-[200px] 
            xl:w-[200px] xl:h-[300px]">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100px, (max-width: 1024px) 140px, 180px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Title */}
        <div className="mt-4 text-center">
          <h3 className="text-xs sm:text-sm md:text-base xl:text-lg font-semibold text-black uppercase leading-snug">
            {name}
          </h3>
        </div>

        {/* Prices */}
        <div className="mt-2 text-center">
          <span className="line-through text-gray-500 text-xs md:text-sm mr-2">
            {price}৳
          </span>
          <span className="text-black font-bold text-sm md:text-base xl:text-lg">
            {discountPrice}৳
          </span>
          <div className="text-red-500 text-xs font-medium mt-1">Save {Math.round(100-((discountPrice/price)*100))}%</div>
        </div>

        {/* Cart Icon */}
        <div
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 text-black hover:text-pink-600 transition"
        >
          <FiShoppingBag className="text-xl md:text-2xl" />
        </div>
      </Link>
    </FadeInOnScroll>
  );
}