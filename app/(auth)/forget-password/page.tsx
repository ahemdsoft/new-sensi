/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import axiosInstance from "@/app/lib/axiosInstance";
// import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/auth/forget-password", {
        email: email.toLowerCase(),
      });
      setMessage("Password reset link sent to your email!");
      alert("Password reset link sent successfully!");
      setSuccess(true); // Mark success as true
      setEmail(""); // Clear the email field after success
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Enter your email address to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-main focus:border-main sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div className="mt-2 text-gray-600 text-end text-sm">
            Remember password?
            <Link
              href="/auth"
              className="text-blue-400 ml-1 text-sm font-bold hover:underline "
            >
              Login
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-blue-500 px-4 mt-5 text-white font-semibold rounded-lg shadow-md flex items-center justify-center ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-main"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-base ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {success && (
          <>
            <p className="mt-4 text-center text-sm text-gray-600">
              Please check your email for the password reset link.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
