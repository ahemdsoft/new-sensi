"use client";
import { useState } from "react";
import { useCreateCuponMutation } from "@/app/redux/services/cupon.service";
import { TCupon } from "@/app/types/case.interface";

export default function ProductsPage() {
  const [formData, setFormData] = useState<TCupon>({
    code: "",
    discount: 0,
  });
  const [createCupon, { data, error, isLoading }] = useCreateCuponMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formData.discount = Number(formData.discount);

    await createCupon(formData);
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
  console.log(data);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        📦 Add New Cupon
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cupon Code */}
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Cupon Code
            </label>
            <input
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-lg font-semibold disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "➕ Add Cupon"}
        </button>
      </form>
    </div>
  );
}
