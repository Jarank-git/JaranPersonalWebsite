'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { BackButton } from '@/components/layout/BackButton'
import { ExperienceItem } from '@/components/experience/ExperienceItem'
import { ExperienceDetail } from '@/components/experience/ExperienceDetail'

const EXPERIENCES = [
  {
    role: 'Business Automation & Systems Developer',
    company: 'Renellence Inc',
    location: 'North York, Ontario',
    start: 'Jan 2026',
    end: 'Present',
    stack: ['n8n', 'Next.js', 'Shopify API', 'Supabase'],
    bullets: [
      'Developed end-to-end B2B automation workflows using n8n to streamline purchase order processing for sales reps, reducing ordering latency and processing $200,000 in gross revenue.',
      'Built a B2C ordering dashboard using Next.js and Shopify API, leveraging API routes to support 150+ customers.',
      'Engineered custom loyalty logic via API routes and Supabase to handle complex promotional triggers and ensure real-time data synchronization, contributing to 15% of net revenue annually.',
    ],
  },
  {
    role: 'Systems Engineering Intern',
    company: 'Civilcraft Engineering LLC',
    location: 'New York City, NY (Remote)',
    start: 'Jun 2025',
    end: 'Aug 2025',
    stack: ['Python', 'pandas', 'NYC Open Data API'],
    bullets: [
      'Secured $30k in contracts through an automated lead-generation system targeting NYC\'s Facade Inspection Safety Program.',
      'Designed a data acquisition pipeline to structure 700,000+ records, achieving 96% accuracy.',
      'Validated the system against test datasets to eliminate potential false positives.',
    ],
  },
  {
    role: 'Electrical Subsystem Member',
    company: 'Waterloo Aerial Robotics Group',
    location: 'Waterloo, Ontario',
    start: 'Sep 2025',
    end: 'Present',
    stack: ['Altium Designer', 'LTspice', 'Oscilloscope', 'Soldering'],
    bullets: [
      'Designed 10+ custom schematics and PCBs for competition drone power systems.',
      'Validated PCBs with oscilloscope and multimeter, making 25+ corrections through soldering.',
      'Implemented PCBs onto the final competition drone.',
    ],
  },
  {
    role: 'Coding Instructor',
    company: 'Code Ninjas',
    location: 'Milton, Ontario',
    start: 'Jul 2025',
    end: 'Aug 2025',
    stack: ['JavaScript', 'Python', 'Unity', 'Chrome Extensions'],
    bullets: [
      'Prevented student data loss by 90% via a custom JavaScript Chrome extension monitoring the web IDE\'s DOM.',
      'Taught 25+ students JavaScript, Python, and Unity at their respective skill levels.',
      'Maintained 35+ computers with hardware repairs and software updates.',
    ],
  },
]

const KEY_THROTTLE_MS = 280
const TRANSITION_LOCK_MS = 500  // matches Framer Motion transition duration

export default function ExperiencePage() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const lastKeyAt = useRef(0)
  const carouselRef = useRef<HTMLUListElement>(null)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const select = useCallback((idx: number) => {
    setSelectedIdx(((idx % EXPERIENCES.length) + EXPERIENCES.length) % EXPERIENCES.length)
  }, [])

  // Lock pointer events on the carousel after any keyboard navigation so
  // animating items can't fire onMouseEnter mid-flight and chain to wrong items.
  const selectWithKeyLock = useCallback((idx: number) => {
    const ul = carouselRef.current
    if (ul) {
      ul.dataset.kbdNav = 'true'
      if (lockTimer.current) clearTimeout(lockTimer.current)
      lockTimer.current = setTimeout(() => {
        delete ul.dataset.kbdNav
      }, TRANSITION_LOCK_MS)
    }
    select(idx)
  }, [select])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const now = Date.now()
      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault()
          if (now - lastKeyAt.current < KEY_THROTTLE_MS) return
          lastKeyAt.current = now
          selectWithKeyLock(selectedIdx + 1)
          break
        case 'ArrowUp':
        case 'k':
          e.preventDefault()
          if (now - lastKeyAt.current < KEY_THROTTLE_MS) return
          lastKeyAt.current = now
          selectWithKeyLock(selectedIdx - 1)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx, selectWithKeyLock])

  return (
    <div className="exp-page">
      <div className="exp-back-row">
        <BackButton />
      </div>

      <div className="exp-stage">
        {/* Left zone — detail panel, same as SummaryPanel slot on home */}
        <div className="exp-left-zone" aria-live="polite">
          <ExperienceDetail exp={EXPERIENCES[selectedIdx]} />
        </div>

        {/* Right zone — carousel of job entries */}
        <nav className="exp-menu-zone" aria-label="experience entries">
          <ul className="exp-carousel" role="listbox" ref={carouselRef}>
            {EXPERIENCES.map((exp, i) => (
              <ExperienceItem
                key={exp.company}
                label={exp.role}
                distance={i - selectedIdx}
                selected={selectedIdx === i}
                onSelect={() => select(i)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
