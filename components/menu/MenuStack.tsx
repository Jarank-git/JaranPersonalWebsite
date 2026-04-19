'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { MenuItem } from '@/types/content'
import { useMenuKeyboard } from '@/hooks/use-menu-keyboard'
import { brushItem, stackChildren } from '@/lib/motion'
import { BrushItem } from './BrushItem'

export interface MenuStackProps {
  items: MenuItem[]
  ariaLabel?: string
}

export function MenuStack({ items, ariaLabel = 'Navigation' }: MenuStackProps) {
  const ref = useRef<HTMLElement>(null!)
  useMenuKeyboard({ containerRef: ref })

  return (
    <motion.nav
      ref={ref}
      aria-label={ariaLabel}
      className="flex flex-col gap-2"
      initial="initial"
      animate="animate"
      variants={stackChildren}
    >
      {items.map((item) => (
        <motion.div key={item.href} variants={brushItem}>
          <BrushItem item={item} />
        </motion.div>
      ))}
    </motion.nav>
  )
}
