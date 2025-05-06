/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TCartItem } from "@/app/types/case.interface";
import {
  useFindOneCaseQuery,
  useUpdateCaseMutation,
} from "@/app/redux/services/case.service";

export default function UpdateProductPage() {
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
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<
    Omit<TCartItem, "image"> & { image?: File | string }
  >({
    id: "",
    name: "",
    price: 0,
    type: "",
    stock: 0,
    slug: "",
    discountPrice: 0,
  });

  // Fetch product data
  const {
    data: productData,
    isLoading: isFetching,
    error: fetchError,
  } = useFindOneCaseQuery(id as string);
  const [updateCase, { isLoading: isUpdating }] = useUpdateCaseMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Set form data when product data is fetched
  useEffect(() => {
    if (productData) {
      setFormData({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        type: productData.type,
        stock: productData.stock,
        slug: productData.slug,
        discountPrice: productData.discountPrice,
        image: productData.image,
      });
      setImagePreview(productData.image || null);
    }
  }, [productData]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      if ("data" in fetchError) {
        const errData = fetchError.data as { message?: string };
        alert(errData.message || "Failed to fetch product data");
      } else {
        alert("Failed to fetch product data");
      }
    }
  }, [fetchError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "discountPrice"
          ? Number(value)
          : value,
    }));
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

    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price.toString());
    formDataToSend.append("type", formData.type);
    formDataToSend.append("stock", formData.stock.toString());
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("discountPrice", formData.discountPrice.toString());

    if (typeof formData.image !== "string" && formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await updateCase({
        body: formDataToSend,
        id: id as string,
      }).unwrap();
      alert("Product updated successfully");
      router.push("/admin/allproduct");
    } catch (err) {
      if ("data" in (err as any)) {
        const errorData = (err as any).data as { message?: string };
        alert(errorData.message || "Failed to update product");
      } else {
        alert("Failed to update product");
      }
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading product data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        ✏️ Update Product
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
              min="0"
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
              min="0"
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
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a type</option>
              <option value="2d">2d</option>
              <option value="2d-max">2d-max</option>
              <option value="soft">soft</option>
              <option value="3d-hard">3d-hard</option>
              <option value="pop-holder">Pop Holder</option>
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
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Slug Dropdown */}
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <select
              name="slug"
              id="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categorySlugs.map((slug) => (
                <option key={slug} value={slug}>
                  {slug.charAt(0).toUpperCase() +
                    slug.slice(1).replace("-", " ")}
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
              className="mt-1 block w-full rounded-md border-gray-300 p-2"
            />
            {imagePreview && (
              <div className="mt-2 w-32 h-32 relative">
                <img
                  src={
                    typeof imagePreview === "string"
                      ? imagePreview
                      : imagePreview
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isUpdating || isFetching}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-lg font-semibold disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-xl text-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
