'use client'

import { useEffect, useRef, useState } from 'react'

interface Ember {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  kind: 'ember' | 'gold'
}

const DESKTOP_COUNT = 50
const MOBILE_COUNT = 20
const FPS_DESKTOP = 30
const FPS_MOBILE = 24

function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function EmberField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return

    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT
    const frameInterval = 1000 / (isMobile ? FPS_MOBILE : FPS_DESKTOP)

    const emberColor = readCssVar('--color-ember', 'oklch(52% 0.155 30)')
    const goldColor = readCssVar('--color-gold-bright', 'oklch(76% 0.120 78)')

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (): Ember => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 40,
      r: 0.8 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.25 + Math.random() * 0.55),
      alpha: 0.25 + Math.random() * 0.55,
      kind: Math.random() < 0.18 ? 'gold' : 'ember',
    })

    const embers: Ember[] = Array.from({ length: count }, spawn)

    let rafId = 0
    let lastTime = 0
    const loop = (t: number) => {
      rafId = requestAnimationFrame(loop)
      if (t - lastTime < frameInterval) return
      lastTime = t

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const e of embers) {
        e.x += e.vx
        e.y += e.vy
        if (e.y < -10) Object.assign(e, spawn())
        ctx.globalAlpha = e.alpha
        ctx.fillStyle = e.kind === 'gold' ? goldColor : emberColor
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
