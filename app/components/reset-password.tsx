/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // Import Lucid icons
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInstance";

interface ResetPasswordResponse {
  message: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // States for the form data
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState<boolean>(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] =
    useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  // Password validation state
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    // Ensure token and email are available before rendering the page
    if (!token || !email) {
      setError("Missing token or email in URL");
    }
  }, [token, email]);

  // Validate password length whenever it changes
  useEffect(() => {
    setIsPasswordValid(newPassword.length >= 8);
  }, [newPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setSuccess(false);
    setLoading(true);

    // Validate password length
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post<ResetPasswordResponse>(
        "/auth/reset-password",
        {
          token,
          newPassword,
        },
      );

      if (response.status) {
        setSuccess(true);
        setNewPassword("");
        setConfirmPassword("");
        alert("Reset password set successfully");
        router.push("/auth");
      }
    } catch (err: any) {
      if (err.response) {
        // Server error (e.g. 400 or 500 responses)
        setError(
          `${err.response.data.message || "Something went wrong. Please try again."}`,
        );
      } else if (err.request) {
        // No response from server
        setError(
          "No response from the server. Please check your internet connection.",
        );
      } else {
        // Other errors (e.g. setup or programming error)
        setError(
          ` ${err.message || "Something went wrong. Please try again."}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded-lg shadow-md">
            {error}
          </div>
        )}
        {success && !redirecting && (
          <div className="bg-main text-white p-3 mb-4 rounded-lg shadow-md">
            Password successfully reset!
          </div>
        )}
        {redirecting && (
          <div className="bg-blue-500 text-white p-3 mb-4 rounded-lg shadow-md">
            Redirecting to login page...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-bold mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                onFocus={() => setIsNewPasswordFocused(true)}
                onBlur={() => setIsNewPasswordFocused(false)}
                required
                minLength={8}
                disabled={loading}
                className={`w-full p-2.5 border outline-none border-gray-300 rounded-md disabled:opacity-50 ${
                  isNewPasswordFocused &&
                  newPassword.length > 0 &&
                  newPassword.length < 8
                    ? "border-red-500"
                    : newPassword.length >= 8
                      ? "border-green-500"
                      : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {isNewPasswordFocused &&
              newPassword.length > 0 &&
              newPassword.length < 8 && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 8 characters
                </p>
              )}
          </div>

          <div className="pb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onFocus={() => setIsConfirmPasswordFocused(true)}
                onBlur={() => setIsConfirmPasswordFocused(false)}
                required
                minLength={8}
                disabled={loading}
                className={`w-full p-2.5 border outline-none border-gray-300 rounded-md disabled:opacity-50 ${
                  isConfirmPasswordFocused && newPassword !== confirmPassword
                    ? "border-red-500"
                    : newPassword === confirmPassword && confirmPassword !== ""
                      ? "border-green-500"
                      : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {isConfirmPasswordFocused &&
              newPassword !== confirmPassword &&
              confirmPassword !== "" && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
          </div>

          <div className="">
            <button
              type="submit"
              disabled={
                loading || !isPasswordValid || newPassword !== confirmPassword
              }
              className="w-full bg-main text-white bg-blue-500 p-2 rounded-md disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
                    d="M4 12a8 8 0 0114.832-4.447l2.268 2.268a10 10 0 00-18.416 0l2.268-2.268A8 8 0 014 12z"
                    ></path>
                </svg>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
