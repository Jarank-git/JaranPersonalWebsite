'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ExperienceItemProps {
  label: string
  distance: number  // index - selectedIdx
  selected: boolean
  onSelect: () => void
}

const SPARKLE_COUNT = 10

function getVariant(dist: number) {
  const abs = Math.abs(dist)
  if (abs === 0) return { y: 0,        scale: 1,    opacity: 1,    rotate: -2.5, pointerEvents: 'auto'  as const }
  if (abs === 1) return { y: dist * 185, scale: 0.72, opacity: 0.32, rotate: dist * -1.2 - 2.5, pointerEvents: 'auto' as const }
  if (abs === 2) return { y: dist * 285, scale: 0.56, opacity: 0.1,  rotate: dist * -0.8 - 2.5, pointerEvents: 'none' as const }
  return                { y: dist * 360, scale: 0.44, opacity: 0,    rotate: dist * -0.5 - 2.5, pointerEvents: 'none' as const }
}

export function ExperienceItem({ label, distance, selected, onSelect }: ExperienceItemProps) {
  const sparklesRef = useRef<HTMLSpanElement>(null)
  const didPopulate = useRef(false)

  useEffect(() => {
    const host = sparklesRef.current
    if (!host || didPopulate.current) return
    didPopulate.current = true
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const s = document.createElement('span')
      s.className = 'spk'
      s.style.left = `${8 + Math.random() * 84}%`
      s.style.top = `${12 + Math.random() * 76}%`
      const size = 2 + Math.random() * 4
      s.style.width = s.style.height = `${size}px`
      s.style.animationDelay = `${Math.random() * 2.4}s`
      s.style.animationDuration = `${1.6 + Math.random() * 1.6}s`
      host.appendChild(s)
    }
  }, [])

  const v = getVariant(distance)

  return (
    <motion.li
      role="option"
      aria-selected={selected}
      className="exp-carousel-item"
      animate={v}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: v.pointerEvents }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
    >
      <span className="stain" aria-hidden="true" />
      <span className="sparkles" ref={sparklesRef} aria-hidden="true" />
      <button className="menu-word-btn" type="button" onClick={onSelect}>
        <span className="menu-word">{label}</span>
      </button>
    </motion.li>
  )
}
