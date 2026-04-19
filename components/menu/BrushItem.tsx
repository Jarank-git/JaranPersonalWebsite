'use client'

import Link from 'next/link'
import type { MenuItem } from '@/types/content'
import { cn } from '@/lib/utils'

export interface BrushItemProps {
  item: MenuItem
}

const itemClass = cn(
  'relative block w-full max-w-xl px-6 py-3',
  'transition-[color,background-color] duration-200 ease-[var(--ease-ink)]',
  'before:absolute before:inset-0 before:-z-10 before:swipe-clip',
  'before:bg-[var(--color-obsidian-2)] before:opacity-80',
  'before:transition-[background-color,opacity] before:duration-200',
  'menu-label text-[var(--color-cream)]',
  'hover:before:bg-[var(--color-obsidian-3)] hover:before:opacity-100',
  'focus-visible:outline-none',
  'focus-visible:before:bg-[var(--color-obsidian-3)] focus-visible:before:opacity-100',
  'focus-visible:text-[var(--color-gold-bright)]',
  'hover:text-[var(--color-gold-bright)]',
  'after:content-[""] after:absolute after:left-6 after:right-8 after:bottom-1.5',
  'after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-200',
  'after:bg-gradient-to-r after:from-[var(--color-gold-bright)] after:to-transparent',
  'hover:after:scale-x-100 focus-visible:after:scale-x-100',
)

export function BrushItem({ item }: BrushItemProps) {
  const inner = (
    <>
      <span>{item.label}</span>
      {item.description && (
        <span className="ml-3 text-xs text-[var(--color-cream-dim)] tracking-wide">
          {item.description}
        </span>
      )}
    </>
  )

  const commonProps = {
    'data-menu-item': '',
    tabIndex: 0,
    className: cn(
      itemClass,
      item.disabled && 'pointer-events-none text-[var(--color-cream-faint)] opacity-50',
    ),
    ...(item.disabled ? { 'aria-disabled': true } : {}),
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={item.href} {...commonProps}>
      {inner}
    </Link>
  )
}
