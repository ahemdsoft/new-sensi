/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "../redux/services/auth.service";
import Link from "next/link";

interface AuthPageProps {
  mode: "login" | "signup";
}

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const [authMode, setAuthMode] = useState(mode);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);

  useEffect(() => {
    setErrorMessage("");
  }, [authMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (authMode === "signup") {
        const body = {
          email: formData.email,
          password: formData.password,
          fullName: formData.name,
        };
        const result = await register(body).unwrap();
        if(result) {
          alert("User created successfully");
          setAuthMode("login");
        }
      } else {
        const body = {
          email: formData.email,
          password: formData.password,
        };
        const result = await login(body).unwrap();
        
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("userId", result.user.id);
        router.push("/user");
      }
    } catch (err: any) {
      if (err.data && err.data.message) {
        setErrorMessage(err.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      console.error("Auth error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLoading = authMode === "signup" ? isRegisterLoading : isLoginLoading;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {authMode === "login" ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        {errorMessage && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {authMode === "signup" && (
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {authMode === "login" && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="/forget-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {authMode === "login" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                authMode === "login" ? "Sign in" : "Sign up"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <button
            onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
            className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
            disabled={isLoading}
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