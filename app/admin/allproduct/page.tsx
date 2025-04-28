'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
  mobile: string;
  stock: number;
}

// Dummy product data
const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 145000,
    image: '/iphone.jpg',
    type: 'Smartphone',
    brand: 'Apple',
    mobile: 'A2890',
    stock: 12
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 120000,
    image: '/samsung.jpg',
    type: 'Smartphone',
    brand: 'Samsung',
    mobile: 'SM-S911B',
    stock: 8
  },
  {
    id: 3,
    name: 'Redmi Note 12',
    price: 28000,
    image: '/redmi.jpg',
    type: 'Smartphone',
    brand: 'Xiaomi',
    mobile: '22111317I',
    stock: 30
  }
];

export default function AllProductsPage() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  const handleSearch = () => {
    if (search.trim() === '') {
      setProducts(dummyProducts);
      return;
    }

    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDelete = async (id: number) => {
    const deleted=await fetch(`http://localhost:5000/products/delete/${id}`,{
      method:'DELETE'
      
    })
   if(deleted){
    setProducts(products.filter((product)=>product.id!==id));
   }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700">📦 All Products</h1>

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
              key={product.id}
              className="border rounded-xl p-4 shadow-md bg-white flex flex-col gap-3"
            >
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="text-sm text-gray-600">ID: {product.id}</div>
              <div className="text-lg font-semibold text-gray-800">{product.name}</div>
              <div className="text-sm text-gray-500">Brand: {product.brand}</div>
              <div className="text-sm text-gray-500">Model: {product.mobile}</div>
              <div className="text-sm text-gray-500">Type: {product.type}</div>
              <div className="text-sm text-gray-500">Stock: {product.stock}</div>
              <div className="text-md font-bold text-indigo-700">৳{product.price}</div>
              <button
                onClick={() => handleDelete(product.id)}
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
