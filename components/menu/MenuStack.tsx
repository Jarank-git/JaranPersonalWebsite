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
  const kbIdx = useRef(selectedIdx)
  // Last-input-wins: arrow keys disable hover, any mouse movement re-enables it.
  // Starts in 'keyboard' so cursor drift on navigation return doesn't hijack selection.
  const inputMode = useRef<'mouse' | 'keyboard'>('keyboard')

  const select = useCallback(
    (idx: number) => {
      setSelectedIdx(((idx % MENU_ITEMS.length) + MENU_ITEMS.length) % MENU_ITEMS.length)
    },
    [setSelectedIdx],
  )

  // Any mouse movement re-enables mouse mode
  useEffect(() => {
    const onMove = () => { inputMode.current = 'mouse' }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

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
          inputMode.current = 'keyboard'
          kbIdx.current = (kbIdx.current + 1 + MENU_ITEMS.length) % MENU_ITEMS.length
          select(kbIdx.current)
          break
        case 'ArrowUp':
        case 'k':
          e.preventDefault()
          if (now - lastKeyAt.current < KEY_THROTTLE_MS) return
          lastKeyAt.current = now
          inputMode.current = 'keyboard'
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

  // Hover only works in mouse mode; also syncs kbIdx so subsequent arrow keys
  // continue naturally from wherever the mouse last landed.
  const handleHover = useCallback((i: number) => {
    if (inputMode.current === 'keyboard') return
    kbIdx.current = i
    select(i)
  }, [select])

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
            onSelect={() => handleHover(i)}
            onActivate={() => { inputMode.current = 'mouse'; kbIdx.current = i; select(i) }}
            onNavigate={() => sessionStorage.setItem('home-selected-idx', String(i))}
          />
        ))}
      </ul>
    </nav>
  )
}
