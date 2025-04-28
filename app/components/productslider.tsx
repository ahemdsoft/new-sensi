'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Anime Case', category: '2D CASE', image: '/Component 8.png' },
  { id: 2, name: 'Marvel Case', category: 'Soft Case', image: '/Component 8.png' },
  { id: 3, name: 'Islamic Case', category: '3D Max Case', image: '/Component 8.png' },
  { id: 4, name: 'k-pop case', category: '2D MAX CASE', image: '/Component 8.png' },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[index];

  return (
    <div className="h-[70vh]     w-[90%] flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Fullscreen sliding image */}
      <div className="relative w-full h-[70vh] flex justify-center items-center overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={currentProduct.id}
            src={currentProduct.image}
            alt={currentProduct.name}
            custom={direction}
            initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Static text with fade */}
      <div className="text-center mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          ><Link href={`/buy/${currentProduct.id}`}>
            <h2 className="text-3xl font-bold">{currentProduct.name}</h2>
            <p className="text-gray-500 text-lg">{currentProduct.category}</p></Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


