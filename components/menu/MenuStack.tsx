'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { BrushItem } from './BrushItem'
import { MENU_ITEMS } from './sections'

const KEY_THROTTLE_MS = 280

interface MenuStackProps {
  selectedIdx: number
  setSelectedIdx: (idx: number) => void
}

export function MenuStack({ selectedIdx, setSelectedIdx }: MenuStackProps) {
  const router = useRouter()
  const lastKeyAt = useRef(0)
  // Tracks the keyboard cursor independently of mouse-hover visual state.
  // Initialized once from selectedIdx (which is already restored from sessionStorage
  // before MenuStack first mounts, so useRef captures the correct starting position).
  const kbIdx = useRef(selectedIdx)

  const select = useCallback(
    (idx: number) => {
      setSelectedIdx(((idx % MENU_ITEMS.length) + MENU_ITEMS.length) % MENU_ITEMS.length)
    },
    [setSelectedIdx],
  )

  useEffect(() => {
    for (const item of MENU_ITEMS) router.prefetch(item.href)
  }, [router])

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
          kbIdx.current = (kbIdx.current + 1 + MENU_ITEMS.length) % MENU_ITEMS.length
          select(kbIdx.current)
          break
        case 'ArrowUp':
        case 'k':
          e.preventDefault()
          if (now - lastKeyAt.current < KEY_THROTTLE_MS) return
          lastKeyAt.current = now
          kbIdx.current = (kbIdx.current - 1 + MENU_ITEMS.length) % MENU_ITEMS.length
          select(kbIdx.current)
          break
        case 'Enter':
          e.preventDefault()
          if (!MENU_ITEMS[kbIdx.current].panel) {
            sessionStorage.setItem('home-selected-idx', String(kbIdx.current))
            router.push(MENU_ITEMS[kbIdx.current].href)
          }
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select, router])

  return (
    <nav className="menu" aria-label="main menu">
      <ul role="listbox">
        {MENU_ITEMS.map((item, i) => (
          <BrushItem
            key={item.section}
            section={item.section}
            label={item.label}
            num={item.num}
            href={item.href}
            outline={item.outline}
            panel={item.panel}
            selected={selectedIdx === i}
            onSelect={() => select(i)}
            onActivate={() => { kbIdx.current = i; select(i) }}
            onNavigate={() => sessionStorage.setItem('home-selected-idx', String(i))}
          />
        ))}
      </ul>
    </nav>
  )
}
