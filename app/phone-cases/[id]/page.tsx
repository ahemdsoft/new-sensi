"use client";
import { useParams } from "next/navigation";
import CaseCardType2 from "@/app/components/cart2";
import { TCartItem } from "@/app/types/case.interface";

export default function PhoneCaseTypePage() {
  const params = useParams();
  const id = params?.id; // this is your main category like "2d", "3d", etc.

  const caseCategories: TCartItem[] = [
    {
      id: 201,
      name: "3D CASE",
      image: "/Component 6.png",
      price: 25.0,
      discountPrice: 20.0,
      stock: 10,
      slug: "3d-case",
      type: "phone-case",
    },
    {
      id: 202,
      name: "3D CASE",
      image: "/Component 7.png",
      price: 35.0,
      discountPrice: 30.0,
      stock: 10,
      slug: "3d-case",
      type: "phone-case",
    },
    {
      id: 203,
      name: "3D CASE",
      image: "/Component 8.png",
      price: 35.0,
      discountPrice: 30.0,
      stock: 10,
      slug: "3d-case",
      type: "phone-case",
    },
  ];

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#f7edf7]">
      <div className="w-[80%] flex flex-col gap-11 justify-center items-center mb-5 mt-5 h-[100%]">
        <h1 className="text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold md:w-[848px] md:h-[110] rounded-[15px] bg-[#3C1630] text-white w-full flex justify-center items-center">
          {id} Cases
        </h1>
        <h2 className="sm:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[1143px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
          96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
        </h2>

        <div className="flex flex-wrap justify-center gap-24">
          {caseCategories.map((item: TCartItem, index: number) => (
            <CaseCardType2
              key={index}
              image={item.image}
              name={item.name}
              href={`/phone-cases/${id}/${item.slug}`} // dynamic link like /2d/anime
            />
          ))}
        </div>
      </div>
    </div>
  );
}
