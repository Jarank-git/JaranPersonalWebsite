import { cn } from '@/lib/utils'

export interface OrnamentProps {
  variant?: 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'divider'
  className?: string
}

export function Ornament({ variant = 'divider', className }: OrnamentProps) {
  if (variant === 'divider') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 240 8"
        className={cn('h-2 w-full text-[var(--color-gold)]/60', className)}
        preserveAspectRatio="none"
      >
        <path
          d="M 0 4 L 105 4 M 115 4 L 125 4 M 135 4 L 240 4"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="120" cy="4" r="1.5" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className={cn(
        'h-10 w-10 text-[var(--color-gold)]/50',
        variant === 'corner-tr' && 'rotate-90',
        variant === 'corner-br' && 'rotate-180',
        variant === 'corner-bl' && '-rotate-90',
        className,
      )}
    >
      <path
        d="M 2 2 L 2 22 M 2 2 L 22 2 M 8 2 L 8 8 L 2 8"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  )
}
