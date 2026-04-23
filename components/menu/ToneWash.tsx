'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MENU_ITEMS, type ToneCorner } from './sections'

const OFFSETS: Record<ToneCorner, { x: string; y: string }> = {
  bl: { x: '-55%', y: '42%' },
  tr: { x: '55%',  y: '-42%' },
  tl: { x: '-55%', y: '-42%' },
  br: { x: '55%',  y: '42%' },
}

interface WashProps {
  tone: string
  corner: ToneCorner
}

function Wash({ tone, corner }: WashProps) {
  const off = OFFSETS[corner]
  return (
    <motion.div
      className="tone-wash"
      aria-hidden
      style={{ background: tone }}
      initial={{ x: off.x, y: off.y, opacity: 0 }}
      animate={{ x: '0%', y: '0%', opacity: 1 }}
      exit={{ x: off.x, y: off.y, opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

interface ToneWashProps {
  selectedIdx: number
}

export function ToneWash({ selectedIdx }: ToneWashProps) {
  const current = MENU_ITEMS[selectedIdx] ?? MENU_ITEMS[0]
  return (
    <AnimatePresence initial={false}>
      <Wash key={selectedIdx} tone={current.tone} corner={current.corner} />
    </AnimatePresence>
  )
}
