"use client";

import AuthModal from "@/app/components/AuthModel";

export default function AuthPage() {
  return (
    <div className="flex items-center  bg-gray-300 justify-center w-full h-screen">
        <AuthModal mode="login" />
    </div>
  );
}