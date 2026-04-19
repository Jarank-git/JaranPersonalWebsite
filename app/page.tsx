'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { GoldenFlakes } from '@/components/layout/GoldenFlakes'
import { HudCard } from '@/components/menu/HudCard'
import { PartyChips } from '@/components/menu/PartyChips'
import { MenuStack } from '@/components/menu/MenuStack'
import { Stamp } from '@/components/menu/Stamp'
import { useLayoutMode } from '@/hooks/use-layout-mode'

const STAGE_W = 1600
const STAGE_H = 1000

function useStageScale(stageRef: React.RefObject<HTMLDivElement | null>, active: boolean) {
  const fit = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const wrap = stage.parentElement
    if (!wrap) return
    const s = Math.min(wrap.clientWidth / STAGE_W, wrap.clientHeight / STAGE_H)
    stage.style.transform = `scale(${s})`
  }, [stageRef])

  useEffect(() => {
    if (!active) return
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [fit, active])
}

function Splatters() {
  return (
    <>
      <div
        className="splat"
        style={{ left: 40, top: 40, width: 140, height: 90, transform: 'rotate(-12deg)', opacity: 0.55 }}
      >
        <svg><use href="#splat1" /></svg>
      </div>
      <div
        className="splat"
        style={{ right: 280, top: 170, width: 110, height: 80, transform: 'rotate(28deg)', opacity: 0.45 }}
      >
        <svg><use href="#splat2" /></svg>
      </div>
      <div
        className="splat"
        style={{ left: 660, bottom: 160, width: 160, height: 100, transform: 'rotate(-20deg)', opacity: 0.3 }}
      >
        <svg><use href="#splat1" /></svg>
      </div>
      <div
        className="splat"
        style={{ right: 40, bottom: 220, width: 100, height: 70, transform: 'rotate(14deg)', opacity: 0.5 }}
      >
        <svg><use href="#splat2" /></svg>
      </div>
      <div
        className="splat"
        style={{ left: 860, top: 80, width: 120, height: 80, transform: 'rotate(40deg)', opacity: 0.3 }}
      >
        <svg><use href="#splat1" /></svg>
      </div>
    </>
  )
}

function CinematicHome() {
  const stageRef = useRef<HTMLDivElement>(null)
  useStageScale(stageRef, true)

  return (
    <div className="stage-wrap">
      <div className="stage" ref={stageRef}>
        <div className="bg-glyph">EXPEDITION</div>
        <GoldenFlakes />
        <Splatters />
        <HudCard />
        <PartyChips />
        <MenuStack />
        <Stamp />
      </div>
    </div>
  )
}

function FluidHome() {
  return (
    <div className="home-fluid">
      <div className="home-row-top">
        <HudCard />
        <PartyChips />
      </div>
      <div className="home-center">
        <div className="bg-glyph" style={{ opacity: 0.06 }}>EXPEDITION</div>
        <MenuStack />
      </div>
      <div className="home-row-bottom">
        <Stamp />
      </div>
    </div>
  )
}

function MobileHome() {
  return (
    <div className="home-mobile">
      <div className="home-row-top">
        <HudCard />
      </div>
      <div className="home-center">
        <MenuStack showCommandHud={false} />
      </div>
      <div className="home-row-bottom">
        <Stamp />
      </div>
    </div>
  )
}

export default function HomePage() {
  const mode = useLayoutMode()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="stage-wrap" aria-hidden>
        <div className="stage" />
      </div>
    )
  }

  if (mode === 'cinematic') return <CinematicHome />
  if (mode === 'fluid') return <FluidHome />
  return <MobileHome />
}
