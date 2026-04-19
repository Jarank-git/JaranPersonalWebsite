import { cn } from '@/lib/utils'

export interface OrnamentProps {
  variant?: 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br' | 'divider' | 'flourish'
  className?: string
}

export function Ornament({ variant = 'divider', className }: OrnamentProps) {
  if (variant === 'divider') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 400 24"
        className={cn('h-6 w-full text-[var(--color-gold)]/60', className)}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 0 12 Q 60 12 90 8 Q 110 5 130 8 Q 150 12 170 10 Q 185 8 195 12 Q 200 14 205 12 Q 215 8 230 10 Q 250 12 270 8 Q 290 5 310 8 Q 340 12 400 12"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M 170 10 Q 185 2 200 6 Q 215 2 230 10"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="200" cy="6" r="2" fill="currentColor" opacity="0.8" />
        <circle cx="185" cy="8" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="215" cy="8" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    )
  }

  if (variant === 'flourish') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 300 50"
        className={cn('h-12 w-72 text-[var(--color-gold)]', className)}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 30 25 Q 60 8 90 20 Q 120 32 150 15 Q 180 -2 210 20 Q 240 32 270 25"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 90 20 Q 110 10 130 18 Q 150 26 170 18 Q 190 10 210 20"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M 120 18 Q 135 8 150 14 Q 165 8 180 18"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity="0.25"
        />
        <circle cx="150" cy="14" r="2.5" fill="currentColor" opacity="0.5" />
        <circle cx="90" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="210" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
        <line x1="60" y1="25" x2="30" y2="25" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
        <line x1="240" y1="25" x2="270" y2="25" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className={cn(
        'h-15 w-15 text-[var(--color-gold)]/40',
        variant === 'corner-tr' && 'rotate-90',
        variant === 'corner-br' && 'rotate-180',
        variant === 'corner-bl' && '-rotate-90',
        className,
      )}
    >
      <path
        d="M 4 4 L 4 30 M 4 4 L 30 4"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M 4 4 Q 4 15 10 20 Q 16 25 16 35"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 4 4 Q 15 4 20 10 Q 25 16 35 16"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 10 4 Q 10 10 4 10"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity="0.4"
      />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
