'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface Order {
  id: string;
  name: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  price: number;
  image?: string;
}

interface JwtPayload {
  email: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD12345',
    name: 'Product A',
    status: 'Delivered',
    price: 1500,
    image: 'https://via.placeholder.com/300x200.png?text=Product+A',
  },
  {
    id: 'ORD12346',
    name: 'Product B',
    status: 'Pending',
    price: 800,
    image: 'https://via.placeholder.com/300x200.png?text=Product+B',
  },
  {
    id: 'ORD12347',
    name: 'Product C',
    status: 'Shipped',
    price: 1200,
    image: 'https://via.placeholder.com/300x200.png?text=Product+C',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
    //   router.push('/auth');
      setTokenChecked(true);

      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      setUserEmail(decoded.email);
      setTokenChecked(true);
    } catch (err) {
      console.error('Invalid token');
      router.push('/auth');
      console.log('Invalid token', err);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    router.push('/auth');
  };

  if (!tokenChecked) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 to-[#f7edf7]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 h-full hidden md:block fixed">
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Info</h2>
        <p className="text-gray-600 break-words mb-6">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-64 p-6 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">My Orders</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm"
          >
            {sidebarOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Orders Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={order.image}
                alt={order.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{order.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Order ID:</span> {order.id}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <div className="mt-4 text-right text-lg font-bold text-gray-800">
                  {order.price}৳
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Mobile sidebar (optional) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <aside
            className="fixed left-0 top-0 w-64 bg-white shadow-xl p-6 h-full z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Info</h2>
            <p className="text-gray-600 break-words mb-6">{userEmail}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
