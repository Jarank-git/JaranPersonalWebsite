import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMenuKeyboard } from './use-menu-keyboard'

function setup(itemCount: number, enabled: boolean = true) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const items: HTMLAnchorElement[] = []
  const clicks: ReturnType<typeof vi.fn>[] = []
  for (let i = 0; i < itemCount; i++) {
    const a = document.createElement('a')
    a.setAttribute('data-menu-item', '')
    a.setAttribute('href', `/item-${i}`)
    a.tabIndex = 0
    const spy = vi.fn((ev: Event) => ev.preventDefault())
    a.addEventListener('click', spy)
    container.appendChild(a)
    items.push(a)
    clicks.push(spy)
  }
  const containerRef = { current: container } as React.RefObject<HTMLElement>
  renderHook(() => useMenuKeyboard({ containerRef, enabled }))
  return { container, items, clicks, cleanup: () => document.body.removeChild(container) }
}

function pressKey(target: Element, key: string) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
  target.dispatchEvent(event)
}

describe('useMenuKeyboard', () => {
  it('ArrowDown on a focused item moves focus to the next', () => {
    const { items, cleanup } = setup(4)
    items[0].focus()
    act(() => pressKey(items[0], 'ArrowDown'))
    expect(document.activeElement).toBe(items[1])
    cleanup()
  })

  it('ArrowUp on a focused item moves focus to the previous', () => {
    const { items, cleanup } = setup(4)
    items[2].focus()
    act(() => pressKey(items[2], 'ArrowUp'))
    expect(document.activeElement).toBe(items[1])
    cleanup()
  })

  it('ArrowDown wraps from last to first', () => {
    const { items, cleanup } = setup(4)
    items[3].focus()
    act(() => pressKey(items[3], 'ArrowDown'))
    expect(document.activeElement).toBe(items[0])
    cleanup()
  })

  it('ArrowUp wraps from first to last', () => {
    const { items, cleanup } = setup(4)
    items[0].focus()
    act(() => pressKey(items[0], 'ArrowUp'))
    expect(document.activeElement).toBe(items[3])
    cleanup()
  })

  it('Home focuses the first item', () => {
    const { items, cleanup } = setup(4)
    items[2].focus()
    act(() => pressKey(items[2], 'Home'))
    expect(document.activeElement).toBe(items[0])
    cleanup()
  })

  it('End focuses the last item', () => {
    const { items, cleanup } = setup(4)
    items[0].focus()
    act(() => pressKey(items[0], 'End'))
    expect(document.activeElement).toBe(items[3])
    cleanup()
  })

  it('Space on a focused item fires its click handler', () => {
    const { items, clicks, cleanup } = setup(3)
    items[1].focus()
    act(() => pressKey(items[1], ' '))
    expect(clicks[1]).toHaveBeenCalledTimes(1)
    cleanup()
  })

  it('does not intercept Enter (native <a> handles it)', () => {
    const { items, clicks, cleanup } = setup(3)
    items[2].focus()
    act(() => pressKey(items[2], 'Enter'))
    expect(clicks[2]).toHaveBeenCalledTimes(0)
    cleanup()
  })

  it('falls back to item 0 when focus is outside the menu', () => {
    const { items, container, cleanup } = setup(4)
    const stray = document.createElement('button')
    container.appendChild(stray)
    stray.focus()
    act(() => pressKey(stray, 'ArrowDown'))
    expect(document.activeElement).toBe(items[1])
    cleanup()
  })

  it('ignores keys when the event target is an INPUT', () => {
    const { items, container, cleanup } = setup(4)
    const input = document.createElement('input')
    container.appendChild(input)
    input.focus()
    act(() => pressKey(input, 'ArrowDown'))
    expect(document.activeElement).toBe(input)
    cleanup()
  })

  it('ignores keys when the event target is a TEXTAREA', () => {
    const { container, cleanup } = setup(4)
    const ta = document.createElement('textarea')
    container.appendChild(ta)
    ta.focus()
    act(() => pressKey(ta, 'ArrowDown'))
    expect(document.activeElement).toBe(ta)
    cleanup()
  })

  it('does nothing when enabled=false', () => {
    const { items, cleanup } = setup(4, false)
    items[0].focus()
    act(() => pressKey(items[0], 'ArrowDown'))
    expect(document.activeElement).toBe(items[0])
    cleanup()
  })

  it('handles zero items gracefully', () => {
    const { container, cleanup } = setup(0)
    expect(() => act(() => pressKey(container, 'ArrowDown'))).not.toThrow()
    cleanup()
  })
})
