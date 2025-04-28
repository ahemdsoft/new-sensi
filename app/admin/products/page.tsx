'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductsPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    type: '',
    brand: '',
    mobile: '',
    stock: '',
    id: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file.name }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();








    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setProductCount((prev) => prev + 1);
        setFormData({
          id: '',
          name: '',
          price: '',
          image: '',
          type: '',
          brand: '',
          mobile: '',
          stock: ''
        });
        setImagePreview(null);
      } else {
        alert('Failed to submit product.');
      }
    } catch (err) {
      console.error('Error submitting:', err);
      alert('Error submitting product.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700">📦 Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
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
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
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

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Mobile Model */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Model</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
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

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Id</label>
            <input
              type="number"
              name="id"
              id="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm"
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-full">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
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
            {formData.image && (
              <p className="text-sm text-gray-500 mt-1">Selected: {formData.image}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-lg font-semibold"
        >
          ➕ Add Product
        </button>
      </form>

      <div className="text-center mt-10">
        <h2 className="text-xl font-bold text-gray-800">
          🧾 Total Products (This session): <span className="text-indigo-600">{productCount}</span>
        </h2>
        <p className="text-sm text-gray-500">(Will reset on refresh)</p>
      </div>
    </div>
  );
}
