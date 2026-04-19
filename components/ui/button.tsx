import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'menu-label inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'transition-colors duration-200 ease-[var(--ease-ink)]',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'border border-[var(--color-gold)]/60 bg-[var(--color-obsidian-2)]/40',
          'text-[var(--color-gold-bright)]',
          'hover:border-[var(--color-gold-bright)] hover:text-[var(--color-cream)]',
          'focus-visible:border-[var(--color-gold-bright)] focus-visible:text-[var(--color-cream)]',
        ),
        ghost: cn(
          'text-[var(--color-cream)]',
          'hover:bg-[var(--color-obsidian-2)]/60 hover:text-[var(--color-gold-bright)]',
          'focus-visible:bg-[var(--color-obsidian-2)]/60 focus-visible:text-[var(--color-gold-bright)]',
        ),
        link: cn(
          'underline-offset-4 text-[var(--color-gold-bright)]',
          'hover:underline focus-visible:underline',
        ),
      },
      size: {
        default: 'h-11 px-6 py-3 text-sm',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-12 px-8 py-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
