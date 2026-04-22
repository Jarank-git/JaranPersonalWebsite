'use client'

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MENU_ITEMS } from '@/components/menu/sections'

const TOTAL_S       = 0.5
const COVER_POINT   = 0.38                                          // 190ms in, 310ms out
const COVER_AT_MS   = Math.round(TOTAL_S * COVER_POINT * 1000)     // 190
const SWEEP_IN_EASE  = [0.4, 0, 0.2, 1] as [number, number, number, number]
const SWEEP_OUT_EASE = [0.4, 0, 0.6, 1] as [number, number, number, number]

const CLIP_RIGHT = 'polygon(110% 0%, 200% 0%, 200% 100%, 110% 100%)'
const CLIP_COVER = 'polygon(-5% 0%, 108% 0%, 100% 100%, -5% 100%)'
const CLIP_LEFT  = 'polygon(-200% 0%, -5% 0%, -5% 100%, -200% 100%)'

function getTone(pathname: string): string {
  return MENU_ITEMS.find((m) => m.href === pathname)?.tone ?? MENU_ITEMS[0].tone
}
function getLabel(pathname: string): string {
  return MENU_ITEMS.find((m) => m.href === pathname)?.label ?? ''
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const controls = useAnimationControls()
  const firstRender = useRef(true)
  const reduced = useReducedMotion()
  const [contentVisible, setContentVisible] = useState(true)
  const [wipeTone, setWipeTone]   = useState(MENU_ITEMS[0].tone)
  const [wipeLabel, setWipeLabel] = useState('')

  // useLayoutEffect fires before paint — prevents new-page content flashing
  // through for one frame before we hide it
  useLayoutEffect(() => {
    if (firstRender.current) return
    if (reduced) return
    setContentVisible(false)
  }, [pathname, reduced])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduced) return

    setWipeTone(getTone(pathname))
    setWipeLabel(getLabel(pathname))

    const t = setTimeout(() => setContentVisible(true), COVER_AT_MS)

    controls.start({
      clipPath: [CLIP_RIGHT, CLIP_COVER, CLIP_LEFT],
      transition: {
        duration: TOTAL_S,
        times: [0, COVER_POINT, 1],
        ease: [SWEEP_IN_EASE, SWEEP_OUT_EASE],
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
        {wipeLabel && <span className="angular-wipe-label">{wipeLabel}</span>}
      </motion.div>
      <div className="contents" style={contentVisible ? undefined : { visibility: 'hidden' }}>
        {children}
      </div>
    </>
  )
}
