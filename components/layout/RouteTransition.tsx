'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, type Target } from 'framer-motion'
import { routeEnter, routeExit } from '@/lib/motion'

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirstRender = useRef(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      Promise.resolve().then(() => setAnimate(true))
    }
  }, [])

  const initial = animate ? (routeEnter.initial as Target) : false
  const animateProp = routeEnter.animate as Target
  const exitProp = routeExit.exit as Target

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={initial}
        animate={animateProp}
        exit={exitProp}
        className="contents"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
