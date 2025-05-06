"use client";
import { useState } from "react";
import Image from "next/image";
import { TCartItem } from "@/app/types/case.interface";
import { useCreateCaseMutation } from "@/app/redux/services/case.service";

export default function ProductsPage() {
  const [formData, setFormData] = useState<
    Omit<TCartItem, "image"> & { image?: File }
  >({
    id: "",
    name: "",
    price: 0,
    type: "",
    stock: 0,
    slug: "",
    discountPrice: 0,
  });

  const categorySlugs = [
    "anime",
    "marvel-dc",
    "cars-bikes",
    "couple",
    "football",
    "typography",
    "gaming",
    "islamic",
    "ladies",
    "k-pop",
  ];

  const [createCase, { data, error, isLoading }] = useCreateCaseMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("image", formData.image); // Changed from "file" to "image"
    formDataToSend.append("type", formData.type);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("discountPrice", formData.discountPrice.toString());

    createCase(formDataToSend);
  };

  if (error && !isLoading) {
    if (error && "data" in error) {
      const errData = error.data as { message: string }; // 👈 define the structure
      alert(errData.message);
      console.log("error", error);
    } else {
      alert("something went wrong");
    }
  }
  if (data && !isLoading) {
    alert("Case created successfully");
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        📦 Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Discount Price */}
          <div>
            <label
              htmlFor="discountPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Discount Price
            </label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>
          {/* Type Select Dropdown */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={
                handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a type</option>
              <option value="2d">2d</option>
              <option value="2d-max">2d-max</option>
              <option value="soft">soft</option>
              <option value="3d-hard">3d-hard</option>
              <option value="pop-holder">Pop Holder</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Slug Dropdown */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Category Slug
            </label>
            <select
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={
                handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categorySlugs.map((slug) => (
                <option key={slug} value={slug}>
                  {slug.replace(/-/g, " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="col-span-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2"
            />
            {imagePreview && (
              <div className="mt-2 w-32 h-32 relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-lg font-semibold disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "➕ Add Product"}
        </button>
      </form>

      <div className="text-center mt-10">
        <h2 className="text-xl font-bold text-gray-800">
          🧾 Total Products (This session):{" "}
          <span className="text-indigo-600">0</span>
        </h2>
      </div>
    </div>
  );
}
