'use client'
import { motion } from 'framer-motion'

import { ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';

interface ButtonHoverTapEffectProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
}

export default function ButtonHoverTapEffect({ children, ...props }: ButtonHoverTapEffectProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 1 }}
      whileTap={{ scale: 0.95, rotate: -1 }}
      className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg"
      {...props}
    >
      {children}
    </motion.button>
  )
}
