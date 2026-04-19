'use client'

import { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, type Target } from 'framer-motion'
import {
  routeEnter, routeExit,
  routeEnterMobile, routeExitMobile,
} from '@/lib/motion'
import { useMediaQuery } from '@/hooks/use-media-query'

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isFirstRender = useRef(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      Promise.resolve().then(() => setAnimate(true))
    }
  }, [])

  const enter = isMobile ? routeEnterMobile : routeEnter
  const exit = isMobile ? routeExitMobile : routeExit

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={animate ? (enter.initial as Target) : false}
        animate={enter.animate as Target}
        exit={exit.exit as Target}
        className="contents"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
