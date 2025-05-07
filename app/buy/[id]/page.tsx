/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Fullslide from "@/app/components/animation/fullslide";
import Sameproduct from "@/app/components/sameproduct";
import { useFindOneCaseQuery } from "@/app/redux/services/case.service";
import { TCartItem } from "@/app/types/case.interface";
import { useFindAllDeviceQuery } from "@/app/redux/services/device.service";

const BRAND_OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Xiaomi', value: 'xiaomi' },
  { label: 'Redmi', value: 'redmi' },
  { label: 'Oppo', value: 'oppo' },
  { label: 'OnePlus', value: 'oneplus' },
  { label: 'Vivo', value: 'vivo' },
  { label: 'Realme', value: 'realme' },
  { label: 'Google Pixel', value: 'googlepixel' },
  { label: 'Tecno', value: 'tecno' },
  { label: 'Motorola', value: 'motorola' },
  { label: 'Poco', value: 'poco' },
  { label: 'Huawei', value: 'huawei' },
  { label: 'Nokia', value: 'nokia' },
  { label: 'Honor', value: 'honor' }
];

export default function BuyNowPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<TCartItem>({} as TCartItem);
  const { data, error, isLoading } = useFindOneCaseQuery(id as string);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Fetch models based on selected brand and case type
  const { data: modelsData } = useFindAllDeviceQuery({
    forCase: product.type,
    brand: selectedBrand,
  });

  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (modelsData) {
      const modelNames = modelsData.map((item: any) => item.model);
      setModels(modelNames);
    }
  }, [modelsData]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
    if (error) {
      if ("data" in error) {
        const errData = error.data as { message: string };
        alert(errData.message);
      } else {
        alert("Something went wrong");
      }
    }
  }, [data, error, isLoading]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setSelectedModel(""); // reset model when brand changes
  };

  const handleBuyNow = () => {
    if (!selectedBrand || !selectedModel) {
      alert("Please select both brand and model.");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image,
      type: product.type,
      brand: selectedBrand,
      mobile: selectedModel,
      quantity: quantity,
    };

    addToCart(cartItem);
    router.push("/CheckOut");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fullslide delay={0.1}>
      <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-6xl bg-white  rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative  aspect-square rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black">
                {product.name}
              </h1>
              <div className="mt-3 space-y-1">
                <p className="text-xl line-through text-gray-500">
                  {product.price}৳
                </p>
                <p className="text-2xl font-bold text-pink-600">
                  {product.discountPrice}৳
                </p>
                <p className="text-sm font-medium text-green-600">
                  {product.stock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                >
                  −
                </button>

                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border border-gray-300 rounded-md p-1 shadow-sm"
                />

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(Number(product.stock), prev + 1)
                    )
                  }
                  disabled={quantity >= Number(product.stock)}
                  className={`w-8 h-8 rounded-full text-lg font-bold transition 
                    ${
                      quantity >= Number(product.stock)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Brand Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Brand:
              </label>
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm"
              >
                <option value="">-- Select Brand --</option>
                {BRAND_OPTIONS.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Mobile Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={!selectedBrand}
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm"
              >
                <option value="">-- Select Model --</option>
                {selectedBrand &&
                  models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-full text-lg font-semibold shadow-md transition duration-300"
            >
              Buy Now
            </button>

            <div className="flex items-end-safe gap-2 mt-4  text-sm text-gray-600">
              <Image src="/call.png" alt="Call" width={20} height={20} />
              <span>Need Help? Call Now!</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
      </div>

      <Sameproduct type={product.type} id={product.id} />
    </Fullslide>
  );
}