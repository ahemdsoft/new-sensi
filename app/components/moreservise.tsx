'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Moreservise() {
  const { ref, inView } = useInView({
    triggerOnce: false, // animate only once
    threshold: 0.2, // when 20% of the section is visible
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const imageVariants = {
    hidden: { y: 0 },
    visible: (index: number) => ({
      y: [0, -30, 0],
      transition: {
        delay: index * 0.2,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div ref={ref} className="w-full bg-white flex flex-col items-center mt-12 gap-8 justify-center">
  <h1 className="text-4xl font-openSans text-center mb-6">More Services</h1>

  <div className="w-[90%] grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
    {['shiping', 'premium', 'contact', 'check'].map((img, index) => (
      <motion.div
        className="flex flex-col justify-center items-center text-center gap-2"
        initial="hidden"
        animate={controls}
        variants={imageVariants}
        custom={index}
        key={img}
      >
        <Image
          src={`/${img}.png`}
          width={35}
          height={35}
          alt={img}
        />
        <p className="text-sm font-medium">
          {img === 'shiping'
            ? 'Shipping All Over Bangladesh'
            : img === 'premium'
            ? 'Premium Quality'
            : img === 'contact'
            ? 'Contact Support'
            : 'Secured Checkout'}
        </p>
      </motion.div>
    ))}
  </div>
</div>

  );
}
