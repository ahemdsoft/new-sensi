"use client";
import { useParams } from "next/navigation";
import CaseCardType2 from "@/app/components/cart2";
import { TCartItem } from "@/app/types/case.interface";
import { useFindAllCaseQuery } from "@/app/redux/services/case.service";

export default function PhoneCaseTypePage() {
  const params = useParams();
  const id = params.id as string; // this is your main category like "2d", "3d", etc.

  const { data, error, isLoading } = useFindAllCaseQuery(
    id ? { type: id } : {}
  );

  if (error) {
    if ("data" in error) {
      const errData = error.data as { message: string };
      alert(errData.message);
      console.log("error", error);
    } else {
      alert("Something went wrong");
    }
    return <div>Error occurred</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const caseCategories: TCartItem[] = data ? (data as TCartItem[]) : [];

  return (
    <div>
      {caseCategories.map((caseItem: TCartItem) => (
        <div
          key={caseItem.id}
          className="p-4 flex flex-col items-center justify-center min-h-screen bg-[#f7edf7]"
        >
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
      ))}
    </div>
  );
}
