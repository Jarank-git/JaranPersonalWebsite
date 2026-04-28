interface GhostWatermarkProps {
  label: string
  num: string
}

export function GhostWatermark({ label, num }: GhostWatermarkProps) {
  return (
    <div className="ghost-watermark" aria-hidden="true">
      <span className="ghost-watermark-word">{label}</span>
      <span className="ghost-watermark-num">{num}</span>
    </div>
  )
}
