'use client'

import Link from 'next/link'
import type { MenuItem } from '@/types/content'
import { cn } from '@/lib/utils'

export interface BrushItemProps {
  item: MenuItem
}

const itemClass = cn(
  'group relative flex min-h-14 w-full max-w-xl items-center pl-10 pr-8 py-4',
  'text-lg md:text-xl',
  'transition-all duration-300 ease-[var(--ease-ink)]',
  'border-l-2 border-l-[var(--color-gold)]/15',
  'bg-gradient-to-r from-[var(--color-obsidian-2)]/60 to-transparent',
  'menu-label text-[var(--color-cream)]',
  'hover:border-l-[var(--color-gold-bright)] hover:bg-gradient-to-r hover:from-[var(--color-obsidian-3)]/90 hover:to-[var(--color-obsidian-2)]/20',
  'hover:translate-x-3 hover:text-[var(--color-gold-bright)]',
  'hover:shadow-[inset_0_0_30px_oklch(66%_0.095_75_/_0.06)]',
  'focus-visible:outline-none',
  'focus-visible:border-l-[var(--color-gold-bright)] focus-visible:bg-gradient-to-r focus-visible:from-[var(--color-obsidian-3)]/90 focus-visible:to-[var(--color-obsidian-2)]/20',
  'focus-visible:translate-x-3 focus-visible:text-[var(--color-gold-bright)]',
  'focus-visible:shadow-[inset_0_0_30px_oklch(66%_0.095_75_/_0.06)]',
  'after:content-[""] after:absolute after:left-10 after:right-8 after:bottom-2',
  'after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300',
  'after:bg-gradient-to-r after:from-[var(--color-gold-bright)] after:via-[var(--color-gold)]/40 after:to-transparent',
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
