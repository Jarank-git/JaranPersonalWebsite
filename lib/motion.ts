import type { Variants } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const routeEnter: Variants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.32, delay: 0.06, ease } },
}

export const routeExit: Variants = {
  exit: { opacity: 0, skewX: 2, x: 30, transition: { duration: 0.24, ease } },
}

export const stackChildren: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}

export const brushItem: Variants = {
  initial: { opacity: 0, x: -16, skewX: -2 },
  animate: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.28, ease } },
}
