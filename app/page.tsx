'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { MenuStack } from '@/components/menu/MenuStack'
import { SummaryPanel } from '@/components/menu/SummaryPanel'
import { ContactPanel } from '@/components/menu/ContactPanel'
import { GhostWatermark } from '@/components/menu/GhostWatermark'
import { MENU_ITEMS } from '@/components/menu/sections'
import { useLayoutMode } from '@/hooks/use-layout-mode'
import { useSwipe } from '@/hooks/use-swipe'

const STAGE_W = 1600
const STAGE_H = 1000
const PANEL_EXIT_MS = 200
const MOBILE_TRANSITION_MS = 380

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

// ------------------------------------------------------------------ //
//  Left-zone panel swap                                               //
// ------------------------------------------------------------------ //

type PanelKey = 'summary' | 'ghost' | 'contact'

function panelKeyFromIdx(idx: number): PanelKey {
  if (idx === 0) return 'summary'
  if (idx === 4) return 'contact'
  return 'ghost'
}

function LeftZonePanel({ selectedIdx }: { selectedIdx: number }) {
  const [panelKey, setPanelKey] = useState<PanelKey>(() => panelKeyFromIdx(selectedIdx))
  const [displayIdx, setDisplayIdx] = useState(selectedIdx)
  const [state, setState] = useState<'visible' | 'exiting' | 'entering'>('visible')

  useEffect(() => {
    const nextKey = panelKeyFromIdx(selectedIdx)
    if (nextKey === panelKey && selectedIdx === displayIdx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPanelKey(nextKey)
      setDisplayIdx(selectedIdx)
      setState('visible')
      return
    }

    setState('exiting')
    const t = setTimeout(() => {
      setPanelKey(nextKey)
      setDisplayIdx(selectedIdx)
      setState('entering')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setState('visible'))
      })
    }, PANEL_EXIT_MS)

    return () => clearTimeout(t)
  }, [selectedIdx, panelKey, displayIdx])

  return (
    <div className="left-panel-wrap" data-state={state} aria-hidden="true">
      {panelKey === 'summary' ? (
        <SummaryPanel />
      ) : panelKey === 'contact' ? (
        <ContactPanel />
      ) : (
        <GhostWatermark
          label={MENU_ITEMS[displayIdx]?.label ?? ''}
          num={MENU_ITEMS[displayIdx]?.num ?? ''}
        />
      )}
    </div>
  )
}

// ------------------------------------------------------------------ //
//  Layout modes                                                        //
// ------------------------------------------------------------------ //

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
        <div className="stage-left-zone">
          <LeftZonePanel selectedIdx={selectedIdx} />
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
        <div className="fluid-left-zone">
          <LeftZonePanel selectedIdx={selectedIdx} />
        </div>
        <MenuStack selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ //
//  Mobile two-state home                                              //
// ------------------------------------------------------------------ //

const SCROLL_STEP = 160

