'use client'

import { usePathname } from 'next/navigation'

export function KeyHud() {
  const pathname = usePathname()
  const atRoot = pathname === '/'

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 bottom-6 z-10 hidden gap-x-4 menu-label text-[10px] tracking-widest text-[var(--color-cream-faint)] md:flex"
    >
      <span>↑↓&nbsp;Navigate</span>
      <span>↵&nbsp;Select</span>
      {!atRoot && <span>Esc&nbsp;Back</span>}
    </div>
  )
}
