'use client'

import { useEffect, useRef, useState } from 'react'
import { useLayoutMode } from '@/hooks/use-layout-mode'
import { useMediaQuery } from '@/hooks/use-media-query'

export function GlobalAtmosphere() {
  const mode = useLayoutMode()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [mounted, setMounted] = useState(false)
  const [idleReady, setIdleReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setIdleReady(true))
      return () => win.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setIdleReady(true), 0)
    return () => window.clearTimeout(t)
  }, [mounted])

  const shouldRenderVideo = mounted && idleReady && !prefersReducedMotion
  const isMobile = mode === 'mobile'

  return (
    <>
      <div className="atmos-bg" aria-hidden />
      {shouldRenderVideo && (
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          ref={videoRef}
          className="atmos-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          onCanPlay={() => videoRef.current?.classList.add('loaded')}
        >
          {isMobile ? (
            <>
              <source src="/wallpaper/shaman-village-mobile.webm" type="video/webm" />
              <source src="/wallpaper/shaman-village-mobile.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/wallpaper/shaman-village.webm" type="video/webm" />
              <source src="/wallpaper/shaman-village.mp4" type="video/mp4" />
            </>
          )}
        </video>
      )}
      <div className="atmos-fade" aria-hidden />
      <div className="atmos-vignette" aria-hidden />
    </>
  )
}
