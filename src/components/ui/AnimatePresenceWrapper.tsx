'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

// Use the Framer Motion 'Variants' type for strong typing
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn', // Changed ease for a smoother exit
    },
  },
};

export default function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--page-background-color, #fff)', // Using a CSS variable for theme support
          overflowY: 'auto',
          padding: '2rem',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}