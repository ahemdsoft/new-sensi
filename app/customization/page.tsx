/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, ChangeEvent, useEffect } from "react";
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
import { useFindAllDeviceQuery } from "../redux/services/device.service";

type OptionType = {
  label: string;
  value: string;
};

const CASE_OPTIONS: OptionType[] = [
  { label: '2D', value: '2d' },
  { label: '2D-Max', value: '2d-max' },
  { label: 'Soft', value: 'soft' },
  { label: '3D-Hard', value: '3d-hard' },
];

const PRICE_MAP: Record<string, number> = {
  "2d": 360,
  "2d-max": 440,
  "3d-hard": 260,
  "soft": 280,
};

const BRAND_OPTIONS: OptionType[] = [
  { label: "Apple", value: "apple" },
  { label: "Samsung", value: "samsung" },
  { label: "Xiaomi", value: "xiaomi" },
  { label: "Redmi", value: "redmi" },
  { label: "Oppo", value: "oppo" },
  { label: "OnePlus", value: "oneplus" },
  { label: "Vivo", value: "vivo" },
  { label: "Realme", value: "realme" },
  { label: "Google Pixel", value: "googlepixel" },
  { label: "Tecno", value: "tecno" },
  { label: "Motorola", value: "motorola" },
  { label: "Poco", value: "poco" },
  { label: "Huawei", value: "huawei" },
  { label: "Nokia", value: "nokia" },
  { label: "Honor", value: "honor" },
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
  mobile: string;
  quantity: number;
  file: File;
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
  const [price, setPrice] = useState(0);
  const [models, setModels] = useState<string[]>([]);

  const { data } = useFindAllDeviceQuery({
    forCase: selectedType,
    brand: selectedBrand,
  });

  useEffect(() => {
    if (data) {
      const models = data.map((item: any) => item.model);
      setModels(models);
    }
  }, [data]);

  const { addToCart } = useCart();
  const router = useRouter();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const submitFormAndCreateCartItem = async (): Promise<CartItem | null> => {
    if (!selectedBrand || !selectedModel || !selectedType || !image) {
      alert("Please fill in all required fields.");
      return null;
    }

    const selectedPrice = PRICE_MAP[selectedType] || 0;
    setPrice(selectedPrice);

    return {
      id: `${selectedBrand}-${selectedModel}-${selectedType}-${Date.now()}`,
      name: `${selectedBrand} ${selectedModel} ${selectedType} Case`,
      price: selectedPrice,
      image: imagePreview || "",
      type: "custom",
      brand: selectedBrand,
      mobile: selectedModel,
      quantity,
      file: image,
    };
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const cartItem = await submitFormAndCreateCartItem();
      if (cartItem) {
        addToCart(cartItem);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const cartItem = await submitFormAndCreateCartItem();
      if (cartItem) {
        addToCart(cartItem);
        router.push("/CheckOut");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn delay={0.1}>
      <div className="w-full py-10 px-4 flex flex-col items-center bg-gray-50">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardContent className="flex justify-center items-center h-full p-6">
              <div className="relative border border-black w-40 h-80 rounded-4xl overflow-hidden">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="User Upload"
                      fill
                      className="object-cover rounded-3xl z-0"
                      priority
                    />
                    <Image
                      src="/back.png"
                      alt="Overlay Frame"
                      fill
                      className="object-cover z-1 pointer-events-none"
                      priority
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <UploadCloud className="h-8 w-8 mb-2" />
                    <p className="text-center text-sm font-semibold">
                      Your Design Here
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-xl p-6 shadow space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Customize Your Case
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Select Brand</h3>
                <div className="grid grid-cols-4 gap-2">
                  {BRAND_OPTIONS.map((brand) => (
                    <Button
                      key={brand.value}
                      onClick={() => {
                        setSelectedBrand(brand.value);
                        setSelectedModel("");
                      }}
                      variant={selectedBrand === brand.value ? "default" : "outline"}
                      className="truncate"
                    >
                      {brand.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Case Type</h3>
                <div className="grid grid-cols-4 gap-2">
                  {CASE_OPTIONS.map((type) => (
                    <Button
                      key={type.value}
                      onClick={() => {
                        setSelectedType(type.value);
                        setPrice(PRICE_MAP[type.value]);
                      }}
                      variant={selectedType === type.value ? "default" : "outline"}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedBrand && selectedType && (
                <div>
                  <h3 className="font-medium mb-2">Select Model</h3>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="border-gray-300 border-2 p-2 rounded-lg">
                <span className="text-[#11802e] font-medium">Price: </span>
                <span>{price}</span>
              </div>

              <div>
                <h3 className="font-medium mb-2">Upload Your Design</h3>
                <Input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Additional Notes</h3>
                <Textarea
                  placeholder="Add any notes for the design..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={handleAddToCart}
                disabled={loading || !selectedBrand || !selectedModel || !selectedType || !image}
                className="w-full hover:bg-amber-950 hover:text-white"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={loading || !selectedBrand || !selectedModel || !selectedType || !image}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {loading ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full max-w-6xl">
          <Sameproduct type={selectedType} />
        </div>
      </div>
    </FadeIn>
  );
}
