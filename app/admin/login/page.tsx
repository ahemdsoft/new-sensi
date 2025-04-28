"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminLoginMutation } from "@/app/redux/services/auth.service";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const router = useRouter();
  const [adminLogin, adminLoginData] = useAdminLoginMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    adminLogin({ email: username, password });
    const { data, error, isLoading } = adminLoginData;
    if (error || isLoading) {
      if (error && "data" in error) {
        const errData = error.data as { message: string }; // 👈 define the structure
        setError(errData.message);
        console.log("error", error);
      } else {
        setError("something went wrong");
      }
    }
    if (data) {
      sessionStorage.setItem("adminToken", data.accessToken);
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Admin Login
        </h1>

        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {errors}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-1"
            >
              email
            </label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            disabled={adminLoginData.isLoading}
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
