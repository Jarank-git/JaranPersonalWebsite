'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoldenFlakes } from '@/components/layout/GoldenFlakes'
import { MenuStack } from '@/components/menu/MenuStack'
import { SummaryPanel } from '@/components/menu/SummaryPanel'
import { GhostWatermark } from '@/components/menu/GhostWatermark'
import { MENU_ITEMS } from '@/components/menu/sections'
import { useLayoutMode } from '@/hooks/use-layout-mode'
import { useSwipe } from '@/hooks/use-swipe'

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

interface HomeProps {
  selectedIdx: number
  setSelectedIdx: (idx: number) => void
}

function CinematicHome({ selectedIdx, setSelectedIdx }: HomeProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  useStageScale(stageRef, true)

  return (
    <div className="stage-wrap">
      <div className="stage" ref={stageRef}>
        <GoldenFlakes />
        <div className="stage-left-zone" aria-hidden="true">
          <AnimatePresence mode="wait">
            {selectedIdx === 0 ? (
              <SummaryPanel key="summary" />
            ) : (
              <GhostWatermark
                key={selectedIdx}
                label={MENU_ITEMS[selectedIdx]?.label ?? ''}
                num={MENU_ITEMS[selectedIdx]?.num ?? ''}
              />
            )}
          </AnimatePresence>
        </div>
        <MenuStack selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>
    </div>
  )
}

function FluidHome({ selectedIdx, setSelectedIdx }: HomeProps) {
  return (
    <div className="home-fluid">
      <div className="home-center">
        <div className="fluid-left-zone" aria-hidden="true">
          <AnimatePresence mode="wait">
            {selectedIdx === 0 ? (
              <SummaryPanel key="summary" />
            ) : (
              <GhostWatermark
                key={selectedIdx}
                label={MENU_ITEMS[selectedIdx]?.label ?? ''}
                num={MENU_ITEMS[selectedIdx]?.num ?? ''}
              />
            )}
          </AnimatePresence>
        </div>
        <MenuStack selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>
    </div>
  )
}

function MobileSummaryCard({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      className="mobile-summary-card"
      key="card"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.7, 0, 0.3, 1] }}
    >
      <div className="mobile-summary-card-top-band" aria-hidden="true">
        <span className="mobile-summary-card-id">00 · SUMMARY</span>
      </div>
      <div className="mobile-summary-card-accent" aria-hidden="true" />

      <div className="mobile-summary-card-body">
        <div aria-label="Jaran Khalid">
          <span className="mobile-summary-name">JARAN</span>
          <span className="mobile-summary-name"> KHALID</span>
        </div>

        <div className="mobile-summary-rule" aria-hidden="true" />

        <p className="mobile-summary-degree">
          BASc Electrical Engineering · Waterloo
        </p>

        <p className="mobile-summary-bio">
          Building at the intersection of hardware and software.
        </p>

        <div className="mobile-summary-info-card mobile-summary-info-card--red">
          <span className="mobile-summary-info-label">▸ Experience</span>
          <span className="mobile-summary-info-title">Internship · Company</span>
          <span className="mobile-summary-info-sub">Role · 2024</span>
        </div>

        <div className="mobile-summary-info-card mobile-summary-info-card--gold">
          <span className="mobile-summary-info-label">▸ Top Project</span>
          <span className="mobile-summary-info-title">Project Name</span>
          <span className="mobile-summary-info-sub">React · TypeScript</span>
        </div>

        <div className="mobile-summary-info-card mobile-summary-info-card--purple">
          <span className="mobile-summary-info-label">▸ Degree</span>
          <span className="mobile-summary-info-title">BASc Electrical Engineering</span>
          <span className="mobile-summary-info-sub">University of Waterloo · 202X</span>
        </div>
      </div>

      <button
        className="mobile-summary-swipe-btn"
        onClick={onNavigate}
        aria-label="Open navigation menu"
        type="button"
      >
        <span className="mobile-summary-swipe-hint">Swipe to navigate</span>
        <span className="mobile-summary-swipe-chevron" aria-hidden="true" />
      </button>
    </motion.div>
  )
}

function MobileMenuState({ onBack }: { onBack: () => void }) {
  const [selectedIdx, setSelectedIdx] = useState(1)

  return (
    <motion.div
      className="mobile-menu-state home-mobile"
      key="menu"
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.7, 0, 0.3, 1] }}
    >
      <button
        className="mobile-back-btn"
        onClick={onBack}
        aria-label="Back to summary"
        type="button"
      >
        <span className="mobile-back-chevron" aria-hidden="true" />
        <span className="mobile-back-name">JARAN KHALID</span>
      </button>

      <div className="home-center" style={{ flex: 1 }}>
        <MenuStack selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>

      <div className="mobile-menu-hud" aria-live="polite">
        TAP to select · SWIPE UP for summary
      </div>
    </motion.div>
  )
}

function MobileHome() {
  const [cardVisible, setCardVisible] = useState(true)

  useEffect(() => {
    if (cardVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cardVisible])

  const swipeHandlers = useSwipe((direction) => {
    if (direction === 'down' && cardVisible) setCardVisible(false)
    if (direction === 'up' && !cardVisible) setCardVisible(true)
  })

  return (
    <div className="mobile-home-wrap" {...swipeHandlers}>
      <AnimatePresence mode="wait">
        {cardVisible ? (
          <MobileSummaryCard key="card" onNavigate={() => setCardVisible(false)} />
        ) : (
          <MobileMenuState key="menu" onBack={() => setCardVisible(true)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HomePage() {
  const mode = useLayoutMode()
  const [mounted, setMounted] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="stage-wrap" aria-hidden>
        <div className="stage" />
      </div>
    )
  }

  if (mode === 'cinematic') return <CinematicHome selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
  if (mode === 'fluid') return <FluidHome selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
  return <MobileHome />
}
