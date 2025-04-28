'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
  mobile: string;
}

interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
}

export default function OrdersPage() {
  // Dummy orders data
  const [orders] = useState<Order[]>([
    {
      id: 1,
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'Dhaka',
      items: [
        {
          id: 1,
          name: 'iPhone 13 Case',
          price: 25.00,
          image: '/images/case1.jpg',
          type: 'phone-case',
          brand: 'Apple',
          mobile: 'iPhone 13'
        }
      ],
      totalAmount: 95.00,
      status: 'pending',
      orderDate: '2024-03-15'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      address: '456 Oak Ave',
      city: 'Chittagong',
      items: [
        {
          id: 2,
          name: 'Samsung S21 Case',
          price: 20.00,
          image: '/images/case2.jpg',
          type: 'phone-case',
          brand: 'Samsung',
          mobile: 'Galaxy S21'
        }
      ],
      totalAmount: 90.00,
      status: 'completed',
      orderDate: '2024-03-14'
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Customer Information</h4>
                  <p className="text-sm text-gray-500">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                  <p className="text-sm text-gray-500">{order.phone}</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                  <p className="text-sm text-gray-500">{order.city}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order Summary</h4>
                  <p className="text-sm text-gray-500">Total Amount: ৳{order.totalAmount}</p>
                  <p className="text-sm text-gray-500">Items: {order.items.length}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded-full object-cover"
                          width={40}
                          height={40}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.brand} - {item.mobile}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-900">৳{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 