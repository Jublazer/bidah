'use client'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

interface AnimatedImageProps {
  src: string;
}

export default function AnimatedImage({ src }: AnimatedImageProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const variant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
  }

  return (
    <motion.img
      ref={ref}
      src={src}
      alt="Image"
      className="rounded-xl w-full max-w-md mx-auto"
      initial="hidden"
      animate={controls}
      variants={variant}
    />
  )
}
