/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInstance";
export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<{
    message: string;
    isSuccess: boolean | null;
  }>({
    message: "Checking your email verification status...",
    isSuccess: null,
  });

  const route = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from query string
  const email = searchParams.get("email"); // Extract email from query string

  useEffect(() => {
    // Verify email if token and email are present
    if (token && email) {
      const verifyEmail = async () => {
        try {
          const response = await axiosInstance.post("/auth/verify-email", {
            token,
            email,
          });
          // console.log("Email verified successfully:", response.data);
          setVerificationStatus({
            message: "Email verified successfully.",
            isSuccess: true,
          });

          route.push("/auth");
        } catch (error: any) {
          console.error(
            "Error verifying email:",
            error.response?.data || error.message,
          );
          setVerificationStatus({
            message: error.response?.data?.message || "Verification failed.",
            isSuccess: false,
          });
          route.push("/auth");
        }
      };

      verifyEmail();
    } else {
      setVerificationStatus({
        message: "Invalid or missing verification details.",
        isSuccess: false,
      });
    }
  }, [token, email, route]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200">
      <div className="w-full max-w-md px-8 py-12 bg-white shadow-xl rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-16">
          Email Verification
        </h1>
        {verificationStatus ? (
          <div
            className={`p-4 border flex items-center justify-center rounded-lg shadow-sm ${
              verificationStatus.isSuccess === null
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : verificationStatus.isSuccess
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
            }`}
          >
            <p className="text-lg font-semibold">
              {verificationStatus.message}
            </p>
          </div>
        ) : (
          <div className="text-center flex items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-red-700">
              Invalid or missing verification details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
