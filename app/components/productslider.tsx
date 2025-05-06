'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Anime Case', category: '2D CASE', image: '/image/bgh1.png' },
  { id: 2, name: 'Marvel Case', category: 'Soft Case', image: '/image/bgh2.png' },
  { id: 3, name: 'Islamic Case', category: '3D Max Case', image: '/Component 8.png' },
  { id: 4, name: 'k-pop case', category: '2D MAX CASE', image: '/Component 8.png' },
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(index);
      setIndex((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [index]);

  const currentProduct = products[index];
  const prevProduct = prevIndex !== null ? products[prevIndex] : null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Previous image fades out slowly */}
      <AnimatePresence>
        {prevProduct && (
          <motion.img
            key={`prev-${prevProduct.id}`}
            src={prevProduct.image}
            alt={prevProduct.name}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          />
        )}
      </AnimatePresence>

      {/* Current image slides in */}
      <motion.img
        key={`current-${currentProduct.id}`}
        src={currentProduct.image}
        alt={currentProduct.name}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-full h-full object-cover z-20"
      />

      {/* Text Section */}
      <div className="absolute bottom-10 text-center text-white z-30">
        <motion.div
          key={`text-${currentProduct.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Link href={`/buy/${currentProduct.id}`}>
            <h2 className="text-3xl font-bold">{currentProduct.name}</h2>
            <p className="text-gray-300 text-lg">{currentProduct.category}</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
