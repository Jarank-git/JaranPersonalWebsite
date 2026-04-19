'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { MenuSection } from '@/types/content'
import { BrushItem } from './BrushItem'
import { CommandHud } from './CommandHud'

const ITEMS: {
  section: MenuSection
  label: string
  num: string
  href: string
  outline: boolean
  command: string
}[] = [
  { section: 'about',      label: 'ABOUT',      num: '01', href: '/about',      outline: false, command: 'Read the dossier' },
  { section: 'projects',   label: 'PROJECTS',   num: '02', href: '/projects',   outline: true,  command: 'Review the archive' },
  { section: 'experience', label: 'EXPERIENCE', num: '03', href: '/experience', outline: false, command: 'Unfold the timeline' },
  { section: 'contact',    label: 'CONTACT',    num: '04', href: '/contact',    outline: true,  command: 'Send word' },
]

interface MenuStackProps {
  showCommandHud?: boolean
}

export function MenuStack({ showCommandHud = true }: MenuStackProps) {
  const router = useRouter()
  const [selectedIdx, setSelectedIdx] = useState(0)

  const select = useCallback((idx: number) => {
    setSelectedIdx(((idx % ITEMS.length) + ITEMS.length) % ITEMS.length)
  }, [])

  useEffect(() => {
    for (const item of ITEMS) router.prefetch(item.href)
  }, [router])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault()
          select(selectedIdx + 1)
          break
        case 'ArrowUp':
        case 'k':
          e.preventDefault()
          select(selectedIdx - 1)
          break
        case 'Enter':
          e.preventDefault()
          router.push(ITEMS[selectedIdx].href)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx, select, router])

  return (
    <>
      <nav className="menu" aria-label="main menu">
        <ul role="listbox">
          {ITEMS.map((item, i) => (
            <BrushItem
              key={item.section}
              section={item.section}
              label={item.label}
              num={item.num}
              href={item.href}
              outline={item.outline}
              selected={selectedIdx === i}
              onSelect={() => select(i)}
            />
          ))}
        </ul>
      </nav>

      {showCommandHud && <CommandHud currentCommand={ITEMS[selectedIdx].command} />}
    </>
  )
}
