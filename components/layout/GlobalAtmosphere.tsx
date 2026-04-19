'use client'

import { InkDefs } from './InkDefs'

export function GlobalAtmosphere() {
  return (
    <>
      <InkDefs />
      <div className="atmos-bg" aria-hidden />
      <div className="atmos-grain" aria-hidden />
      <div className="atmos-vignette" aria-hidden />
    </>
  )
}
