'use client';

import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import Sameproduct from "@/app/components/sameproduct";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import FadeIn from "../components/animation/fadein";

type BrandData = { [key: string]: string[] };

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

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
  mobile: string;
  quantity: number;
};

export default function Customization() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitFormAndCreateCartItem = async (): Promise<CartItem | null> => {
    if (!selectedBrand || !selectedModel || !selectedType || !image) {
      console.warn("Please fill in all required fields.");
      return null;
    }

    const formData = new FormData();
    formData.append("brand", selectedBrand);
    formData.append("model", selectedModel);
    formData.append("type", selectedType);
    formData.append("image", image);
    formData.append("notes", notes);
    formData.append("quantity", quantity.toString());

    try {
      setLoading(true);
      // const response = await fetch("/api/submit", { method: "POST", body: formData });
      // const result = await response.json();
      const result = { price: 100 };
      setLoading(false);

      return {
        id: Date.now(),
        name: `${selectedBrand} ${selectedModel} ${selectedType} Case`,
        price: result.price,
        image: imagePreview || "",
        type: "custom",
        brand: selectedBrand,
        mobile: selectedModel,
        quantity
      };
    } catch (error) {
      setLoading(false);
      console.error("Form submission error:", error);
      return null;
    }
  };

  const handleAddToCart = async () => {
    const cartItem = await submitFormAndCreateCartItem();
    if (cartItem) addToCart(cartItem);
  };

  const handleBuyNow = async () => {
    const cartItem = await submitFormAndCreateCartItem();
    if (cartItem) {
      addToCart(cartItem);
      router.push("/CheckOut");
    }
  };

  return (
    <FadeIn delay={0.1}>
    <div className="w-full py-10 px-4 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Preview Card */}
        <Card className="h-full">
          <CardContent className="flex justify-center items-center h-full p-6">
          <div className="relative border border-black w-40 h-80 rounded-4xl overflow-hidden">
  {imagePreview ? (
    <>
      {/* User Image - bottom layer */}
      <Image
        src={imagePreview}
        alt="User Upload"
        fill
        className="object-cover rounded-3xl z-0"
      />

      {/* Predefined Overlay Image - top layer */}
      <Image
        src="/back.png"
        alt="Overlay Frame"
        fill
        className="object-cover z-1 pointer-events-none"
      />
    </>
  ) : (
    <>
      <UploadCloud className="h-8 w-8" />
      <p className="text-center text-sm font-semibold">Your Design Here</p>
    </>
  )}
</div>


          </CardContent>
        </Card>

        {/* Customization Form */}
        <div className="bg-white rounded-xl p-6 shadow space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Customize Your Case</h2>

          <div className="grid grid-cols-4  gap-2">
            {Object.keys(brandData).map((brand) => (
              <Button
                key={brand}
                onClick={() => {
                  setSelectedBrand(brand);
                  setSelectedModel("");
                }}
                className={ `${
                  selectedBrand === brand
                    ? "bg-blue-600 text-white"
                    : "bg-white cursor-pointer text-gray-800 border border-gray-300"
                }`}
              >
                {brand}
              </Button>
            ))}
          </div>

          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
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

          <div className="grid grid-cols-4 gap-2">
            {caseTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`${
                  selectedType === type
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800 border cursor-pointer border-gray-300"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>

          <Input className="cursor-pointer" type="file" onChange={handleImageUpload} />
          <Textarea
            placeholder="Add any notes for the design..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <span className="text-lg font-medium">{quantity}</span>
            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full cursor-pointer hover:bg-amber-950 hover:text-white hovr:p-2"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
            <Button onClick={handleBuyNow} disabled={loading} className="w-full hover:bg-[#3C1630] border-1 border-black text-black hover:p-2 cursor-pointer hover:text-white">
              {loading ? "Processing..." : "Buy Now"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl">
        <Sameproduct />
      </div>
    </div></FadeIn>
  );
}
