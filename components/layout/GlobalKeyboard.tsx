'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { parentPath } from '@/lib/path'

const IGNORE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

export function GlobalKeyboard() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const target = event.target as HTMLElement | null
      if (target && (IGNORE_TAGS.has(target.tagName) || target.isContentEditable)) return
      const parent = parentPath(pathname)
      if (parent === pathname) return
      event.preventDefault()
      router.push(parent)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pathname, router])

  return null
}
