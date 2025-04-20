'use client';
import { useParams} from 'next/navigation';
import CaseCard3 from '@/app/components/cart3';
import { useEffect } from 'react';

const caseCategories = [
  {id:'001', name: '3D CASE', image: '/images/3d.jpg', price: '$20.00', discountPrice: '$15.00'},
  {id:'002', name: '3D CASE', image: '/images/3d.jpg', price: '$30.00', discountPrice: '$16.00'},
  {id:'003', name: '3D CASE', image: '/images/3d.jpg', price: '$30.00', discountPrice: '$16.00'},
  {id:'004', name: '3D CASE', image: '/images/3d.jpg', price: '$30.00', discountPrice: '$16.00'},
  {id:'005', name: '54D CASE', image: '/images/3d.jpg', price: '$30.00', discountPrice: '$16.00'},
  // More categories...
];

type CartItem = {
  name: string;
  discountPrice: string;  // Price should be string, as it's formatted like "$20.00"
  image: string;
  id: string;  
};

const addToCart = (item: CartItem) => {
  const cartItem = {
    id: `${item.name}-${Date.now()}`,
    name: item.name,
    price: item.discountPrice,
    image: item.image,
    type: 'phone-case'
  };

  // Get existing cart items
  const existingCart = localStorage.getItem('cart');
  const cartItems = existingCart ? JSON.parse(existingCart) : [];
  
  // Add new item
  cartItems.push(cartItem);
  
  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export default function PhoneCaseTypePage() {
  const params = useParams();
  const { type } = params;
  

  useEffect(() => {
    const handleCartClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cart-icon')) {
        const card = target.closest('.case-card');
        if (card) {
          const itemData = {
            id: card.getAttribute('data-name') ?? '', // Use name as a unique identifier
            name: card.getAttribute('data-name') ?? '', // Fallback to empty string if null
            image: card.getAttribute('data-image') ?? '', // Fallback to empty string if null
            discountPrice: card.getAttribute('data-discount-price') ?? '', // Fallback to empty string if null
          };
          addToCart(itemData);
        }
      }
    };

    document.addEventListener('click', handleCartClick);
    return () => document.removeEventListener('click', handleCartClick);
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-[90%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
        <h1 className="text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold md:w-[848px] md:h-[110] rounded-[15px] bg-[#3C1630] text-white w-full flex justify-center items-center">
          {type} Cases
        </h1>
        <h2 className="sm:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[1143px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
          96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
        </h2>

        <div className="flex flex-wrap justify-center gap-24">
          {caseCategories.map((item, index) => {
            const href = `/buy?id=${encodeURIComponent(item.id)}`;
            return (
              <div 
                key={index} 
                className="case-card"
                data-name={item.name}
                data-image={item.image}
                data-price={item.price}
                data-discount-price={item.discountPrice}
              >
                <CaseCard3
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  href={href}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
