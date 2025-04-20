"use client";
import AuthModal from "../components/AuthModel";
export default function AuthPage() {
  return (
    <div className="flex items-center bg-gray-300 justify-center w-full h-screen">
        <AuthModal isOpen={true} onClose={() => {}} mode="login" />
    </div>
  );
}