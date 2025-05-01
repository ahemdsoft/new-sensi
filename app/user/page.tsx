/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useGetAllForAdminQuery } from "@/app/redux/services/order.service";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
}

export default function OrdersPage() {
  const userId = localStorage.getItem("userId") as string;
  const {
    data: orders = [],
    error,
    isLoading,
  } = useGetAllForAdminQuery({ userId });
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      setUserEmail(decoded.email);
    } catch (err: any) {
      console.error("Invalid token");
      router.push("/auth");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth");
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const getDeliveryCharge = (deliveryCharge: any) => {
    if (!deliveryCharge) return 0;
    if (typeof deliveryCharge === "number") return deliveryCharge;
    if (typeof deliveryCharge === "object" && deliveryCharge.charge) {
      return deliveryCharge.charge;
    }
    return 0;
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-white shadow-xl p-6 h-full hidden md:block fixed">
          {/* Sidebar skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </aside>
        <main className="flex-1 ml-0 md:ml-64 p-6 w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen bg-gray-50">
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
        <main className="flex-1 ml-0 md:ml-64 p-6 w-full">
          <div className="text-red-500 text-lg">
            Error loading orders. Please try again later.
          </div>
        </main>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
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
          <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      order.status
                    )} self-start md:self-center`}
                  >
                    {order.status?.charAt(0).toUpperCase() +
                      order.status?.slice(1).toLowerCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700">
                      Customer
                    </h4>
                    <p className="text-gray-600">{order.name}</p>
                    <p className="text-gray-600">
                      {order.address}, {order.city}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-700">
                      Order Summary
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="text-gray-800">৳{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="text-gray-800">
                        ৳{getDeliveryCharge(order.deliveryCharge)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-800 font-medium">Total:</span>
                      <span className="text-gray-800 font-bold">
                        ৳{order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <aside
              className="fixed left-0 top-0 w-64 bg-white shadow-xl p-6 h-full z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                User Info
              </h2>
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

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order Details
                    </h2>
                    <p className="text-gray-500">#{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Customer Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{selectedOrder.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">{selectedOrder.phone}</p>
                          {selectedOrder.email && (
                            <p className="font-medium">{selectedOrder.email}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Shipping Address
                          </p>
                          <p className="font-medium">{selectedOrder.address}</p>
                          <p className="font-medium">{selectedOrder.city}</p>
                          {selectedOrder.zipCode && (
                            <p className="font-medium">
                              {selectedOrder.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Order Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-medium">
                            {new Date(selectedOrder.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">Status</p>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              selectedOrder.status
                            )}`}
                          >
                            {selectedOrder.status?.charAt(0).toUpperCase() +
                              selectedOrder.status?.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-500">
                            Payment Method
                          </p>
                          <p className="font-medium">
                            {selectedOrder.paymentMethod || "Cash on Delivery"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-4">
                      {selectedOrder.items?.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex gap-4 pb-4 border-b last:border-b-0"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-20 object-contain rounded-lg border"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            {item.brand && (
                              <p className="text-sm text-gray-500">
                                {item.brand}
                              </p>
                            )}
                            <div className="flex justify-between mt-2">
                              <p className="text-sm text-gray-500">
                                ৳{item.price} × {item.quantity}
                              </p>
                              <p className="font-medium">
                                ৳{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            {item.color && (
                              <p className="text-xs text-gray-500 mt-1">
                                Color: {item.color}
                              </p>
                            )}
                            {item.size && (
                              <p className="text-xs text-gray-500">
                                Size: {item.size}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between">
                          <p className="text-gray-600">Subtotal</p>
                          <p className="text-gray-800">
                            ৳{selectedOrder.subtotal}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-gray-600">Delivery Fee</p>
                          <p className="text-gray-800">
                            ৳{getDeliveryCharge(selectedOrder.deliveryCharge)}
                          </p>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <p className="text-gray-800 font-bold">Total</p>
                          <p className="text-gray-800 font-bold">
                            ৳{selectedOrder.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.items?.some(
                  (item: any) =>
                    item.type === "custom" && item.customDesign?.notes
                ) && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Custom Design Notes
                    </h3>
                    <div className="space-y-4">
                      {selectedOrder.items
                        .filter(
                          (item: any) =>
                            item.type === "custom" && item.customDesign?.notes
                        )
                        .map((item: any) => (
                          <div key={item.id} className="space-y-2">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-gray-600 whitespace-pre-line">
                              {item.customDesign.notes}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
