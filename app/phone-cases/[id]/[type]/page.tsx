'use client';
import { useParams, useRouter } from 'next/navigation';
import CaseCard3 from '@/app/components/cart3';
import { useCart } from '@/app/context/CartContext';

// Dummy JSON data
const caseCategories = [
  {
    id: 201,
    name: '3D CASE',
    image: '/Component 6.png',
    price: 25.00,
    discountPrice: 20.00,
    mobile: 'iphone 13',
    stock: 10,
    brand: 'apple'
  },
  {
    id: 202,
    name: '3D CASE',
    image: '/Component 7.png',
    price: 35.00,
    discountPrice: 30.00,
    mobile: 'iphone 13',
    stock: 10,
    brand: 'apple'
  },
  {
    id: 203,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 35.00,
    discountPrice: 30.00,
    mobile: 'iphone 13',
    brand: 'apple',
    stock: 10,
  },
];

type CartItem = {
  id: number;
  name: string;
  discountPrice: number;
  image: string;
  mobile: string;
  brand: string;
};

export default function PhoneCasesPage() {
  const params = useParams();
  const router = useRouter();
  const { id, type } = params;
  const { addToCart } = useCart();

  const handleBuyNow = (item: CartItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.discountPrice,
      image: item.image,
      type: 'phone-case',
      mobile: item.mobile,
      brand: item.brand,
      quantity: 1,
    };
    
    addToCart(cartItem);
    router.push('/CheckOut');
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-[90%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
        <h1 className="text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold md:w-[848px] md:h-[110] rounded-[15px] bg-[#3C1630] text-white w-full flex justify-center items-center">
          {id} {type} Cases
        </h1>
        <h2 className="sm:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[1143px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
          96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
        </h2>

        <div className="flex flex-wrap justify-center gap-24">
          {caseCategories.map((item, index) => {
            const href = `/buy/${item.id}`;

            return (
              <div 
                key={index} 
                className="case-card"
                data-id={item.id}
                data-name={item.name}
                data-image={item.image}
                data-price={item.price}
                data-discount-price={item.discountPrice}
              >
                {(1 <= item.stock) ? (
                  <CaseCard3
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discountPrice={item.discountPrice}
                    href={href}
                    onBuyNow={() => handleBuyNow(item)}
                    quantity={1}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
