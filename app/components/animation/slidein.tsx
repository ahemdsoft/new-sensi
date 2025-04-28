// components/FadeIn.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

export default function SlideIn({ children, delay = 0.1 }: FadeInProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,   // Important: Allow it to trigger again when re-entering
    threshold: 0.1,       // How much visible to trigger (20% visible)
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: 200 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 200 }}
      animate={controls}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
