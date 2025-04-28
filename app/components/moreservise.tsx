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
    <div ref={ref} className="w-full h-[100%] bg-white flex flex-col items-center gap-18 mt-12 justify-center">
      <h1 className="text-4xl font-openSans text-center">More Services</h1>
      <div className="w-[90%] h-[40%] flex flex-wrap justify-between gap-2">
        {['shiping', 'premium', 'contact', 'check'].map((img, index) => (
          <motion.div
            className="flex flex-col justify-center gap-2 items-center"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            custom={index}
            key={img}
          >
            <Image
              src={`/${img}.png`}
              width={70}
              height={70}
              alt={img}
            />
            <p>
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
