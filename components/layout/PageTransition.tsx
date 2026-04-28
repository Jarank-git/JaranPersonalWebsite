'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MENU_ITEMS } from '@/components/menu/sections'
import { consumeNavDirection } from '@/lib/nav-direction'

const COVER_AT_MS = 190

function getTone(pathname: string): string {
  return MENU_ITEMS.find((m) => m.href === pathname)?.tone ?? MENU_ITEMS[0].tone
}
function getLabel(pathname: string): string {
  return MENU_ITEMS.find((m) => m.href === pathname)?.label ?? ''
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const wipeRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const [contentVisible, setContentVisible] = useState(true)
  const [wipeTone, setWipeTone] = useState(MENU_ITEMS[0].tone)
  const [wipeLabel, setWipeLabel] = useState('')

  useLayoutEffect(() => {
    if (firstRender.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    setContentVisible(false)
  }, [pathname])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setWipeTone(getTone(pathname))
    setWipeLabel(getLabel(pathname))

    const delay = reduced ? 0 : COVER_AT_MS
    const t = setTimeout(() => setContentVisible(true), delay)

    if (!reduced && wipeRef.current) {
      const dir = consumeNavDirection()
      wipeRef.current.setAttribute('data-dir', dir === 'back' ? 'backward' : 'forward')

      const onEnd = () => {
        wipeRef.current?.removeAttribute('data-dir')
      }
      wipeRef.current.addEventListener('animationend', onEnd, { once: true })
    }

    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <div
        ref={wipeRef}
        className="angular-wipe"
        aria-hidden="true"
        style={{ background: wipeTone }}
      >
        {wipeLabel && <span className="angular-wipe-label">{wipeLabel}</span>}
      </div>
      <div className="contents" style={contentVisible ? undefined : { visibility: 'hidden' }}>
        {children}
      </div>
    </>
  )
}
