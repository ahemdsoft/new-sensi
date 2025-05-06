'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/image/bgh1.png',
  '/image/bgh2.png',
  '/image/Group211.png',
];

export default function SmoothSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((currentIndex + 1) % images.length);
      setIsAnimating(true);

      // Stop animation state after it completes
      setTimeout(() => setIsAnimating(false), 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="absolute inset-0  w-full h-full  overflow-hidden">
      {/* Previous image sliding out */}
      {isAnimating && (
        <Image
          key={`prev-${prevIndex}`}
          src={images[prevIndex]}
          alt="Previous"
          fill
          className="object-cover absolute transition-transform duration-700 ease-in-out z-0 animate-slide-out"
          priority
        />
      )}

      {/* Current image sliding in */}
      <Image
        key={`curr-${currentIndex}`}
        src={images[currentIndex]}
        alt="Current"
        fill
        className={`object-cover absolute transition-transform duration-700 ease-in-out z-10 ${
          isAnimating ? 'animate-slide-in' : ''
        }`}
        priority
      />
    </div>
  );
}
