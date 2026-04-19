'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { segmentTitle } from '@/lib/path'
import { getProject, getRole, getAboutSlab, getContactLink } from '@/lib/content'

function labelFor(segment: string, parentSegment: string | undefined): string {
  if (!segment) return 'MAIN'
  if (parentSegment === 'projects') {
    const p = getProject(segment)
    if (p) return p.title.toUpperCase()
  }
  if (parentSegment === 'experience') {
    const r = getRole(segment)
    if (r) return r.title.toUpperCase()
  }
  if (parentSegment === 'about') {
    const a = getAboutSlab(segment)
    if (a) return a.title.toUpperCase()
  }
  if (parentSegment === 'contact') {
    const c = getContactLink(segment)
    if (c) return c.label.toUpperCase()
  }
  return segmentTitle(segment)
}

export function Breadcrumb() {
  const pathname = usePathname()
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const crumbs = [
    { href: '/', label: 'MAIN', isLast: false },
    ...segments.map((segment, i) => {
      const href = '/' + segments.slice(0, i + 1).join('/')
      const parent = i > 0 ? segments[i - 1] : undefined
      return { href, label: labelFor(segment, parent), isLast: i === segments.length - 1 }
    }),
  ]

  return (
    <nav
      aria-label="Breadcrumb"
      className="fixed left-6 top-6 z-10 menu-label text-xs tracking-widest text-[var(--color-cream-faint)]"
    >
      <ol className="flex flex-wrap gap-x-2">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-x-2">
            {c.isLast ? (
              <span aria-current="page" className="text-[var(--color-gold-bright)]">
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="transition-colors hover:text-[var(--color-cream)]"
              >
                {c.label}
              </Link>
            )}
            {i < crumbs.length - 1 && <span className="text-[var(--color-cream-faint)]">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
