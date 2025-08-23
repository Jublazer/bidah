'use client'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

import { ReactNode } from 'react'

interface ScrollFadeTextProps {
  children: ReactNode
}

export default function ScrollFadeText({ children }: ScrollFadeTextProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      // className="text-lg leading-relaxed text-gray-700"
    >
      {children}
    </motion.div>
  )
}
