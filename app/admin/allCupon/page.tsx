/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useDeleteCuponMutation, useGetAllCuponQuery } from "@/app/redux/services/cupon.service";
import { TCupon } from "@/app/types/case.interface";
import { useEffect, useState } from "react";

// Dummy product data

export default function AllProductsPage() {
  const { data, error } = useGetAllCuponQuery();
  const [deleteCase, deleteRes] = useDeleteCuponMutation();
  let dummyProducts: TCupon[] = [];
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      dummyProducts = data;
      setProducts(data);
    }
    if (error) {
      if (error && "data" in error) {
        const errData = error.data as { message: string }; // 👈 define the structure
        alert(errData.message);
        console.log("error", error);
      } else {
        alert("something went wrong");
      }
    }
  }, [data, error]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<TCupon[]>(dummyProducts);

  console.log("products", products);
  const handleSearch = () => {
    if (search.trim() === "") {
      setProducts(dummyProducts);
      return;
    }

    const filtered = dummyProducts.filter((product) =>
      product.code.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCase(id);
  };

  useEffect(() => {
    if (deleteRes.isSuccess) {
      alert("Product deleted successfully");
    }
    if(deleteRes.isError) {
      if ('data' in (deleteRes.error as any)) {
        const errorData = (deleteRes.error as any).data as { message?: string };
        alert(errorData.message || 'Failed to delete product');
      } else {
        alert('Failed to delete product');
      }
    }
  }, [deleteRes]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        📦 All Products
      </h1>

      <div className="flex gap-3 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search product by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.code}
              className="border rounded-xl p-4 shadow-md bg-white flex flex-col gap-3"
            >
              <div className="text-sm text-gray-600">Code: {product.code}</div>
              <div className="text-md font-bold text-indigo-700">
                ৳Discount Price:{product.discount}
              </div>
              <button
                onClick={() => handleDelete(product.code)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
