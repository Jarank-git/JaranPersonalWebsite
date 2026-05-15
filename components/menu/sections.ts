import type { MenuSection } from '@/types/content'

export type ToneCorner = 'bl' | 'tr' | 'tl' | 'br'

export interface MenuItem {
  section: MenuSection
  label: string
  num: string
  href: string
  outline: boolean
  tone: string
  corner: ToneCorner
  panel?: boolean
}

export const MENU_ITEMS: MenuItem[] = [
  { section: 'summary',    label: 'SUMMARY',    num: '00', href: '/summary',    outline: false, tone: 'oklch(0.16 0.03 120)', corner: 'bl', panel: true },
  { section: 'about',      label: 'ABOUT',      num: '01', href: '/about',      outline: false, tone: 'oklch(0.16 0.03 120)', corner: 'bl' },
  { section: 'projects',   label: 'PROJECTS',   num: '02', href: '/projects',   outline: false, tone: 'oklch(0.16 0.03 120)', corner: 'tr' },
  { section: 'experience', label: 'EXPERIENCE', num: '03', href: '/experience', outline: false, tone: 'oklch(0.16 0.03 120)', corner: 'tl' },
  { section: 'contact',    label: 'CONTACT',    num: '04', href: '/contact',    outline: false, tone: 'oklch(0.16 0.03 120)', corner: 'br', panel: true },
]
