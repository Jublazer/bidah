'use client'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { useState } from 'react'

export default function LayoutTransitionCards() {
  const [selected, setSelected] = useState(null)

  return (
    <AnimateSharedLayout>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3].map((id) => (
          <motion.div
            layoutId={`card-${id}`}
            key={id}
            className="p-6 bg-white rounded shadow cursor-pointer"
            onClick={() => setSelected(id)}
          >
            Card {id}
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          layoutId={`card-${selected}`}
          className="fixed top-10 left-1/2 -translate-x-1/2 bg-white p-10 rounded shadow-lg z-50"
          onClick={() => setSelected(null)}
        >
          Expanded Card {selected} (click to close)
        </motion.div>
      )}
    </AnimateSharedLayout>
  )
}
