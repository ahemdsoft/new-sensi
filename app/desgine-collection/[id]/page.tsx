'use client';
import { useParams } from 'next/navigation';
import CaseCard3 from '@/app/components/cart3';
import { useEffect } from 'react';

// Dummy JSON data
const caseCategories = [
  {
    id: '101',  // Added unique id for each product
    name: '3D CASE',
    image: '/images/3d.jpg',
    price: '$20.00',
    discountPrice: '$15.00',
  },
  {
    id: '102',  // Another unique id
    name: '3D CASE',
    image: '/images/3d.jpg',
    price: '$30.00',
    discountPrice: '$16.00',
  },
  // Additional cases with unique id
  {
    id: '103',
    name: '3D CASE',
    image: '/images/3d.jpg',
    price: '$30.00',
    discountPrice: '$16.00',
  },
  // Add more cases as needed...
];
type CartItem = {
  id: string;  // Unique id for each product
  name: string;
  discountPrice: string;  // Price should be string, as it's formatted like "$20.00"
  image: string;
};
// Cart functionality
const addToCart = (item: CartItem) => {
  const cartItem = {
    id: item.id,  // Now using the unique id
    name: item.name,
    price: item.discountPrice,
    image: item.image,
    type: 'design'
  };

  // Get existing cart items
  const existingCart = localStorage.getItem('cart');
  const cartItems = existingCart ? JSON.parse(existingCart) : [];
  
  // Add new item to the cart
  cartItems.push(cartItem);
  
  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export default function DesignCollectionPage() {
  const params = useParams();
  const { id } = params; // Dynamic 'id' like '3d', '2d'
 // Category like anime, football

  // Add event listener for cart clicks
  useEffect(() => {
    const handleCartClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cart-icon')) {
        const card = target.closest('.case-card');
        if (card) {
          const itemData = {
            id: card.getAttribute('data-id')  ?? "",  // Use 'id' for fetching unique product
            name: card.getAttribute('data-name') ?? "",
            image: card.getAttribute('data-image') ?? "",
            price: card.getAttribute('data-price') ?? "",
            discountPrice: card.getAttribute('data-discount-price') ?? "",
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
          {id}  Cases
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
                data-id={item.id}  // Add 'id' as data attribute
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
