'use client'

import { InkDefs } from './InkDefs'

export function GlobalAtmosphere() {
  return (
    <>
      <InkDefs />
      <div className="atmos-bg" aria-hidden />
      <video
        className="atmos-video"
        src="/wallpaper/shaman-village.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="atmos-fade" aria-hidden />
      <div className="atmos-vignette" aria-hidden />
    </>
  )
}
