'use client'

import { useCallback, useRef } from 'react'
import React from 'react'

export type SwipeDirection = 'up' | 'down'

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
}

export function useSwipe(onSwipe: (direction: SwipeDirection) => void): SwipeHandlers {
  const startY = useRef<number | null>(null)
  const currentY = useRef<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    currentY.current = e.touches[0].clientY
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback(() => {
    if (startY.current === null || currentY.current === null) return
    const delta = currentY.current - startY.current
    if (Math.abs(delta) >= 60) {
      onSwipe(delta > 0 ? 'down' : 'up')
    }
    startY.current = null
    currentY.current = null
  }, [onSwipe])

  return { onTouchStart, onTouchMove, onTouchEnd }
}
