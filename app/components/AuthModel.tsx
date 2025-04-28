"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "../redux/services/auth.service";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  // const router = useRouter();
  const [authMode, setAuthMode] = useState(mode);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [register, { data, error }] = useRegisterMutation();
  const [login, loginData] = useLoginMutation();
  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");
    try {
      if (authMode === "signup") {
        const body = {
          email: formData.email,
          password: formData.password,
          fullName: formData.name,
        };
        register(body);

        if (data) {
          console.log("data", data);
          sessionStorage.setItem("token", data.token);
          localStorage.setItem("accountName", data.name);
          // router.push("/dashboard");
        }
        if (error) {
          if (error && "data" in error) {
            const errData = error.data as { message: string }; // 👈 define the structure
            setErrors(errData.message);
            console.log("error", error);
          } else {
            setErrors("something went wrong");
          }
        }
      } else {
        const body = {
          email: formData.email,
          password: formData.password,
        }

        login(body);
        const {data, error} = loginData;

        if (data) {
          console.log("data", data);
          sessionStorage.setItem("token", data.accessToken);
          // router.push("/dashboard");
        }
        if (error) {
          if (error && "data" in error) {
            const errData = error.data as { message: string }; // 👈 define the structure
            setErrors(errData.message);
            console.log("error", error);
          } else {
            setErrors("something went wrong");
          }
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {authMode === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 shadow transition"
          >
            {authMode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {authMode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
