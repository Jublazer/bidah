'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ToggleBox() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="text-center">
      <button onClick={() => setVisible(!visible)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Toggle
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 p-4 rounded-lg"
          >
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
