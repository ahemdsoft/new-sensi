'use client';
import { useParams, useRouter } from 'next/navigation';
import CaseCard3 from '@/app/components/cart3';
import { useCart } from '@/app/context/CartContext';


// Dummy JSON data
const caseCategories = [
  {
    id: 101,  // Added unique id for each product
    name: '3D CASE',
    image: '/Component 6.png',
    price: 20.00,
    discountPrice: 15.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'redmi'
  },
  {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  },
  // Additional cases with unique id
  {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  },
  {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  }, {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  }, {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  }, {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  }, {
    id: 103,
    name: '3D CASE',
    image: '/Component 8.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    brand: 'oppo',
    stock: 10,
  },
  {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  }, {
    id: 102,  // Another unique id
    name: '3D CASE',
    image: '/Component 7.png',
    price: 30.00,
    discountPrice: 16.00,
    mobile: 'redminote 9',
    stock: 10,
    brand: 'realme'
  },
  // Add more cases as needed...
];

type CartItem = {
  id: number;  // Unique id for each product
  name: string;
  discountPrice: number;  // Price should be number
  image: string;
  mobile: string;
  brand: string;
};

export default function DesignCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // Dynamic 'id' like '3d', '2d'
  const { addToCart } = useCart();

  const handleBuyNow = (item: CartItem) => {
    const cartItem = {
      id: item.id,  // Now using the unique id
      name: item.name,
      price: item.discountPrice,
      image: item.image,
      type: 'design',
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
          {id}  Cases
        </h1>
        <h2 className="sm:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[1143px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
          96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
        </h2>

        <div className="flex flex-wrap justify-center gap-24">
          {caseCategories.map((item, index) => {
            const href = `/buy/${(item.id)}`;

            return (
              <div 
                key={index} 
                className="case-card"
                data-id={item.id}  // Add 'id' as data attribute
                data-name={item.name}
                data-image={item.image}
                data-price={item.price}
                data-discount-price={item.discountPrice}
                data-quantity={1}
              >{(1<=item.stock)?
                <CaseCard3
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  href={href}
                  onBuyNow={() => handleBuyNow(item)}
                  quantity={1}
                />:""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