function MobileSummaryCard({
  onNavigate,
  dataExiting,
}: {
  onNavigate: () => void
  dataExiting: boolean
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const scrollUp = () => bodyRef.current?.scrollBy({ top: -SCROLL_STEP, behavior: 'smooth' })
  const scrollDown = () => bodyRef.current?.scrollBy({ top: SCROLL_STEP, behavior: 'smooth' })

  return (
    <div className="mobile-summary-card" data-exiting={dataExiting || undefined}>
      <hr className="mobile-summary-rule" aria-hidden="true" />
      <h2 className="mobile-summary-title">Jaran Khalid</h2>
      <hr className="mobile-summary-rule" aria-hidden="true" />

      <div className="mobile-summary-card-body" ref={bodyRef}>
        <section className="mobile-summary-section" aria-labelledby="msp-experience">
          <h3 id="msp-experience" className="mobile-summary-section-heading">Experience</h3>

          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Business Automation &amp; Systems Developer (Co-op)</span>
            <span className="mobile-summary-entry-sub">
              <a href="https://renellence.com/" target="_blank" rel="noopener noreferrer" className="mobile-summary-entry-company">
                <img src="/assets/Renellence%20Logo.png" alt="" aria-hidden="true" className="mobile-summary-entry-co-mark" />
                Renellence · Jan–Apr 2026
              </a>
            </span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Systems Engineering Intern</span>
            <span className="mobile-summary-entry-sub">
              <a href="https://civilcraft.com/" target="_blank" rel="noopener noreferrer" className="mobile-summary-entry-company">
                <img src="/assets/Civilcraft.png" alt="" aria-hidden="true" className="mobile-summary-entry-co-mark" />
                Civilcraft · Jun–Aug 2025
              </a>
            </span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Electrical Subsystem Member</span>
            <span className="mobile-summary-entry-sub">
              <a href="https://www.uwarg.com/" target="_blank" rel="noopener noreferrer" className="mobile-summary-entry-company">
                <img src="/assets/WARG.png" alt="" aria-hidden="true" className="mobile-summary-entry-co-mark" />
                WARG · Sep 2025–Present
              </a>
            </span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Coding Instructor</span>
            <span className="mobile-summary-entry-sub">
              <a href="https://www.codeninjas.com/milton-on-ca" target="_blank" rel="noopener noreferrer" className="mobile-summary-entry-company">
                <img src="/assets/Code%20Ninjas%20Logo.png" alt="" aria-hidden="true" className="mobile-summary-entry-co-mark" />
                Code Ninjas · Jul–Aug 2025
              </a>
            </span>
          </div>
        </section>

        <section className="mobile-summary-section" aria-labelledby="msp-projects">
          <h3 id="msp-projects" className="mobile-summary-section-heading">Projects</h3>

          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Robotic Arm</span>
            <span className="mobile-summary-entry-sub">Arduino Nano · OpenCV · Altium</span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">STM32F4 + IMU Dev Board</span>
            <span className="mobile-summary-entry-sub">Altium Designer · STM32F411 · MPU-6050</span>
          </div>
          <div className="mobile-summary-entry">
            <span className="mobile-summary-entry-title">Arctic Analytics</span>
            <span className="mobile-summary-entry-sub">Arduino · React · Python</span>
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
                  src="/assets/Uwaterloo_crest.png"
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

      <div className="mobile-scroll-nav" aria-hidden="true">
        <button className="mobile-scroll-nav-btn" onClick={scrollUp} aria-label="Scroll up" type="button">
          <span className="mobile-scroll-nav-chevron mobile-scroll-nav-chevron--up" />
        </button>
        <button className="mobile-scroll-nav-btn" onClick={scrollDown} aria-label="Scroll down" type="button">
          <span className="mobile-scroll-nav-chevron mobile-scroll-nav-chevron--down" />
        </button>
      </div>

      <hr className="mobile-summary-rule" aria-hidden="true" />
      <div className="mobile-summary-footer">
        <a
          href="https://github.com/Jarank-git"
          className="mobile-summary-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <img src="/assets/Github%20Logo.png" alt="" aria-hidden="true" className="mobile-summary-hint-logo" />
          <span>:GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jaran-khalid/"
          className="mobile-summary-hint"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <img src="/assets/Linkedin%20Logo.png" alt="" aria-hidden="true" className="mobile-summary-hint-logo" />
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
    </div>
  )
}

function MobileMenuState({
  onBack,
  dataExiting,
}: {
  onBack: () => void
  dataExiting: boolean
}) {
  const [selectedIdx, setSelectedIdx] = useState(1)

  return (
    <div className="mobile-menu-state home-mobile" data-exiting={dataExiting || undefined}>
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
    </div>
  )
}

function MobileHome() {
  const [cardVisible, setCardVisible] = useState(true)
  const [cardExiting, setCardExiting] = useState(false)
  const [menuExiting, setMenuExiting] = useState(false)

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

  const showMenu = useCallback(() => {
    if (cardExiting || menuExiting) return
    setCardExiting(true)
    setTimeout(() => {
      setCardVisible(false)
      setCardExiting(false)
    }, MOBILE_TRANSITION_MS)
  }, [cardExiting, menuExiting])

  const showCard = useCallback(() => {
    if (cardExiting || menuExiting) return
    setMenuExiting(true)
    setTimeout(() => {
      setCardVisible(true)
      setMenuExiting(false)
    }, MOBILE_TRANSITION_MS)
  }, [cardExiting, menuExiting])

  const swipeHandlers = useSwipe((direction) => {
    if (direction === 'down' && cardVisible) showMenu()
    if (direction === 'up' && !cardVisible) showCard()
  })

  return (
    <div className="mobile-home-wrap" {...swipeHandlers}>
      {cardVisible ? (
        <MobileSummaryCard
          key="card"
          onNavigate={showMenu}
          dataExiting={cardExiting}
        />
      ) : (
        <MobileMenuState
          key="menu"
          onBack={showCard}
          dataExiting={menuExiting}
        />
      )}
    </div>
  )
}

// ------------------------------------------------------------------ //
//  Root page                                                           //
// ------------------------------------------------------------------ //

export default function HomePage() {
  const mode = useLayoutMode()
  const [mounted, setMounted] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  useEffect(() => {
    const saved = sessionStorage.getItem('home-selected-idx')
    if (saved !== null) {
      sessionStorage.removeItem('home-selected-idx')
      const idx = parseInt(saved, 10)
      if (!isNaN(idx) && idx >= 0 && idx < MENU_ITEMS.length) setSelectedIdx(idx)
    }
    setMounted(true)
  }, [])

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
