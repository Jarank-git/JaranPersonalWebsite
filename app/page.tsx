'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuStack } from '@/components/menu/MenuStack'
import { SummaryPanel } from '@/components/menu/SummaryPanel'
import { ContactPanel } from '@/components/menu/ContactPanel'
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
        <div className="stage-left-zone" aria-hidden="true">
          <AnimatePresence mode="wait">
            {selectedIdx === 0 ? (
              <SummaryPanel key="summary" />
            ) : selectedIdx === 4 ? (
              <ContactPanel key="contact" />
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
            ) : selectedIdx === 4 ? (
              <ContactPanel key="contact" />
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
      <hr className="mobile-summary-rule" aria-hidden="true" />
      <h2 className="mobile-summary-title">Jaran Khalid</h2>
      <hr className="mobile-summary-rule" aria-hidden="true" />

      <div className="mobile-summary-card-body">
        <section className="mobile-summary-section" aria-labelledby="msp-experience">
          <h3 id="msp-experience" className="mobile-summary-section-heading">Experience</h3>

          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Systems Eng. Intern · Civilcraft</span>
            <span className="mobile-summary-entry-sub">Remote · Jun–Aug 2025</span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Electrical Subsystem · WARG</span>
            <span className="mobile-summary-entry-sub">Waterloo · Sep 2025–Present</span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Coding Instructor · Code Ninjas</span>
            <span className="mobile-summary-entry-sub">Milton · Jul–Aug 2025</span>
          </div>
        </section>

        <section className="mobile-summary-section" aria-labelledby="msp-projects">
          <h3 id="msp-projects" className="mobile-summary-section-heading">Projects</h3>

          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">12-24V Buck Boost Converter</span>
            <span className="mobile-summary-entry-sub">Altium Designer · WARG</span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Patient Env. Management System</span>
            <span className="mobile-summary-entry-sub">Python · Flask · Raspberry Pi</span>
          </div>
        </section>

        <section className="mobile-summary-section" aria-labelledby="msp-education">
          <h3 id="msp-education" className="mobile-summary-section-heading">Education</h3>

          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">BASc Electrical Engineering</span>
            <span className="mobile-summary-entry-sub">
              <a
                href="https://uwaterloo.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-summary-entry-link"
              >
                <img
                  src="/assets/uwaterloo-crest.png"
                  alt=""
                  aria-hidden="true"
                  className="mobile-summary-entry-mark"
                />
                University of Waterloo · 2025–2030
              </a>
            </span>
          </div>
        </section>
      </div>

      <hr className="mobile-summary-rule" aria-hidden="true" />
      <div className="mobile-summary-footer">
        <a href="/resume.pdf" className="mobile-summary-hint" download aria-label="Download resume">
          <span className="mobile-summary-hint-glyph" aria-hidden="true" />
          <span>:Resume</span>
        </a>
        <a
          href="https://github.com/Jarank-git"
          className="mobile-summary-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <span className="mobile-summary-hint-glyph" aria-hidden="true" />
          <span>:GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jaran-khalid/"
          className="mobile-summary-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <span className="mobile-summary-hint-glyph" aria-hidden="true" />
          <span>:LinkedIn</span>
        </a>
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
