import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSwipe } from './use-swipe'
import React from 'react'

function touch(y: number): React.TouchEvent {
  return { touches: [{ clientY: y }] } as unknown as React.TouchEvent
}

describe('useSwipe', () => {
  it('fires "down" callback when downward delta >= 60px', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    result.current.onTouchStart(touch(100))
    result.current.onTouchMove(touch(161))
    result.current.onTouchEnd()
    expect(onSwipe).toHaveBeenCalledWith('down')
    expect(onSwipe).toHaveBeenCalledTimes(1)
  })

  it('fires "up" callback when upward delta >= 60px', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    result.current.onTouchStart(touch(200))
    result.current.onTouchMove(touch(139))
    result.current.onTouchEnd()
    expect(onSwipe).toHaveBeenCalledWith('up')
  })

  it('does not fire when delta is exactly 59px', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    result.current.onTouchStart(touch(100))
    result.current.onTouchMove(touch(159))
    result.current.onTouchEnd()
    expect(onSwipe).not.toHaveBeenCalled()
  })

  it('uses the last touchmove position, not the first', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    result.current.onTouchStart(touch(100))
    result.current.onTouchMove(touch(110))   // not enough yet
    result.current.onTouchMove(touch(165))   // now enough
    result.current.onTouchEnd()
    expect(onSwipe).toHaveBeenCalledWith('down')
  })

  it('resets state after touchEnd so the next gesture is independent', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    // first gesture — not enough
    result.current.onTouchStart(touch(100))
    result.current.onTouchMove(touch(140))
    result.current.onTouchEnd()
    expect(onSwipe).not.toHaveBeenCalled()
    // second gesture — enough
    result.current.onTouchStart(touch(100))
    result.current.onTouchMove(touch(162))
    result.current.onTouchEnd()
    expect(onSwipe).toHaveBeenCalledTimes(1)
    expect(onSwipe).toHaveBeenCalledWith('down')
  })

  it('does not fire without a preceding touchstart', () => {
    const onSwipe = vi.fn()
    const { result } = renderHook(() => useSwipe(onSwipe))
    result.current.onTouchEnd()
    expect(onSwipe).not.toHaveBeenCalled()
  })
})
