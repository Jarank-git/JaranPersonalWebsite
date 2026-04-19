'use client'

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const SWEEP = {
  duration: 0.75,
  times: [0, 0.48, 1],
  ease: [0.7, 0, 0.3, 1] as [number, number, number, number],
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const curtain = useAnimationControls()
  const firstRender = useRef(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduced) return
    curtain.start({
      x: ['-110%', '0%', '110%'],
      transition: SWEEP,
    })
  }, [pathname, curtain, reduced])

  return (
    <>
      <motion.div
        className="ink-curtain"
        aria-hidden
        initial={{ x: '-110%' }}
        animate={curtain}
      >
        <div className="ink-curtain-edge-glow" />
      </motion.div>
      {children}
    </>
  )
}
