"use client";
import { useParams, useRouter } from "next/navigation";
import CaseCard3 from "@/app/components/cart3";
import { useCart } from "@/app/context/CartContext";
import { TCartItem } from "@/app/types/case.interface";
import { useFindAllCaseQuery } from "@/app/redux/services/case.service";

// Dummy JSON data
export default function PhoneCasesPage() {
  const params = useParams();
  const router = useRouter();
  const { id, type } = params;
  const { addToCart } = useCart();

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
    return <div>Error occurred</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const caseCategories: TCartItem[] = data ? (data as TCartItem[]) : [];

  const handleBuyNow = (item: TCartItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.discountPrice as number,
      image: item.image,
      type: item.type as string,
      quantity: 1,
    };

    addToCart(cartItem);
    router.push("/CheckOut");
  };
  // console.log(caseCategories);
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
            console.log(item)
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
                {1 <= item.stock ? (
                  <CaseCard3
                    image={item.image}
                    name={item.name}
                    price={item.price as number}
                    discountPrice={item.discountPrice as number}
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
