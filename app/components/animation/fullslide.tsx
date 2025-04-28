'use client';

import { motion } from 'framer-motion';

export default function SlideInFromRight({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 0.6,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
