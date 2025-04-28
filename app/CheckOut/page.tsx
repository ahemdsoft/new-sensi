"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { FiTrash2 } from "react-icons/fi";

interface DeliveryOption {
  charge: number;
  name: string;
}

const Deliverycharge: DeliveryOption[] = [
  { charge: 70, name: "Dhaka City" },
  { charge: 130, name: "Outside Dhaka City" },
  { charge: 100, name: "Near Dhaka" },
];

export default function CheckOut() {
  const router = useRouter();
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const price = typeof item.price === "number" ? item.price : 0;
      return sum + price * (item.quantity || 1);
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  useEffect(() => {
    const deliveryCharge = selectedDelivery ? selectedDelivery.charge : 0;
    setTotalPrice(subtotal + deliveryCharge);
  }, [subtotal, selectedDelivery]);

  const handleDeliveryChange = (option: DeliveryOption) => {
    setSelectedDelivery(option);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDelivery) {
      alert("Please select a delivery option");
      return;
    }

    try {
      // Simulate API call
      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          subtotal,
          deliveryCharge: selectedDelivery,
          totalPrice,
          formData,
        }),
      });

      if (!response.ok) {
        // Show success popup
        setShowSuccessPopup(true);
        clearCart(); // Clear the cart after successful order
      } else {
        const errorData = await response.json().catch(() => null);
        console.error("Order placement failed:", errorData);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    router.push("/");
  };

  return (
    <div className="">
      <div className="container w-[80%] h-full mx-auto px-4 text-black py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4">No items in your order</p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#3C1630] text-white font-bold py-2 px-6 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Discount Cupon
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">Cash on Delivery</option>
                
                    
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3C1630] text-white font-bold py-3 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b pb-4"
                  >
                    <div className="w-20 h-20 relative mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">
                        ৳{item.price.toFixed(2)} x {item.quantity} = ৳
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Delivery Options:</h3>
                <div className="space-y-2">
                  {Deliverycharge.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`delivery-${index}`}
                        type="radio"
                        name="delivery"
                        checked={selectedDelivery?.charge === option.charge}
                        onChange={() => handleDeliveryChange(option)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`delivery-${index}`}
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        {option.name}: ৳{option.charge}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Shipping:</span>
                  <span>
                    {selectedDelivery
                      ? `৳${selectedDelivery.charge}`
                      : "Select delivery option"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-600">
                Order Placed Successfully!
              </h3>
              <button
                onClick={closeSuccessPopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            <div className="border-t border-b py-4 my-4">
              <h4 className="font-semibold mb-2">Order Details:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium">{cartItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">
                    {selectedDelivery?.name} (৳{selectedDelivery?.charge})
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Delivery Address:</h4>
              <p className="text-gray-700">{formData.name}</p>
              <p className="text-gray-700">{formData.address}</p>
              <p className="text-gray-700">{formData.city}</p>
              <p className="text-gray-700">Phone: {formData.phone}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Thank you for your order! We&apos;ll send you a confirmation
                email shortly.
              </p>
              <button
                onClick={closeSuccessPopup}
                className="bg-[#3C1630] text-white font-bold py-2 px-6 rounded-full shadow hover:shadow-[0_4px_10px_#BF00FFA3] transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
