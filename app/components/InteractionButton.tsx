'use client'
import { motion, MotionValue } from 'framer-motion'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, MouseEventHandler } from 'react'

export default function InteractiveButton(props: {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    children: ReactNode
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 1 }}
      whileTap={{ scale: 0.95, rotate: -1 }}
      className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg"
      onClick={props.onClick}
    >
      {props.children}
    </motion.button>
  )
}
