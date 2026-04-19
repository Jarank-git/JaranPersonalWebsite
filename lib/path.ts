export function parentPath(pathname: string): string {
  if (!pathname || pathname === '/') return '/'
  const normalized = pathname.replace(/\/+/g, '/').replace(/\/$/, '')
  if (normalized === '' || normalized === '/') return '/'
  const lastSlash = normalized.lastIndexOf('/')
  if (lastSlash <= 0) return '/'
  return normalized.slice(0, lastSlash)
}

export function segmentTitle(segment: string): string {
  const trimmed = segment.replace(/^\/+|\/+$/g, '')
  if (!trimmed) return 'MAIN'
  return trimmed.replace(/-/g, ' ').toUpperCase()
}
