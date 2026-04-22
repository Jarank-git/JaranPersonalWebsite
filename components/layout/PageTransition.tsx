'use client'

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MENU_ITEMS } from '@/components/menu/sections'

const COVER_DURATION = 0.38
const SWEEP_EASE = [0.7, 0, 0.3, 1] as [number, number, number, number]
const COVER_AT_MS = Math.round(COVER_DURATION * 2.2 * 0.42 * 1000)

// Polygon points: off-screen right → covering → off-screen left
// Angular leading edge gives the P3R diagonal cut feel
const CLIP_RIGHT   = 'polygon(110% 0%, 200% 0%, 200% 100%, 110% 100%)'
const CLIP_COVER   = 'polygon(-5% 0%, 108% 0%, 100% 100%, -5% 100%)'
const CLIP_LEFT    = 'polygon(-200% 0%, -5% 0%, -5% 100%, -200% 100%)'

function getToneForPath(pathname: string): string {
  return MENU_ITEMS.find((item) => item.href === pathname)?.tone ?? MENU_ITEMS[0].tone
}

function getLabelForPath(pathname: string): string {
  return MENU_ITEMS.find((item) => item.href === pathname)?.label ?? ''
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const controls = useAnimationControls()
  const firstRender = useRef(true)
  const reduced = useReducedMotion()
  const [contentVisible, setContentVisible] = useState(true)
  const [wipeTone, setWipeTone] = useState(MENU_ITEMS[0].tone)
  const [wipeLabel, setWipeLabel] = useState('')

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduced) return

    setWipeTone(getToneForPath(pathname))
    setWipeLabel(getLabelForPath(pathname))
    setContentVisible(false)

    const t = setTimeout(() => setContentVisible(true), COVER_AT_MS)

    controls.start({
      clipPath: [CLIP_RIGHT, CLIP_COVER, CLIP_LEFT],
      transition: {
        duration: COVER_DURATION * 2.2,
        times: [0, 0.42, 1],
        ease: SWEEP_EASE,
      },
    })

    return () => clearTimeout(t)
  }, [pathname, controls, reduced])

  return (
    <>
      <motion.div
        className="angular-wipe"
        aria-hidden="true"
        initial={{ clipPath: CLIP_RIGHT }}
        animate={controls}
        style={{ background: wipeTone }}
      >
        {wipeLabel && (
          <span className="angular-wipe-label">{wipeLabel}</span>
        )}
      </motion.div>
      <div
        className="contents"
        style={contentVisible ? undefined : { visibility: 'hidden' }}
      >
        {children}
      </div>
    </>
  )
}
