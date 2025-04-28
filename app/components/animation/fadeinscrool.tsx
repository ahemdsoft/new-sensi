'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function FadeInOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: false, // ❗ Allow re-triggering on re-entry
    threshold: 0.1, // Adjust this as needed
  });

  return (
    <motion.div
      ref={ref}
      key={inView.toString()} // ❗ Change key to re-trigger animation
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
