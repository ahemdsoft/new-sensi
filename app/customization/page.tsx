'use client';
import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import CaseCard from "@/app/components/cart2";
import Image from "next/image";



const ITEMS_PER_PAGE = 4;
type BrandData = {
  [key: string]: string[];
};

const price = [{ taka: 240 }];

const caseTypes = ["2D", "2D-Max", "3D-Hard", "Soft"];

const brandData: BrandData = {
  Apple: ["iPhone 13", "iPhone 14", "iPhone 15"],
  Samsung: ["Galaxy S21", "Galaxy S22"],
  Xiaomi: ["Mi 11", "Mi 12"],
  Redmi: ["Redmi Note 10", "Redmi Note 11"],
  Oppo: ["Reno 8", "Reno 9"],
  Oneplus: ["Oneplus 9", "Oneplus 10"],
  Vivo: ["Vivo V21", "Vivo V23"],
  Realme: ["Realme 8", "Realme 9"],
  GooglePixel: ["Pixel 6", "Pixel 7"],
  Tecno: ["Tecno Spark 7", "Tecno Pova"],
  Motorola: ["Moto G", "Moto X"],
  Poco: ["Poco X3", "Poco F3"],
  Huawei: ["P30", "P40"],
  Nokia: ["Nokia 6", "Nokia 7"],
  Honor: ["Honor 9X", "Honor 10"]
};

export default function Customization() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedBrand || !selectedModel || !selectedType || !image) {
      console.warn("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("brand", selectedBrand);
    formData.append("model", selectedModel);
    formData.append("type", selectedType);
    formData.append("image", image);
    formData.append("notes", notes);
    formData.append("quantity", quantity.toString());

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData
      });

      const data = await response.text();
      console.log("✅ Posted successfully!", data);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };



  
    const caseCategories = [
      {
        name: 'ANIME DESIGN',
        slug: 'anime',
        image: '/images/design/anime.jpg',
      },
      {
        name: 'MARVEL/DC DESIGN',
        slug: 'marvel-dc',
        image: '/images/design/marvel-dc.jpg',
      },
      {
        name: 'CARS & BIKES DESIGN',
        slug: 'cars-bikes',
        image: '/images/design/cars-bikes.jpg',
      },
      {
        name: 'COUPLE DESIGN',
        slug: 'couple',
        image: '/images/design/couple.jpg',
      },
      {
        name: 'FOOTBALL DESIGN',
        slug: 'football',
        image: '/images/design/football.jpg',
      },
      {
        name: 'TYPOGRAPHY DESIGN',
        slug: 'typography',
        image: '/images/design/typography.jpg',
      },
      {
        name: 'GAMING DESIGN',
        slug: 'gaming',
        image: '/images/design/gaming.jpg',
      },
      {
        name: 'ISLAMIC DESIGN',
        slug: 'islamic',
        image: '/images/design/islamic.jpg',
      },
      {
        name: 'LADIES DESIGN',
        slug: 'ladies',
        image: '/images/design/ladies.jpg',
      },
      {
        name: 'K-POP DESIGN',
        slug: 'k-pop',
        image: '/images/design/k-pop.jpg',
      },
    ];


   const [page, setPage] = useState(0);
  
    const totalPages = Math.ceil(caseCategories.length / ITEMS_PER_PAGE);
  
    const handleNext = () => {
      setPage((prev) => (prev + 1) % totalPages);
    };
  
    const handlePrev = () => {
      setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };
  
    const start = page * ITEMS_PER_PAGE;
    const visibleItems = caseCategories.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="md:h-[100%] md:w-[80%] w-full mt-5 mb-5 flex justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Card className="flex justify-center items-center h-96">
            <CardContent className="flex flex-col justify-center items-center h-full">
              <div className="border border-black w-40 h-80 flex flex-col justify-center items-center rounded-xl overflow-hidden">
                {imagePreview ? (
                 <Image
                 src={imagePreview}
                 alt="Uploaded"
                 layout="responsive"
                 width={500}  // You can adjust these values based on your design
                 height={500} // You can adjust these values based on your design
                 className="object-contain w-full h-full"
               />
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8" />
                    <p className="text-center text-sm font-semibold">Your Design Here</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Customise Your Design</h2>
            <p className="text-gray-600">Tk. {price[0].taka}.00</p>

            {/* Brand selection */}
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(brandData).map((brand) => (
                <Button
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setSelectedModel("");
                  }}
                  className={`transition-colors duration-200 ${
                    selectedBrand === brand
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-black border hover:bg-gray-100"
                  }`}
                >
                  {brand}
                </Button>
              ))}
            </div>

            {/* Model selection */}
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select Model</option>
              {selectedBrand &&
                brandData[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>

            {/* Case type selection */}
            <div className="grid grid-cols-4 gap-2">
              {caseTypes.map((type) => (
                <Button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`transition-colors duration-200 ${
                    selectedType === type
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-white text-black border hover:bg-gray-100"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>

            <Input type="file" onChange={handleImageUpload} />

            <Textarea
              placeholder="Type your instructions here"
              value={notes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">Add To Cart</Button>
              <Button type='submit' onClick={handleSubmit}>Buy Now</Button>
            </div>
          </div>
        </div>
      </div>
       <div className='w-full h-full flex flex-col gap-12 mb-8 justify-evenly items-center'>
          <h2 className="sm:text-3xl hover:shadow-[0px_4px_6px_#00D6EE40] text-white font-semibold md:w-[843px] md:h-[68px] bg-[#3C1630] flex justify-center items-center w-full top-[221.25px] rounded-[15.75px]">
                MORE RElATED PRODUCTS
              </h2>
              <div className="relative w-full overflow-hidden">
            <div className=" flex justify-center flex-wrap gap-10  transition-transform duration-500 ease-in-out">
              {visibleItems.map((item, index) => (
                <CaseCard
                  key={index}
                  image={item.image}
                  name={item.name}
                  href={`/desgine-collection/${item.slug}`}
                />
              ))}
            </div>
      
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
            </button>
          </div>
      
    </div></div>
  
  );
}
