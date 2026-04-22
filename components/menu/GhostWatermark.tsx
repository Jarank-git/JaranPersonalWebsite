import { motion } from 'framer-motion'

interface GhostWatermarkProps {
  label: string
  num: string
}

export function GhostWatermark({ label, num }: GhostWatermarkProps) {
  return (
    <motion.div
      className="ghost-watermark"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
    >
      <span className="ghost-watermark-word">{label}</span>
      <span className="ghost-watermark-num">{num}</span>
    </motion.div>
  )
}
