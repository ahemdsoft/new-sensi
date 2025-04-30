'use client';
import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  catagory: string;
  subcatagory: string;
  notes: string;
  stock: number;
  discountprice: number;
}

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    price: 145000,
    image: '/iphone.jpg',
    catagory: 'Smartphone',
    subcatagory: 'Smartphone',
    notes: 'Latest model with A16 chip',
    stock: 12,
    discountprice: 120000
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 120000,
    image: '/samsung.jpg',
    catagory: 'Smartphone',
    subcatagory: 'Smartphone',
    notes: 'Latest model with A16 chip',
    stock: 8,
    discountprice: 120000
  },
  {
    id: '3',
    name: 'Redmi Note 12',
    price: 28000,
    image: '/redmi.jpg',
    catagory: 'Smartphone',
    subcatagory: 'Smartphone',
    notes: 'Latest model with A16 chip',
    stock: 30,
    discountprice: 120000
  }
];

export default function AllProductsPage() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [editing, setEditing] = useState<{
    [key: string]: { price?: string; discountprice?: string; stock?: string };
  }>({});

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

  const handleInputChange = (
    id: string,
    field: 'price' | 'discountprice' | 'stock',
    value: string
  ) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleUpdate = async (
    id: string,
    field: 'price' | 'discountprice' | 'stock'
  ) => {
    const newValue = editing[id]?.[field];
    if (!newValue) {
      alert('Please enter a value before submitting.');
      return;
    }

    const response = await fetch(`http://localhost:5000/products/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ [field]: Number(newValue) })
    });

    if (response.ok) {
      alert(`✅ ${field} updated successfully!`);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, [field]: Number(newValue) }
            : product
        )
      );
      setEditing((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: ''
        }
      }));
    } else {
      alert('❌ Failed to update. Try again.');
    }
  };

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
              <div className="text-lg font-semibold text-gray-800">
                {product.name}
              </div>

              <div className="text-md font-semibold text-gray-700">
                Category: {product.catagory}
              </div>

              <div className="text-md font-semibold text-gray-700">
                Sub-category: {product.subcatagory}
              </div>

              <div className="text-md font-bold text-indigo-700">
                Price: ৳{product.price}
              </div>
              <input
                type="number"
                placeholder="New Price"
                value={editing[product.id]?.price || ''}
                onChange={(e) =>
                  handleInputChange(product.id, 'price', e.target.value)
                }
                className="border p-1 rounded w-full"
              />
              <button
                onClick={() => handleUpdate(product.id, 'price')}
                className="bg-green-500 text-white px-3 py-1 rounded mt-1 hover:bg-green-600"
              >
                Update Price
              </button>

              <div className="text-md font-bold text-indigo-700">
                Discount Price: ৳{product.discountprice}
              </div>
              <input
                type="number"
                placeholder="New Discount Price"
                value={editing[product.id]?.discountprice || ''}
                onChange={(e) =>
                  handleInputChange(product.id, 'discountprice', e.target.value)
                }
                className="border p-1 rounded w-full"
              />
              <button
                onClick={() => handleUpdate(product.id, 'discountprice')}
                className="bg-green-500 text-white px-3 py-1 rounded mt-1 hover:bg-green-600"
              >
                Update Discount Price
              </button>

              <div className="text-md font-bold text-indigo-700">
                Stock: {product.stock}
              </div>
              <input
                type="number"
                placeholder="New Stock"
                value={editing[product.id]?.stock || ''}
                onChange={(e) =>
                  handleInputChange(product.id, 'stock', e.target.value)
                }
                className="border p-1 rounded w-full"
              />
              <button
                onClick={() => handleUpdate(product.id, 'stock')}
                className="bg-green-500 text-white px-3 py-1 rounded mt-1 hover:bg-green-600"
              >
                Update Stock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
