'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { MenuSection } from '@/types/content'

interface BrushItemProps {
  section: MenuSection
  label: string
  num: string
  href: string
  outline?: boolean
  selected: boolean
  onSelect: () => void
}

const SPARKLE_COUNT = 10

export function BrushItem({
  label,
  num,
  href,
  outline = false,
  selected,
  onSelect,
}: BrushItemProps) {
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

  return (
    <li
      role="option"
      className={outline ? 'stroked' : undefined}
      aria-selected={selected}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <span className="stain" aria-hidden="true">
        <svg preserveAspectRatio="none">
          <use href="#inkStain" />
        </svg>
      </span>
      <span className="sparkles" ref={sparklesRef} aria-hidden="true" />
      <Link href={href} prefetch>
        <span className="menu-word">{label}</span>
      </Link>
    </li>
  )
}
