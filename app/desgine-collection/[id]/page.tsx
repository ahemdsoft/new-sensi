"use client";
import { useParams } from "next/navigation";
import CaseCard3 from "@/app/components/cart3";


// Dummy JSON data
const caseCategories = [
  {
    id: "201",
    name: "3D CASE",
    image: "/desgine/anime.png",
    price: 25.0,
    discountPrice: 20.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "202",
    name: "3D CASE",
    image: "/Component 7.png",
    price: 35.0,
    discountPrice: 30.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  // Additional cases with unique id
  {
    id: "201",
    name: "3D CASE",
    image: "/Component 6.png",
    price: 25.0,
    discountPrice: 20.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "202",
    name: "3D CASE",
    image: "/Component 7.png",
    price: 35.0,
    discountPrice: 30.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "201",
    name: "3D CASE",
    image: "/Component 6.png",
    price: 25.0,
    discountPrice: 20.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "202",
    name: "3D CASE",
    image: "/Component 7.png",
    price: 35.0,
    discountPrice: 30.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "201",
    name: "3D CASE",
    image: "/Component 6.png",
    price: 25.0,
    discountPrice: 20.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "202",
    name: "3D CASE",
    image: "/Component 7.png",
    price: 35.0,
    discountPrice: 30.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "201",
    name: "3D CASE",
    image: "/Component 6.png",
    price: 25.0,
    discountPrice: 20.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  {
    id: "202",
    name: "3D CASE",
    image: "/Component 7.png",
    price: 35.0,
    discountPrice: 30.0,
    stock: 10,
    slug: "3d-case",
    type: "phone-case",
  },
  // Add more cases as needed...
];

export default function DesignCollectionPage() {
  const params = useParams();
  const { id } = params;
  const headline = typeof id === "string" ? id.toUpperCase() : "";

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#ffffff]">
      <div className="w-[90%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
      <h1 className="text-xl sm:text-3xl md:text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold w-full max-w-[848px] rounded-[15px] bg-[#3C1630] text-white flex justify-center items-center px-4 py-2 text-center">
        {headline} CASES
</h1>

<h2 className="text-sm sm:text-xl md:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold w-full max-w-[1143px] bg-[#3C1630] flex justify-center items-center px-4 py-2 rounded-[15.75px] text-center">
  96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
</h2>


        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-24">
          {caseCategories.map((item, index) => {
            const href = `/buy/${item.id}`;

            return (
              <div
                key={index}
                className="case-card"
                data-id={item.id} // Add 'id' as data attribute
                data-name={item.name}
                data-image={item.image}
                data-price={item.price}
                data-discount-price={item.discountPrice}
                data-quantity={1}
              >
                {1 <= item.stock ? (
                  <CaseCard3
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discountPrice={item.discountPrice}
                    href={href}
                  
                    quantity={1}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}