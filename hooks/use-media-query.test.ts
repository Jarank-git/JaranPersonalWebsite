import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from './use-media-query'

type Listener = (event: MediaQueryListEvent) => void

function installMatchMedia(initialMatches: boolean) {
  const listeners: Listener[] = []
  const mql = {
    matches: initialMatches,
    media: '',
    onchange: null,
    addEventListener: (_: string, l: Listener) => listeners.push(l),
    removeEventListener: (_: string, l: Listener) => {
      const i = listeners.indexOf(l)
      if (i >= 0) listeners.splice(i, 1)
    },
    dispatchEvent: () => false,
    addListener: () => {},
    removeListener: () => {},
  }
  window.matchMedia = vi.fn(() => mql as unknown as MediaQueryList)
  return {
    fire: (matches: boolean) => {
      mql.matches = matches
      for (const l of [...listeners]) l({ matches } as MediaQueryListEvent)
    },
  }
}

describe('useMediaQuery', () => {
  let originalMatchMedia: typeof window.matchMedia
  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })
  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('returns the initial match value', () => {
    installMatchMedia(true)
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('returns false when the query does not match', () => {
    installMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('updates when the match state changes', () => {
    const mm = installMatchMedia(false)
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    expect(result.current).toBe(false)
    act(() => mm.fire(true))
    expect(result.current).toBe(true)
    act(() => mm.fire(false))
    expect(result.current).toBe(false)
  })

  it('unsubscribes on unmount', () => {
    const mm = installMatchMedia(false)
    const { result, unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'))
    expect(result.current).toBe(false)
    unmount()
    expect(() => mm.fire(true)).not.toThrow()
  })
})
