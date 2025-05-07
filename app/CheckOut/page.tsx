/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { FiTrash2 } from "react-icons/fi";
import {
  useCreateOrderMutation,
  useSentCodeMutation,
  useUploadImageMutation,
} from "../redux/services/order.service";
import { useGetAllCuponQuery } from "../redux/services/cupon.service";
import { TCupon } from "../types/case.interface";

interface DeliveryOption {
  charge: number;
  name: string;
}

const Deliverycharge: DeliveryOption[] = [
  { charge: 60, name: "Inside Dhaka" },
  { charge: 120, name: "Outside Dhaka" },
  {charge:100, name:"Nearby Dhaka(Tongi,Keraniganj,Dohar,Nababganj)"}
 
];

function formatPhoneNumber(phone: string): string {
  // Assuming input is 11-digit local BD number like 01521701234
  if (phone.startsWith('0')) {
    return '+880' + phone.slice(1);
  }
  return phone; // already formatted
}

export default function CheckOut() {
  const [sentCode, sentCodeRes] = useSentCodeMutation();
  const cuponsRes = useGetAllCuponQuery();
  const router = useRouter();
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [createOrder, orderRes] = useCreateOrderMutation();
  const [uploadImage, imageRes] = useUploadImageMutation();
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState<TCupon[]>([]);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const { data, error, isLoading } = orderRes;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);

  useEffect(() => {
    if (cuponsRes.data) {
      setCoupons(cuponsRes.data);
    }
  }, [cuponsRes]);
  console.log("cupons", coupons);

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
    const discountedPrice = subtotal - discount;
    setTotalPrice(Math.max(0, discountedPrice + deliveryCharge));
  }, [subtotal, selectedDelivery, discount]);

  const handleDeliveryChange = (option: DeliveryOption) => {
    setSelectedDelivery(option);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode);
    console.log("coupon", coupon);
    if (coupon) {
      const discountAmount = coupon.discount;
      setDiscount(discountAmount);
      setCouponMessage(`Coupon applied: ${coupon.discount}% off`);
      setIsCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code");
      setIsCouponApplied(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    setCouponMessage("");
    setIsCouponApplied(false);
  };

  const prepareOrderData = async () => {
    const cartItemPromises = cartItems.map(async (item) => {
      if (item.file) {
        try {
          const imageData = new FormData();
          imageData.append("file", item.file);
          const res = await uploadImage(imageData).unwrap();
          return {
            name: item.name,
            price: item.price,
            image: res.url,
            type: item.type,
            quantity: item.quantity,
            brand: item.brand,
            mobile: item.mobile,
          };
        } catch (err: any) {
          throw new Error("Image upload failed for one or more items.");
        }
      } else {
        return {
          name: item.name,
          price: item.price,
          image: item.image,
          type: item.type,
          quantity: item.quantity,
          brand: item.brand,
          mobile: item.mobile,
        };
      }
    });

    const cartItem = await Promise.all(cartItemPromises);

    const userId = localStorage.getItem("userId");
    return {
      ...formData,
      items: cartItem,
      deliveryCharge: selectedDelivery?.charge || 0,
      subtotal,
      totalPrice,
      userId,
      verificationCode,
      discount,
      couponCode: isCouponApplied ? couponCode : null,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDelivery) {
      alert("Please select a delivery option");
      return;
    }

    if (!formData.phone) {
      alert("Phone number is required for verification");
      return;
    }

    try {
      setIsSendingCode(true);
      // First send the verification code
      const formatePhone = formatPhoneNumber(formData.phone);
      await sentCode({ phone: formatePhone }).unwrap();

      // Prepare order data but don't submit yet
      const preparedOrderData = await prepareOrderData();
      setOrderData(preparedOrderData);

      // Show the verification modal
      setShowCodeModal(true);
    } catch (error: any) {
      console.error("Error sending verification code:", error);
      alert("Failed to send verification code: " + (error.data?.message || error.message));
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert("Please enter the verification code");
      return;
    }

    try {
      if (!orderData) {
        throw new Error("Order data is missing");
      }

      // Add the verification code to the order data
      const orderWithCode = {
        ...orderData,
        code: verificationCode,
      };

      await createOrder(orderWithCode).unwrap();

      // On success, close the code modal and show success popup
      setShowCodeModal(false);
      setShowSuccessPopup(true);
      clearCart();
    } catch (error: any) {
      console.error("Error verifying code or placing order:", error);
      alert("Order failed: " + (error.data?.message || error.message));
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    router.push("/");
  };

  useEffect(() => {
    if (data) {
      setShowSuccessPopup(true);
      clearCart();
    }
    if (error) {
      if (error && "data" in error) {
        const errData = error.data as { message: string };
        alert(errData.message);
      } else {
        alert("Something went wrong");
      }
    }
  }, [data, error]);

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
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

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
                      ZIP Code
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

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Coupon
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isCouponApplied}
                    />
                    {isCouponApplied ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="bg-[#3C1630] text-white px-4 py-2 rounded-md hover:bg-[#4a1a3d]"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponMessage && (
                    <p className={`text-sm ${isCouponApplied ? 'text-green-600' : 'text-red-600'}`}>
                      {couponMessage}
                    </p>
                  )}
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
                  disabled={isSendingCode}
                >
                  {isSendingCode ? "Sending Code..." : "Place Order"}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b pb-4"
                  >
                    <div className="w-20 h-20 relative mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full rounded"
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
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span className="font-medium">Discount:</span>
                    <span>-৳{discount.toFixed(2)}</span>
                  </div>
                )}
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

      {/* Verification Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Verify Your Order</h3>
              <button
                onClick={() => setShowCodeModal(false)}
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

            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                We've sent a verification code to your phone number. Please enter it below to confirm your order.
              </p>
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyCode}
                className="px-4 py-2 bg-[#3C1630] text-white rounded-md hover:bg-[#4a1a3d]"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify & Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium">-৳{discount.toFixed(2)}</span>
                  </div>
                )}
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
              {isCouponApplied && (
                <p className="text-gray-700">Coupon: {couponCode}</p>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Thank you for your order! We'll send you a confirmation
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