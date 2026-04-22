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
}

export const MENU_ITEMS: MenuItem[] = [
  { section: 'summary',    label: 'SUMMARY',    num: '00', href: '/summary',    outline: false, tone: 'oklch(0.58 0.12 78)',  corner: 'bl' },
  { section: 'about',      label: 'ABOUT',      num: '01', href: '/about',      outline: false, tone: 'oklch(0.58 0.12 78)',  corner: 'bl' },
  { section: 'projects',   label: 'PROJECTS',   num: '02', href: '/projects',   outline: false, tone: 'oklch(0.48 0.15 25)',  corner: 'tr' },
  { section: 'experience', label: 'EXPERIENCE', num: '03', href: '/experience', outline: false, tone: 'oklch(0.50 0.08 185)', corner: 'tl' },
  { section: 'contact',    label: 'CONTACT',    num: '04', href: '/contact',    outline: false, tone: 'oklch(0.44 0.10 305)', corner: 'br' },
]
