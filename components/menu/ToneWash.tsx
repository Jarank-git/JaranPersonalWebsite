'use client'

import { MENU_ITEMS } from './sections'

interface ToneWashProps {
  selectedIdx: number
}

export function ToneWash({ selectedIdx }: ToneWashProps) {
  const current = MENU_ITEMS[selectedIdx] ?? MENU_ITEMS[0]
  return (
    <div
      className="tone-wash"
      aria-hidden
      style={{ background: current.tone }}
    />
  )
}
