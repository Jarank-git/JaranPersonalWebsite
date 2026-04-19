'use client'

import { useEffect, useRef } from 'react'

const W = 1600
const H = 1000
const N = 70

interface Flake {
  x: number
  y: number
  size: number
  vy: number
  vx: number
  swayAmp: number
  swaySpeed: number
  phase: number
  rot: number
  vr: number
  hue: number
  light: number
  alpha: number
  twinkle: number
}

function makeFlake(reset: boolean): Flake {
  return {
    x: Math.random() * W,
    y: reset ? -20 : Math.random() * H,
    size: 1.2 + Math.random() * 3.2,
    vy: 0.15 + Math.random() * 0.55,
    vx: (Math.random() - 0.5) * 0.35,
    swayAmp: 8 + Math.random() * 28,
    swaySpeed: 0.004 + Math.random() * 0.012,
    phase: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.02,
    hue: 75 + Math.random() * 18,
    light: 0.62 + Math.random() * 0.25,
    alpha: 0.4 + Math.random() * 0.55,
    twinkle: 0.6 + Math.random() * 0.4,
  }
}

export function GoldenFlakes() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return

    const flakes = Array.from({ length: N }, () => makeFlake(false))
    let rafId = 0

    function tick(t: number) {
      rafId = requestAnimationFrame(tick)
      ctx!.clearRect(0, 0, W, H)

      for (const f of flakes) {
        f.phase += f.swaySpeed
        f.y += f.vy
        f.x += f.vx + Math.sin(f.phase) * 0.4
        f.rot += f.vr

        if (f.y > H + 20 || f.x < -30 || f.x > W + 30) {
          Object.assign(f, makeFlake(true))
        }

        const tw = 0.7 + 0.3 * Math.sin(t * 0.003 + f.phase * 2)
        const a = f.alpha * tw * f.twinkle

        ctx!.save()
        ctx!.translate(f.x + Math.sin(f.phase) * f.swayAmp * 0.1, f.y)
        ctx!.rotate(f.rot)

        const grd = ctx!.createRadialGradient(0, 0, 0, 0, 0, f.size * 4)
        grd.addColorStop(0, `oklch(${f.light} 0.18 ${f.hue} / ${a})`)
        grd.addColorStop(0.4, `oklch(${f.light - 0.1} 0.16 ${f.hue} / ${a * 0.4})`)
        grd.addColorStop(1, `oklch(0.5 0.1 ${f.hue} / 0)`)
        ctx!.fillStyle = grd
        ctx!.beginPath()
        ctx!.arc(0, 0, f.size * 4, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.fillStyle = `oklch(${f.light + 0.08} 0.17 ${f.hue} / ${Math.min(1, a * 1.4)})`
        ctx!.beginPath()
        ctx!.ellipse(0, 0, f.size, f.size * 0.42, 0, 0, Math.PI * 2)
        ctx!.fill()

        ctx!.restore()
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={ref}
      className="golden-flakes"
      width={W}
      height={H}
      aria-hidden="true"
    />
  )
}
