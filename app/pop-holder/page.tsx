"use client";

import CaseCard3 from "@/app/components/cart3";
import { TCartItem } from "@/app/types/case.interface";
import { useFindAllCaseQuery } from "@/app/redux/services/case.service";

export default function PhoneCasesPage() {
 const id="3"
 const type="pop-holder"

  const { data, error, isLoading } = useFindAllCaseQuery({
    type: typeof id === "string" ? id : undefined,
    slug: typeof type === "string" ? type : undefined,
  });

  if (error) {
    if ("data" in error) {
      const errData = error.data as { message: string };
      alert(errData.message);
      console.log("error", error);
    } else {
      alert("Something went wrong");
    }
  }

  const caseCategories: TCartItem[] = data ? (data as TCartItem[]) : [];



  return (
    <div className="p-4 flex flex-col items-center justify-start min-h-screen bg-[#ffffff]">
      <div className="w-[90%] flex flex-col gap-11 justify-center items-center mb-5 mt-5">
       <h1 className="text-xl sm:text-3xl md:text-6xl hover:shadow-[0px_4px_6px_#BF00FF78] font-bold w-full max-w-[848px] rounded-[15px] bg-[#3C1630] text-white flex justify-center items-center px-4 py-2 text-center">
  Cases
</h1>

<h2 className="text-sm sm:text-xl md:text-4xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold w-full max-w-[1143px] bg-[#3C1630] flex justify-center items-center px-4 py-2 rounded-[15.75px] text-center">
  96% COLOUR ACCURACY, GRAPHENE METAL, RUBBER GRIP
</h2>


<div className="flex flex-wrap j">
          {isLoading ? (
            <div className="text-xl font-medium text-gray-600">Loading products...</div>
          ) : caseCategories.length === 0 ? (
            <div>No data found</div>
          ) : (
            caseCategories.map((item, index) => {
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
                  {item.stock >= 1 && (
                    <CaseCard3
                      image={item.image}
                      name={item.name}
                      price={item.price as number}
                      discountPrice={item.discountPrice as number}
                      href={href}
                
                      quantity={1}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
