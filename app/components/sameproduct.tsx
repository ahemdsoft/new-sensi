'use client';
import { useEffect, useState } from "react";
import CaseCard from "@/app/components/cart2";
import { TCartItem } from "../types/case.interface";
import { useFindAllCaseQuery } from "../redux/services/case.service";

const ITEMS_PER_PAGE = 4;

export default function Sameproduct({type, id}: {type: string, id?: string}) {
  const [caseCategories, setCaseCategories] = useState<TCartItem[]>([]);
  const {data, error, isLoading} = useFindAllCaseQuery({type});
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(caseCategories.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const visibleItems = caseCategories.slice(start, start + ITEMS_PER_PAGE);

  useEffect(() => {
    if (data) {
      const datas = data.filter((item: TCartItem) => item.id !== id);
      setCaseCategories(datas);
    }
    if (error) {
      if ("data" in error) {
        const errData = error.data as { message: string };
        alert(errData.message);
        console.log("error", error);
      } else {
        alert("Something went wrong");
      }
    }
  }, [data, error, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-full flex flex-col gap-12 mb-8 justify-evenly items-center'>
      <h2 className="sm:text-3xl text-white font-semibold md:w-[843px] md:h-[68px] bg-[#3C1630] flex justify-center items-center rounded-[15.75px]">
        MORE RELATED PRODUCTS
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="flex justify-center flex-wrap gap-10 transition-transform duration-500 ease-in-out">
          {visibleItems.map((item, index) => (
            <CaseCard
              key={index}
              image={item.image}
              name={item.name}
              href={`/phone-cases/${item.type}/${item.slug}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
        >
          ◀
        </button>
        <button
          onClick={() => setPage((prev) => (prev + 1) % totalPages)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
