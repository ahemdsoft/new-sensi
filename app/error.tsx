'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-700 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong 😞</h1>
      <p className="text-lg mb-6">{error.message || "An unexpected error occurred."}</p>

      <div className="flex gap-4">
        <button 
          onClick={() => reset()} 
          className="px-4 py-2 bg-white border border-red-300 rounded hover:bg-red-100 transition"
        >
          Try Again
        </button>

        <button 
          onClick={() => router.push('/')} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
