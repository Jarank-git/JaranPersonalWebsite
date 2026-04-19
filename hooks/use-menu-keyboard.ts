'use client'

import { useCallback, useEffect } from 'react'

export interface UseMenuKeyboardOptions {
  containerRef: React.RefObject<HTMLElement | null>
  enabled?: boolean
}

const IGNORE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

function getItems(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('[data-menu-item]'))
}

export function useMenuKeyboard({
  containerRef,
  enabled = true,
}: UseMenuKeyboardOptions): void {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return
      const target = event.target as HTMLElement | null
      if (target && IGNORE_TAGS.has(target.tagName)) return
      const container = containerRef.current
      if (!container) return
      const items = getItems(container)
      if (items.length === 0) return

      const currentIdx = items.findIndex((el) => el === document.activeElement)
      const idx = currentIdx >= 0 ? currentIdx : 0

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          items[(idx + 1) % items.length].focus()
          return
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          items[(idx - 1 + items.length) % items.length].focus()
          return
        case 'Home':
          event.preventDefault()
          items[0].focus()
          return
        case 'End':
          event.preventDefault()
          items[items.length - 1].focus()
          return
        case ' ': {
          if (currentIdx >= 0) {
            event.preventDefault()
            items[currentIdx].click()
          }
          return
        }
        default:
          return
      }
    },
    [enabled, containerRef],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('keydown', handler)
    return () => container.removeEventListener('keydown', handler)
  }, [containerRef, handler])
}
