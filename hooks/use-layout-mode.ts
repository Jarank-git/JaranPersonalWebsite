'use client'

import { useMediaQuery } from './use-media-query'

export type LayoutMode = 'cinematic' | 'fluid' | 'mobile'

const CINEMATIC = '(min-width: 1280px) and (min-height: 820px)'
const AT_LEAST_TABLET = '(min-width: 768px)'

export function useLayoutMode(): LayoutMode {
  const cinematic = useMediaQuery(CINEMATIC)
  const tablet = useMediaQuery(AT_LEAST_TABLET)
  if (cinematic) return 'cinematic'
  if (tablet) return 'fluid'
  return 'mobile'
}
